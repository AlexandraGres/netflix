import classes from './Card.module.scss'

const Card = ({url, image, name}) => {
  return (
    <div className="">
      <div className={classes.Card}>
        <a href={url}>
          <img className="" src={image} alt={name} />
        </a>
      </div>
    </div>
  )
}

export default Card