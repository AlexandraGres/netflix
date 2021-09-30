import axios from "axios"
import { AUTH_CLEAR_ERROR, AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes"
import { db } from "../../common/constants/db"

export const auth = (email, password, isLogin) => {
  return async dispatch => {
    try {
      const APIkey = 'AIzaSyD-kxNac3zjlsfMeODdOT-_MG3qAVoS7xs'
      const authData = {
        email,
        password,
        returnSecureToken: true
      }

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIkey}`

      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIkey}`
      }

      const result = await axios.post(url, authData)
      const data = result.data
      const user = {
        userId: data.localId,
        email: data.email
      }

      if (!isLogin) {
        await axios.post(db.users, user)
      }

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)

      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
    } catch (err) {
      dispatch(authError(err))
    }
  }
}

export const autoLogout = time => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: AUTH_LOGOUT
  }
}

export const autoLogin = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate.getTime() <= new Date().getTime()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token
  }
}

export const authError = (err) => {
  const { message } = err.response.data.error
  switch (message) {
    case 'EMAIL_EXISTS':
      return {
        type: AUTH_ERROR,
        error: 'An account with this email already exists'
      }
    case 'EMAIL_NOT_FOUND':
      return {
        type: AUTH_ERROR,
        error: 'Wrong email or password'
      }
    case 'INVALID_PASSWORD':
      return {
        type: AUTH_ERROR,
        error: 'Wrong email or password'
      }
    default: {
      return {
        type: AUTH_ERROR,
        error: message
      }
    }
  }
}

export const clearError = () => {
  return {
    type: AUTH_CLEAR_ERROR
  }
}
