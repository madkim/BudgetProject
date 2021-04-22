import { db } from "../_helpers/firebase";
import { Budget } from "../_helpers/types";

export const budgetService = {
  getBudget,
};
function getBudget(month: string) {
  return new Promise(async (resolve: (value: Budget) => void) => {
    const expenses = await db
      .collection("budgets")
      .doc(month)
      .collection("expenses")
      .get()
      .then((res) => {
        return res.docs.map((expense) => {
          return {
            id: expense.id,
            amount: expense.data().amount,
            name: expense.data().name,
            type: expense.data().type,
          };
        });
      });

    const income = await db
      .collection("budgets")
      .doc(month)
      .collection("income")
      .get()
      .then((res) => {
        return res.docs.map((current) => {
          return {
            id: current.id,
            amount: current.data().amount,
            name: current.data().name,
          };
        });
      });

    const savings = await db
      .collection("budgets")
      .doc(month)
      .collection("savings")
      .get()
      .then((res) => {
        return res.docs.map((saving) => {
          return {
            id: saving.id,
            amount: saving.data().amount,
          };
        });
      });

    resolve({ income: income, expenses: expenses, savings: savings });
  });
}
