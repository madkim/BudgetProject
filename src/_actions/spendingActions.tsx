import { Dispatch } from "react";
import { spendingService } from "../_services/spendingService";
import { spendingConstants } from "../_constants/spendingConstants";
import { Action, Receipt, Days } from "../_helpers/types";

export const spendingActions = {
  getTotalSpent,
  getSpentByDay,
  getDaysSpent,
};

function getTotalSpent() {
  return (dispatch: Dispatch<Action>) => {
    spendingService
      .getTotal()
      .then((total: number) => {
        dispatch(success(total));
      })
      .catch(() => {
        dispatch({
          type: spendingConstants.SPENDING_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve total spent at this time. Please try again.");
      });
  };
  function success(total: number) {
    return {
      type: spendingConstants.GET_TOTAL_SPENT,
      payload: total,
    };
  }
}

function getDaysSpent() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: spendingConstants.MAKE_SPENDING_REQUEST, payload: true });
    spendingService
      .getDays()
      .then((days: Days) => {
        dispatch(success(days));
      })
      .catch(() => {
        dispatch({
          type: spendingConstants.SPENDING_REQUEST_FAILURE,
          payload: false,
        });
        alert(
          "Could not retrieve receipts by days at this time. Please try again."
        );
      });
  };
  function success(days: Days) {
    return {
      type: spendingConstants.GET_TOTAL_SPENT_BY_DAYS,
      payload: days,
    };
  }
}

function getSpentByDay(date: string) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: spendingConstants.MAKE_SPENDING_REQUEST, payload: true });
    spendingService
      .getDay(date)
      .then((receiptsByDay: Receipt[]) => {
        dispatch(success(receiptsByDay));
      })
      .catch(() => {
        dispatch({
          type: spendingConstants.SPENDING_REQUEST_FAILURE,
          payload: false,
        });
        alert(
          "Could not retrieve receipts by day at this time. Please try again."
        );
      });
  };
  function success(receiptsByDay: Receipt[]) {
    return {
      type: spendingConstants.GET_TOTAL_SPENT_BY_DAY,
      payload: receiptsByDay,
    };
  }
}
