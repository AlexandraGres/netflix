import { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Card from '../../components/Card/Card'
import Loader from '../../components/UI/Loader/Loader'
import { fetchShows } from '../../store/actions/show'
import ReactPaginate from 'react-paginate'
import classes from './Shows.module.scss'

const Shows = () => {

  const shows = useSelector((state) => state.show.shows)
  const loading = useSelector((state) => state.show.loading)
  const dispatch = useDispatch()

  const renderShows = () => {
    return currentItems.map(show => {
      return (
        <Card
          key={show.id}
          image={show.image.medium}
          name={show.name}
          url={show.id}
        />
      )
    })
  }

  useEffect(() => {
    dispatch(fetchShows())
  }, [dispatch])


  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = shows.slice(indexOfFirstItem, indexOfLastItem)
  const pageCount = Math.ceil(shows.length / itemsPerPage)

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  return (
    <>
      {loading || shows.length === 0
        ? <Loader />
        : <>
          <div className={classes.Shows}>
            {renderShows()}
          </div>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </>
      }
    </>
  )
}

export default connect()(Shows)