import axios from "axios"
import { FETCH_SHOWS_ERROR, FETCH_SHOWS_START, FETCH_SHOWS_SUCCESS, FETCH_SHOW_SUCCESS} from "./actionTypes"
import { api } from "../../common/constants/api"

export const fetchShows = () => {
  return async dispatch => {
    dispatch(fetchShowsStart())
    try {
      const result = await axios.get(api.baseUrl + api.shows.getAll)

      const shows = [...result.data]
      console.log(result.data);

      dispatch(fetchShowsSuccess(shows))
    } catch (err) {
      dispatch(fetchShowsError(err))
    }
  }
}

export const fetchShowById = (id) => {
  return async dispatch => {
    dispatch(fetchShowsStart())

    try {
      const result = await axios.get(`${api.baseUrl}${api.shows.getAll}/${id}`)
      const show = {...result.data}

      dispatch(fetchShowSuccess(show))
    } catch (err) {
      dispatch(fetchShowsError(err))
    }
  }
}

export const fetchShowsStart = () => {
  return {
    type: FETCH_SHOWS_START
  }
}

export const fetchShowsError = err => {
  return {
    type: FETCH_SHOWS_ERROR,
    error: err
  }
}

export const fetchShowsSuccess = shows => {
  return {
    type: FETCH_SHOWS_SUCCESS,
    shows
  }
}

export const fetchShowSuccess = show => {
  return {
    type: FETCH_SHOW_SUCCESS,
    show
  }
}
