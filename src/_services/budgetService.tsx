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
            amount: current.data().amount,
            name: current.data().name,
          };
        });
      });

    resolve({ income: income, expenses: expenses });
  });
}
