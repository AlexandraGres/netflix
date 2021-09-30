import classes from './Card.module.scss'

const Card = ({ url, image, name }) => {
  return (
    <div className={classes.Card}>
      <a href={url}>
        <img className="" src={image} alt={name} />
      </a>
    </div>
  )
}

export default Card