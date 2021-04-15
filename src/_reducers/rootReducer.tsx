import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";
import { sellersReducer } from "./sellersReducer";
import { spendingReducer } from "./spendingReducer";

const rootReducer = combineReducers({
  receiptsReducer,
  sellersReducer,
  spendingReducer,
});

export default rootReducer;
