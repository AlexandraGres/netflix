import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { ShowInfo } from '../../components/ShowInfo/ShowInfo'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import { fetchSeasonsById, fetchShowById } from '../../store/actions/show'
import classes from './Show.module.scss'
import Seasons from '../../components/Seasons/Seasons'
import imgNotFound from '../../assets/img/img-notfound.png'
import { addToMyList, checkShowInList, fetchUser } from '../../store/actions/user'

export const Show = () => {

  const isAuthenticated = useSelector((state) => !!state.auth.token)

  const { id } = useParams()
  const show = useSelector((state) => state.show.show)
  const loading = useSelector((state) => state.show.loading)
  const user = useSelector((state) => state.user.user)
  const isShowInList = useSelector((state) => state.user.isShowInList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShowById(id))
    dispatch(fetchSeasonsById(id))
    dispatch(fetchUser()) 
  }, [dispatch, id])

  useEffect(() => {
    if(user && user.shows && show) {
      dispatch(checkShowInList(show, user))
    }   
  }, [dispatch, user, show])
  
  const addToMyListHandler = () => {
    dispatch(addToMyList(show))
  }
  let img = imgNotFound
  if (show && show.image) {
    img = show.image.medium
  }   

  return (
    <>
      {loading || !show
        ? <Loader />
        : <div className={classes.Show}>
          <h1>{show.name}</h1>
          <div className={classes.inner}>
            <div className={classes.img}>
              <img src={img} alt={show.name} />
              <Button
                disabled={!isAuthenticated || isShowInList}
                type="button"
                onClick={addToMyListHandler}
              >
                + to my list
              </Button>
            </div>

            <div className={classes.summary} dangerouslySetInnerHTML={{ __html: show.summary }}></div>
            <ShowInfo
              network={show.network || ''}
              status={show.status || ''}
              genres={show.genres || ''}
              rating={show.rating || ''}
            />
          </div>
          <Seasons name={show.name} />
        </div>
      }
    </>
  )
}