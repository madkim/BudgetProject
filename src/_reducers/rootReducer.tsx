import { userReducer } from "./userReducer";
import { budgetReducer } from "./budgetReducer";
import { sellersReducer } from "./sellersReducer";
import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";
import { spendingReducer } from "./spendingReducer";

const rootReducer = combineReducers({
  userReducer,
  budgetReducer,
  sellersReducer,
  receiptsReducer,
  spendingReducer,
});

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer
