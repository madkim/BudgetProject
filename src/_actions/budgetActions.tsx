import { Action, Days } from "../_helpers/types";
import { Dispatch } from "react";
import { budgetConstants } from "../_constants/budgetConstants";
import { budgetService } from "../_services/budgetService";

export const budgetActions = {
  getTotalSpent,
  getDaysSpent,
};

function getTotalSpent() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: budgetConstants.MAKE_BUDGET_REQUEST, payload: true });
    budgetService
      .getTotal()
      .then((total: number) => {
        dispatch(success(total));
      })
      .catch(() => {
        dispatch({
          type: budgetConstants.BUDGET_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve total spent at this time. Please try again.");
      });
  };
  function success(total: number) {
    return {
      type: budgetConstants.GET_TOTAL_SPENT,
      payload: total,
    };
  }
}

function getDaysSpent() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: budgetConstants.MAKE_BUDGET_REQUEST, payload: true });
    budgetService
      .getDays()
      .then((days: Days) => {
        console.log(days);
        dispatch(success(days));
      })
      .catch(() => {
        dispatch({
          type: budgetConstants.BUDGET_REQUEST_FAILURE,
          payload: false,
        });
        alert(
          "Could not retrieve receipts by day at this time. Please try again."
        );
      });
  };
  function success(days: Days) {
    return {
      type: budgetConstants.GET_TOTAL_SPENT_BY_DAY,
      payload: days,
    };
  }
}
