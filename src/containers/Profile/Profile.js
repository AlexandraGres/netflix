import { useSelector, useDispatch } from 'react-redux'
import classes from './Profile.module.scss'
import { useEffect } from 'react'
import Loader from '../../components/UI/Loader/Loader'
import { fetchUser } from '../../store/actions/user'

const Profile = props => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const loading = useSelector((state) => state.user.loading)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <>
      {loading || !user
        ? <Loader />
        : <div className={classes.Profile}>
          <h1>Profile</h1>
          <p><b>Email: </b>{user.email}</p>
        </div>
      }
    </>
  )
}

export default Profile
