import { FETCH_SHOWS_ERROR, FETCH_SHOWS_START, FETCH_SHOWS_SUCCESS, FETCH_SHOW_SUCCESS } from "../actions/actionTypes";

const initialState = {
  shows: [],
  loading: false,
  error: null,
  results: {},
  show: null
}

export default function showReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_SHOWS_START:
      return {
        ...state, loading: true
      }
    case FETCH_SHOWS_SUCCESS: 
      return {
        ...state, loading: false, shows: action.shows
      }
      case FETCH_SHOW_SUCCESS: 
      return {
        ...state, loading: false, show: action.show
      }
    case FETCH_SHOWS_ERROR: 
      return {
        ...state, loading: false, error: action.error
      }
    default:
      return state
  }
}