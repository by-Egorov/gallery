import { Pagination } from 'antd'
import { setCurrentPage } from '../store/cardActions.js'
import { useSelector } from 'react-redux'

const MyPagination = ({ totalCards, cardsPerPage, onPageChange }) => {
  const currentPage = useSelector(state => state.currentPage)

  const onChange = page => {
    setCurrentPage(page)
    if (onPageChange) {
      onPageChange(page)
    }
  }

  return (
    <Pagination
      current={currentPage}
      onChange={onChange}
      total={totalCards}
      pageSize={cardsPerPage}
      showSizeChanger={false}
    />
  )
}

export default MyPagination
