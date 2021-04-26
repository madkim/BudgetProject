import { Receipt, Days } from "../_helpers/types";
import { dateSortKey } from "../_helpers/datesort";
import { fireStorage } from "../_helpers/firebase";
import { db } from "../_helpers/firebase";
import moment from "moment";

export const spendingService = {
  getTotal,
  getDays,
  getDay,
};
function getTotal() {
  return db
    .collection("receipts")
    .get()
    .then((receipts) => {
      let totalSpent = receipts.docs.reduce((total, receipt) => {
        return receipt.data().price + total;
      }, 0);
      return +totalSpent.toFixed(2);
    });
}

function getDays() {
  return db
    .collection("receipts")
    .get()
    .then((receipts) => {
      let receiptsByDay: Days = {};
      receipts.docs.forEach((receipt) => {
        let date = moment.unix(receipt.data().date.seconds).format("L");
        if (date in receiptsByDay) {
          receiptsByDay[date].push(receipt.data().price);
        } else {
          receiptsByDay[date] = [receipt.data().price];
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
        };
      });

      return data;
    });
}
