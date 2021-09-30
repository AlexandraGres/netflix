import { 
  CLEAR_SHOWS, 
  FETCH_EPISODES_SUCCESS, 
  FETCH_SEASONS_SUCCESS, 
  FETCH_SHOWS_ERROR, 
  FETCH_SHOWS_START, 
  FETCH_SHOWS_SUCCESS, 
  FETCH_SHOW_SUCCESS 
} from "../actions/actionTypes";

const initialState = {
  shows: [],
  loading: false,
  error: null,
  results: {},
  show: null,
  seasons: [],
  episodes: []
}

export default function showReducer(state = initialState, action) {
  switch (action.type) {
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
    case FETCH_SEASONS_SUCCESS:
      return {
        ...state, loading: false, seasons: action.seasons
      }
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state, loading: false, episodes: action.episodes
      }
    case FETCH_SHOWS_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case CLEAR_SHOWS:
      return {
        ...state, shows: action.shows
      }
    default:
      return state
  }
}