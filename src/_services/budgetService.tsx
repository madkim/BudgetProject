import { db } from "../_helpers/firebase";

export const budgetService = {
  getTotal,
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
