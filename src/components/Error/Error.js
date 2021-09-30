import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearError } from '../../store/actions/auth'
import classes from './Error.module.scss'

const Error = ({ message, delay }) => {

  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      dispatch(clearError())
    }, delay)
  }, [delay, dispatch])  

  return (
    <>
      {visible
        ? <div className={classes.Error}>
          {message}
        </div>
        : <div />
      }
    </>
  )
}

export default Error