import classes from './ShowInfo.module.scss'

export const ShowInfo = ({network, status, genres, rating}) => {
  return (
    <div className={classes.ShowInfo}>
      <h2>Show Info</h2>
      <p><b>Network: </b>{network.name}</p>
      <p><b>Status: </b>{status}</p>
      <p><b>Genres: </b>{genres.join(' | ')}</p>
      <p><b>Rating: </b>{rating.average}</p>
    </div>
  )  
}