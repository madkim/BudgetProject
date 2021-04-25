import { Dispatch } from "react";
import { budgetService } from "../_services/budgetService";
import { budgetConstants } from "../_constants/budgetConstants";
import { Action, Budget, Income, Expense } from "../_helpers/types";

export const budgetActions = {
  addIncome,
  addExpense,
  deleteIncome,
  deleteExpense,
  getCurrentBudget,
};

function getCurrentBudget() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: budgetConstants.GET_BUDGET_REQUEST, payload: true });
    budgetService
      .getBudget()
      .then((budget: Budget) => {
        dispatch(success(budget));
      })
      .catch(() => {
        dispatch({
          type: budgetConstants.GET_BUDGET_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve budget at this time. Please try again.");
      });
  };
  function success(budget: Budget) {
    return {
      type: budgetConstants.GET_BUDGET,
      payload: budget,
    };
  }
}

function addIncome(name: string, amount: number) {
  return (dispatch: Dispatch<Action>) => {
    budgetService
      .addIncome(name, amount)
      .then((income: Income) => {
        dispatch(success(income));
      })
      .catch(() => {
        alert("Could not add income at this time. Please try again.");
      });
  };
  function success(income: Income) {
    return {
      type: budgetConstants.ADD_INCOME,
      payload: income,
    };
  }
}

function deleteIncome(income: Income) {
  return (dispatch: Dispatch<Action>) => {
    budgetService
      .deleteIncome(income)
      .then(() => {
        dispatch(success(income));
      })
      .catch(() => {
        alert("Could not delete income at this time. Please try again.");
      });
  };
  function success(income: Income) {
    return {
      type: budgetConstants.DELETE_INCOME,
      payload: income,
    };
  }
}

function addExpense(name: string, type: string, amount: number) {
  return (dispatch: Dispatch<Action>) => {
    budgetService
      .addExpense(name, type, amount)
      .then((expense: Expense) => {
        dispatch(success(expense));
      })
      .catch(() => {
        alert("Could not add expense at this time. Please try again.");
      });
  };
  function success(expense: Expense) {
    return {
      type: budgetConstants.ADD_EXPENSE,
      payload: expense,
    };
  }
}

function deleteExpense(expense: Expense) {
  return (dispatch: Dispatch<Action>) => {
    budgetService
      .deleteExpense(expense)
      .then(() => {
        dispatch(success(expense));
      })
      .catch(() => {
        alert("Could not delete expense at this time. Please try again.");
      });
  };
  function success(expense: Expense) {
    return {
      type: budgetConstants.DELETE_EXPENSE,
      payload: expense,
    };
  }
}
