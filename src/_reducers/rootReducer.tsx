import { budgetReducer } from "./budgetReducer";
import { sellersReducer } from "./sellersReducer";
import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";
import { spendingReducer } from "./spendingReducer";

const rootReducer = combineReducers({
  budgetReducer,
  sellersReducer,
  receiptsReducer,
  spendingReducer,
});

export default rootReducer;
