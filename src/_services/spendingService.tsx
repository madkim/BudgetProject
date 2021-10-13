import { Receipt, Days, Range } from "../_helpers/types";
import { dateSortKey } from "../_helpers/datesort";
import { fireStorage } from "../_helpers/firebase";
import { db } from "../_helpers/firebase";
import moment from "moment";

export const spendingService = {
  getMonths,
  getRange,
  getTotal,
  getYear,
  getDays,
  getDay,
};
function getTotal(month: string | null) {
  const mnth = month === null ? new Date() : month;

  const start = moment(mnth).clone().startOf("month");
  const end = moment(mnth).clone().endOf("month");

  return db
    .collection("receipts")
    .where("date", ">=", start.toDate())
    .where("date", "<=", end.toDate())
    .get()
    .then((receipts) => {
      let totalSpent = receipts.docs.reduce((total, receipt) => {
        return receipt.data().wasRefunded ? total : receipt.data().price + total;
      }, 0);
      return +totalSpent.toFixed(2);
    });
}

function getRange(startDate: string | null, endDate: string | null) {
  const start = moment(startDate);
  const end = moment(endDate);

  return db
    .collection("receipts")
    .where("date", ">=", start.toDate())
    .where("date", "<=", end.toDate())
    .get()
    .then((receipts) => {
      let receiptsByDay: Range = {};
      receipts.docs.forEach((receipt) => {
        const month = moment(receipt.data().date.toDate()).format("MMM DD");
        
        if (month in receiptsByDay) {
          receiptsByDay[month] += receipt.data().price;
        } 
        else {
          receiptsByDay[month] = receipt.data().price;
        }
      });
      let data: any = {};

      Object.keys(receiptsByDay).forEach(date => {
        let split = date.split(' ');
        let day = parseInt(split[1]);
        let month = split[0];

        if (month in data) {
          data[month][day] = receiptsByDay[date];
        }
        else {
          data[month] = [];
          data[month][day] = receiptsByDay[date];
        }
      })
      
      Object.keys(data).forEach(month => {
        for (let day = 1; day < 32; day++) {
          if (!(day in data[month])) {
            data[month][day] = 0;
          }
        }
      })
      const currentDay = moment(new Date()).format("D");
      
      Object.keys(data).forEach(month => {
        data[month].length = currentDay + 1;
      })

      return data;
    });
}

function getYear(year: string | null) {
  const yr = year === null ? new Date() : year;

  const start = moment(yr).clone().startOf("year");
  const end = moment(yr).clone().endOf("year");

  return db
    .collection("receipts")
    .where("date", ">=", start.toDate())
    .where("date", "<=", end.toDate())
    .get()
    .then((receipts) => {
      let receiptsByDay: Days = {};
      receipts.docs.forEach((receipt) => {
        const date = moment(receipt.data().date.toDate()).month();

        if (date in receiptsByDay) {
          receiptsByDay[date] += receipt.data().price;
        } else {
          receiptsByDay[date] = receipt.data().price;
        }
      });
      return dateSortKey(receiptsByDay);
    });
}

function getMonths() {
  return db
    .collection("budgets")
    .orderBy("month", "asc")
    .get()
    .then((budgets) => {
      return budgets.docs.map((budget) => {
        return budget.data().month;
      });
    });
}

function getDays(month: string | null) {
  const mnth = month === null ? new Date() : month;

  const start = moment(mnth).clone().startOf("month");
  const end = moment(mnth).clone().endOf("month");

  return db
    .collection("receipts")
    .where("date", ">=", start.toDate())
    .where("date", "<=", end.toDate())
    .get()
    .then((receipts) => {
      let receiptsByDay: Days = {};
      receipts.docs.forEach((receipt) => {
        const date = moment(receipt.data().date.toDate()).format("L");

        if (date in receiptsByDay) {
          receiptsByDay[date].push(receipt.data().wasRefunded ? 0 : receipt.data().price);
        } else {
          receiptsByDay[date] = [receipt.data().wasRefunded ? 0 : receipt.data().price];
        }
      });
      return dateSortKey(receiptsByDay);
    });
}

function getDay(date: string) {
  const start = moment(date).set({ hour: 0, minute: 0 });
  const end = moment(date).set({ hour: 23, minute: 59 });

  return db
    .collection("receipts")
    .where("date", ">=", start.toDate())
    .where("date", "<=", end.toDate())
    .get()
    .then(async (receipts) => {
      let sellerPromises = await receipts.docs.map(async (receipt) => {
        return await receipt.data().seller.get();
      });

      let photoPromises = await receipts.docs.map(async (receipt) => {
        if (receipt.data().hasPhoto) {
          return await fireStorage
            .child("receipts/" + receipt.id)
            .getDownloadURL();
        }
      });

      const sellers = await Promise.all(sellerPromises);
      const photos = await Promise.all(photoPromises);

      let data: Receipt[] = [];

      receipts.docs.map((receipt, index) => {
        data[index] = {
          id: receipt.id,
          date: receipt.data().date.toDate(),
          photo: photos[index] !== undefined ? photos[index] : "",
          price: receipt.data().price,
          seller: {
            id: sellers[index].id,
            name: sellers[index].data().name,
            favorite: sellers[index].data().favorite,
          },
          hasPhoto: photos[index] !== undefined ? true : false,
          wasRefunded: receipt.data()?.wasRefunded
        };
      });

      return data;
    });
}
