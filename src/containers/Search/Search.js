import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card/Card'
import Loader from '../../components/UI/Loader/Loader'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Search.module.scss'
import { SHOWS } from '../../common/constants/routes'
import { clearShows, searchShows } from '../../store/actions/show'
import imgNotFound from '../../assets/img/img-notfound.png'

const Search = () => {

  const shows = useSelector((state) => state.show.shows)
  const loading = useSelector((state) => state.show.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearShows())
  }, [dispatch])

  const renderShows = () => {
    return shows.map(show => {
      let img = imgNotFound
      if (show.image) {
        img = show.image.medium
      }

      return (
        <Card
          key={show.id}
          image={img}
          name={show.name}
          url={`${SHOWS}/${show.id}`}
        />
      )
    })
  }

  const [search, setSearch] = useState('')

  const onChangeHandler = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchClick = () => {
    dispatch(
      searchShows(search)
    )
    renderShows()
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          onChange={event => onChangeHandler(event)}
          placeholder="Search Shows"
          value={search}
        />
        <Button type="submit" onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
        </Button>
      </form>

      {loading
        ? <Loader />
        : <div className={classes.Search}>
          {shows.length === 0
            ? <p>No shows to display...</p>
            : renderShows()             
          }
         </div>
      }
    </>
  )
}

export default connect()(Search)