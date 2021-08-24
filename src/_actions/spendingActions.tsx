import { Dispatch } from "react";
import { spendingService } from "../_services/spendingService";
import { spendingConstants } from "../_constants/spendingConstants";
import { Action, Receipt, Year, Days } from "../_helpers/types";

export const spendingActions = {
  getSpentThisYear,
  getMonthsSpent,
  getTotalSpent,
  getSpentByDay,
  getDaysSpent,
};

function getTotalSpent(month: string | null = null) {
  return (dispatch: Dispatch<Action>) => {
    spendingService
      .getTotal(month)
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

function getSpentThisYear(year: string | null = null) {
  return (dispatch: Dispatch<Action>) => {
    spendingService
      .getYear(year)
      .then((year: Days) => {
        dispatch(success(year));
      })
      .catch(() => {
        dispatch({
          type: spendingConstants.SPENDING_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve total spent at this time. Please try again.");
      });
  };
  function success(year: Days) {
    return {
      type: spendingConstants.GET_YEAR_SPENT,
      payload: year,
    };
  }
}

function getMonthsSpent() {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: spendingConstants.MAKE_SPENDING_REQUEST,
      payload: true,
    });
    spendingService
      .getMonths()
      .then((months: string[]) => {
        dispatch(success(months));
      })
      .catch(() => {
        dispatch({
          type: spendingConstants.SPENDING_REQUEST_FAILURE,
          payload: false,
        });
        alert("Could not retrieve months spent. Please try again.");
      });
  };
  function success(months: string[]) {
    return {
      type: spendingConstants.GET_MONTHS_SPENT,
      payload: months,
    };
  }
}

function getDaysSpent(month: string | null = null) {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: spendingConstants.MAKE_SPENDING_REQUEST, payload: true });
    spendingService
      .getDays(month)
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
