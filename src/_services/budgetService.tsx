import { dateSortKey } from "../_helpers/datesort";
import { Days } from "../_helpers/types";
import { db } from "../_helpers/firebase";
import moment from "moment";

export const budgetService = {
  getTotal,
  getDays,
};
function getTotal() {
  return db
    .collection("receipts")
    .get()
    .then((receipts) => {
      let totalSpent = receipts.docs.reduce((total, receipt) => {
        return receipt.data().price + total;
      }, 0);
      return parseFloat(totalSpent.toFixed(2));
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
          receiptsByDay[date] += receipt.data().price;
        } else {
          receiptsByDay[date] = receipt.data().price;
        }
      });
      return dateSortKey(receiptsByDay);
    });
}
