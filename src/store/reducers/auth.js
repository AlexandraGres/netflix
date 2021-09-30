import { AUTH_CLEAR_ERROR, AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes"

const initialState = {
  token: null,
  error: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    case AUTH_ERROR:
      return {
        ...state, error: action.error
      }
    case AUTH_CLEAR_ERROR:
      return {
        ...state, error: null
      }
    default:
      return state
  }
}