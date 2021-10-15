import { userConstants } from "../_constants/userConstants";
import { Action } from "../_helpers/types";

export const initState = {
  userId: null,
  currentUser: '',
};

export function userReducer(state = initState, action: Action) {
  if (action.type === userConstants.SET_CURRENT_USER_ID) {
    return (state = {
      ...state,
      userId: action.payload,
    });
  }
  if (action.type === userConstants.SET_CURRENT_USER) {
    return (state = {
      ...state,
      currentUser: action.payload,
    });
  }
  return state;
}
