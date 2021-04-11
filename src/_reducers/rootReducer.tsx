import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";
import { sellersReducer } from "./sellersReducer";
import { budgetReducer } from "./budgetReducer";

const rootReducer = combineReducers({
  receiptsReducer,
  sellersReducer,
  budgetReducer,
});

export default rootReducer;
