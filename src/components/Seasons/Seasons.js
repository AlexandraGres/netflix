import { useSelector } from 'react-redux'
import Loader from '../UI/Loader/Loader';
import classes from './Seasons.module.scss'
import imgNotFound from '../../assets/img/img-notfound.png'

const Seasons = ({ name }) => {

  const seasons = useSelector((state) => state.show.seasons)

  const renderSeasons = () => {
    return seasons.map(season => {
      let img = imgNotFound
      if(season.image) {
        img = season.image.medium
      }

      let premiereDate = ''
      if(season.premiereDate) {
        premiereDate = season.premiereDate.substring(0, 4)
      }
      return (
        <div className={classes.season} key={season.id}>
          <a href={`/seasons/${season.id}/episodes`}>
            <img src={img} alt={name} />
          </a>
          <a href={`/seasons/${season.id}/episodes`}>Season {season.number}</a>
          <span>{premiereDate}</span>
        </div>
      )
    })
  }

  return (
    <>
      {seasons.length === 0
        ? <Loader />
        :
        <div className={classes.Seasons}>
          <h2>Seasons</h2>
          <div className={classes.inner}>
            {renderSeasons()}
          </div>
        </div>
      }
    </>
  )
}

export default Seasons