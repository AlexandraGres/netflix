import { ADD_SHOW_SUCCESS, FETCH_USER_ERROR, FETCH_USER_START, FETCH_USER_SUCCESS, IS_SHOW_IN_LIST } from "../actions/actionTypes"

const initialState = {
  loading: false,
  user: {},
  isShowInList: false,
  error: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_START:
      return {
        ...state, loading: true
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state, loading: false, user: action.user
      }
    case FETCH_USER_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case ADD_SHOW_SUCCESS:
      return {
        ...state, loading: false, isShowInList: true
      }
    case IS_SHOW_IN_LIST:
      return {
        ...state, isShowInList: action.isShowInList
      }
    default:
      return state
  }
}