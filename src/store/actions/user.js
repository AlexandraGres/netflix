import axios from "axios"
import { db } from "../../common/constants/db"
import { ADD_SHOW_SUCCESS, FETCH_USER_ERROR, FETCH_USER_START, FETCH_USER_SUCCESS, IS_SHOW_IN_LIST } from "./actionTypes"

export const fetchUser = () => {
  return async dispatch => {
    dispatch(fetchUserStart())

    try {
      const id = localStorage.getItem('userId')
      const result = await axios.get(`${db.users}?orderBy="userId"&equalTo="${id}"`)
      const user = Object.values(result.data)[0]
      const profileId = Object.keys(result.data)[0]
      localStorage.setItem('profileId', profileId)

      dispatch(fetchUserSuccess(user))
    } catch (err) {
      dispatch(fetchUserError(err))
    }
  }
}

export const fetchUserStart = () => {
  return {
    type: FETCH_USER_START
  }
}

export const fetchUserError = err => {
  return {
    type: FETCH_USER_ERROR,
    error: err
  }
}

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    user
  }
}

export const checkShowInList = (show, user) => {
  const userShows = Object.values(user.shows)
  const result = userShows.filter(el => {
    return el.id === show.id
  })
  if (result.length !== 0) {
    return {
      type: IS_SHOW_IN_LIST,
      isShowInList: true
    }
  } else {
    return {
      type: IS_SHOW_IN_LIST,
      isShowInList: false
    }
  }
}

export const addToMyList = show => {
  return async dispatch => {
    dispatch(fetchUserStart())

    try {
      const id = localStorage.getItem('profileId')
      await axios.post(`${db.baseUrl}users/${id}${db.userShows}`, show)

      dispatch(addToMyListSuccess())
    } catch (err) {
      dispatch(fetchUserError(err))
    }
  }
}

export const deleteFromMyList = id => {
  return async dispatch => {
    dispatch(fetchUserStart())

    try {
      const userId = localStorage.getItem('profileId')
      await axios.delete(`${db.baseUrl}users/${userId}/shows/${id}.json`)

      dispatch(fetchUser())
    } catch (err) {
      dispatch(fetchUserError(err))
    }
  }
}

export const addToMyListSuccess = () => {
  return {
    type: ADD_SHOW_SUCCESS
  }
}
