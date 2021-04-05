import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";
import { sellersReducer } from "./sellersReducer";

const rootReducer = combineReducers({
  receiptsReducer,
  sellersReducer,
});

export default rootReducer;
