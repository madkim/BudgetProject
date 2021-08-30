import { Action, Budget } from "../_helpers/types";
import { budgetConstants } from "../_constants/budgetConstants";

export const initState: {
  budget: Budget;
  loading: boolean;
} = {
  budget: {
    month: "",
    income: [],
    expenses: [],
    savings: { id: "", type: "", amount: 0 },
  },
  loading: false,
};

export function budgetReducer(state = initState, action: Action) {
  if (action.type === budgetConstants.GET_BUDGET_REQUEST_FAILURE) {
    return (state = {
      ...state,
      loading: false,
    });
  }

  if (action.type === budgetConstants.GET_BUDGET_REQUEST) {
    return (state = {
      ...state,
      loading: true,
    });
  }

  if (action.type === budgetConstants.CREATE_NEW_BUDGET) {
    return (state = {
      ...state,
      loading: false,
      budget: action.payload,
    });
  }

  if (action.type === budgetConstants.GET_BUDGET) {
    return (state = {
      ...state,
      loading: false,
      budget: action.payload,
    });
  }

  if (action.type === budgetConstants.ADD_INCOME) {
    return (state = {
      ...state,
      loading: false,
      budget: {
        ...state.budget,
        income: [...state.budget.income, action.payload],
      },
    });
  }

  if (action.type === budgetConstants.DELETE_INCOME) {
    return (state = {
      ...state,
      loading: false,
      budget: {
        ...state.budget,
        income: state.budget.income.filter((current) => {
          return current.id !== action.payload.id;
        }),
      },
    });
  }

  if (action.type === budgetConstants.ADD_EXPENSE) {
    return (state = {
      ...state,
      loading: false,
      budget: {
        ...state.budget,
        expenses: [...state.budget.expenses, action.payload],
      },
    });
  }

  if (action.type === budgetConstants.DELETE_EXPENSE) {
    return (state = {
      ...state,
      loading: false,
      budget: {
        ...state.budget,
        expenses: state.budget.expenses.filter((current) => {
          return current.id !== action.payload.id;
        }),
      },
    });
  }

  if (action.type === budgetConstants.SET_SAVINGS) {
    return (state = {
      ...state,
      loading: false,
      budget: {
        ...state.budget,
        savings: action.payload,
      },
    });
  }

  return state;
}
