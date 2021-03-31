import { combineReducers } from "redux";
import { receiptsReducer } from "./receiptsReducer";

const rootReducer = combineReducers({
  receiptsReducer,
});

export default rootReducer;
