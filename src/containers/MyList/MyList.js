import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromMyList, fetchUser } from '../../store/actions/user'
import classes from './MyList.module.scss'
import imgNotFound from '../../assets/img/img-notfound.png'
import Card from '../../components/Card/Card'
import { SHOWS } from '../../common/constants/routes'
import Loader from '../../components/UI/Loader/Loader'

const MyList = () => {

  const user = useSelector((state) => state.user.user)
  const loading = useSelector((state) => state.user.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleDeleteClick = id => {
    dispatch(deleteFromMyList(id))
  }

  const renderShows = () => {
    if (user.shows) {
      let shows = []
      Object.entries(user.shows).forEach(item => {
        const showId = item[0]
        item[1].showId = showId
        shows.push(item[1])
      })

      return shows.map(show => {
        let img = imgNotFound
        if (show.image) {
          img = show.image.medium
        }

        return (
          <div key={show.id} className={classes.show}>
            <Card
              image={img}
              name={show.name}
              url={`${SHOWS}/${show.id}`}
            />
            <i
              className="fas fa-trash-alt"
              onClick={() => handleDeleteClick(show.showId)}
            ></i>
          </div>
        )
      })
    }
    return (
      <p>No shows in your list...</p>
    )
  }

  return (
    <>
      <h1 className={classes.title}>My List</h1>
      {loading || !user
        ? <Loader />
        : <div className={classes.MyList}>
          {renderShows()}
        </div>
      }
    </>
  )
}

export default MyList
