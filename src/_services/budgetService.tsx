import moment from "moment";
import { db } from "../_helpers/firebase";
import { Budget, Income, Expense, Saving } from "../_helpers/types";

export const budgetService = {
  getBudget,
  addIncome,
  addExpense,
  setSavings,
  checkBudget,
  createBudget,
  deleteIncome,
  deleteExpense,
};

const month = moment(new Date()).format("YYYY-MM");

function checkBudget() {
  return new Promise((resolve: (value: boolean) => void) => {
    db.collection("budgets")
      .doc(month)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}

function createBudget() {
  return new Promise(async (resolve: (value: Budget) => void) => {
    const mostRecent = await db
      .collection("budgets")
      .orderBy("createdAt", "desc")
      .get();

    const mostRecentMonth = mostRecent.docs.shift()?.data().month;

    getBudget(mostRecentMonth).then(async (budget: Budget) => {
      await db.collection("budgets").doc(month).set({
        month: month,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      budget.expenses.map(async (expense) => {
        const { id, ...rest } = expense;
        await db
          .collection("budgets")
          .doc(month)
          .collection("expenses")
          .add(rest);
      });

      budget.income.map(async (income) => {
        const { id, ...rest } = income;
        await db
          .collection("budgets")
          .doc(month)
          .collection("income")
          .add(rest);
      });

      const { id, ...rest } = budget.savings;

      await db.collection("budgets").doc(month).collection("savings").add(rest);

      resolve(budget);
    });
  });
}

function getBudget(mnth: string | null) {
  return new Promise(async (resolve: (value: Budget) => void) => {
    mnth = mnth === null ? month : mnth;
    const expenses = await db
      .collection("budgets")
      .doc(mnth)
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
      .doc(mnth)
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
      .doc(mnth)
      .collection("savings")
      .get()
      .then((res) => {
        return {
          id: res.docs[0].id,
          type: res.docs[0].data().type,
          amount: +res.docs[0].data().amount,
        };
      });

    resolve({month: mnth, income: income, expenses: expenses, savings: savings });
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

function setSavings(amount: number, type: string, saving: Saving) {
  return db
    .collection("budgets")
    .doc(month)
    .collection("savings")
    .doc(saving.id)
    .update({ amount: amount, type: type })
    .then(() => {
      db.collection("budgets").doc(month).update({ updatedAt: new Date() });
      return {
        id: saving.id,
        type: type,
        amount: amount,
      };
    });
}
