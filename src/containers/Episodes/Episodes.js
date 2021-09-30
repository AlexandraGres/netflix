import { useEffect } from 'react'
import reactDom from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Loader from '../../components/UI/Loader/Loader'
import { fetchEpisodesById } from '../../store/actions/show'
import classes from './Episodes.module.scss'
import imgNotFound from '../../assets/img/img-notfound-big.png'

const Episodes = () => {

  const { id } = useParams()
  const episodes = useSelector((state) => state.show.episodes)
  const loading = useSelector((state) => state.show.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEpisodesById(id))
  }, [dispatch, id])

  const handleEpisodeClick = (img, summary) => {
    return (
      reactDom.render(
        <div>
          <img src={img} alt="cover" />
          <div dangerouslySetInnerHTML={{ __html: summary }}></div>
        </div>,
        document.getElementById('episode')
      )
    )
  }

  const renderEpisodes = () => {
    return episodes.map(episode => {
      let img = imgNotFound
      if (episode.image) {
        img = episode.image.original
      }

      return (
        <li key={episode.id}>
          <p> {episode.number}. {episode.name}</p>
          <span>{episode.airdate || ''}</span>
          <i
            className="far fa-play-circle"
            onClick={() => handleEpisodeClick(img, episode.summary)}
          ></i>
        </li>
      )
    })
  }

  return (
    <div className={classes.Episodes}>
      {loading
        ? <Loader />
        : <>
          {episodes.length === 0
            ? <p>No episodes found...</p>
            : <>
              <h1>Season {episodes[0].season}</h1>
              <ul className={classes.list}>
                {renderEpisodes()}
              </ul>
              <div id="episode" className={classes.episode} />
            </>
          }
        </>
      }
    </div>
  )
}

export default Episodes