import axios from "axios"
import { 
  CLEAR_SHOWS,
  FETCH_EPISODES_SUCCESS,
  FETCH_SEASONS_SUCCESS, 
  FETCH_SHOWS_ERROR, 
  FETCH_SHOWS_START, 
  FETCH_SHOWS_SUCCESS, 
  FETCH_SHOW_SUCCESS
} from "./actionTypes"
import { api } from "../../common/constants/api"

export const fetchShows = () => {
  return async dispatch => {
    dispatch(fetchShowsStart())
    try {
      const result = await axios.get(api.baseUrl + api.shows.getAll)

      const shows = [...result.data]

      dispatch(fetchShowsSuccess(shows))
    } catch (err) {
      dispatch(fetchShowsError(err))
    }
  }
}

export const searchShows = (value) => {
  return async dispatch => {
    dispatch(fetchShowsStart())
    try {
      const result = await axios.get(`${api.baseUrl}/search${api.shows.getAll}?q=${value}`)

      const shows = result.data.map(item => item.show)

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

export const fetchSeasonsById = (id) => {
  return async dispatch => {
    dispatch(fetchShowsStart())

    try {
      const result = await axios.get(`${api.baseUrl}${api.shows.getAll}/${id}${api.shows.getSeasons}`)
      const seasons = [...result.data]

      dispatch(fetchSeasonsSuccess(seasons))
    } catch (err) {
      dispatch(fetchShowsError(err))
    }
  }
}

export const fetchEpisodesById = (id) => {
  return async dispatch => {
    dispatch(fetchShowsStart())

    try {
      const result = await axios.get(`${api.baseUrl}${api.shows.getSeasons}/${id}${api.shows.getEpsides}`)
      const episodes = [...result.data]

      dispatch(fetchEpisodesSuccess(episodes))
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

export const fetchSeasonsSuccess = seasons => {
  return {
    type: FETCH_SEASONS_SUCCESS,
    seasons
  }
}

export const fetchEpisodesSuccess = episodes => {
  return {
    type: FETCH_EPISODES_SUCCESS,
    episodes
  }
}

export const fetchShowSuccess = show => {
  return {
    type: FETCH_SHOW_SUCCESS,
    show
  }
}

export const clearShows = () => {
  return {
    type: CLEAR_SHOWS,
    shows: []
  }
}
