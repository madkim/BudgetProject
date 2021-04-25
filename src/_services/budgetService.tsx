import moment from "moment";
import { db } from "../_helpers/firebase";
import { Budget, Income, Expense } from "../_helpers/types";

export const budgetService = {
  getBudget,
  addIncome,
  addExpense,
  deleteIncome,
  deleteExpense,
};

const month = moment(new Date()).format("YYYY-MM");

function getBudget() {
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

function addIncome(name: string, amount: number) {
  return db
    .collection("budgets")
    .doc(month)
    .collection("income")
    .add({
      name: name,
      amount: amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then((incomeRef) => {
      db.collection("budgets").doc(month).update({ updatedAt: new Date() });

      return {
        id: incomeRef.id,
        name: name,
        amount: amount,
      };
    });
}

function deleteIncome(income: Income) {
  return db
    .collection("budgets")
    .doc(month)
    .collection("income")
    .doc(income.id)
    .delete()
    .then(() => {
      db.collection("budgets").doc(month).update({ updatedAt: new Date() });
      return;
    });
}

function addExpense(name: string, type: string, amount: number) {
  return db
    .collection("budgets")
    .doc(month)
    .collection("expenses")
    .add({
      name: name,
      type: type,
      amount: amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then((expenseRef) => {
      db.collection("budgets").doc(month).update({ updatedAt: new Date() });

      return {
        id: expenseRef.id,
        name: name,
        type: type,
        amount: amount,
      };
    });
}

function deleteExpense(expense: Expense) {
  return db
    .collection("budgets")
    .doc(month)
    .collection("expenses")
    .doc(expense.id)
    .delete()
    .then(() => {
      db.collection("budgets").doc(month).update({ updatedAt: new Date() });
      return;
    });
}
