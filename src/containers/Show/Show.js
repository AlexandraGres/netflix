import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import { fetchShowById } from '../../store/actions/show'
import classes from './Show.module.scss'

export const Show = (props) => {

  const id = props.match.params.id
  const show = useSelector((state) => state.show.show)
  const loading = useSelector((state) => state.show.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchShowById(id))
  }, [dispatch, id])

  console.log(show);

  return (
    <>
      {loading || !show
        ? <Loader />
        : <div className={classes.Show}>
            <h1>{show.name}</h1>
            <div>
              <img src={show.image.medium} alt={show.name} />
              <p>{show.summary}</p>
            </div>
          </div>
      }
    </>
  )
}