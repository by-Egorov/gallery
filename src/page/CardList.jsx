import { useState, useEffect } from 'react'
import { Button, Flex, Input, Layout } from 'antd'
import MyModal from '../components/MyModal'
import MyCard from '../components/MyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MySelect from '../components/TempMySelect'
import { LoadingOutlined } from '@ant-design/icons'
import MyPagination from '../components/MyPagination.jsx'

import {
  setFilterType,
  setCurrentPage,
  setScrollPosition,
} from '../store/cardActions.js'
import {
  useCards,
  usePaginatedAndFilteredCards,
} from '../hooks/usePaginatedAndFilteredCards.js'

const { Header, Footer, Content } = Layout

const NoCardsMessage = ({ message }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    <span style={{ transform: 'rotate(90deg)', fontSize: '32px' }}>
      <LoadingOutlined />
    </span>
    <div>{message}</div>
  </div>
)

const CardList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cards = useSelector(state => state.cards)
  const scrollPosition = useSelector(state => state.scrollPosition)
  const currentPage = useSelector(state => state.currentPage)
  const filterType = useSelector(state => state.filterType)

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState({ query: '' })
  const searchedCards = useCards(cards, filter.query || '')
  const {
    currentCards: paginatedCards,
    totalFilteredCards,
    cardsPerPage,
  } = usePaginatedAndFilteredCards(searchedCards, filterType, currentPage)

  const showModal = () => {
    setOpen(true)
  }
  const handleFilterChange = selectedFilter => {
    dispatch(setFilterType(selectedFilter))
    dispatch(setCurrentPage(1))
    dispatch(setScrollPosition(window.scrollY))
  }
  useEffect(() => {
    window.scrollTo(0, scrollPosition)
  }, [scrollPosition])

  useEffect(() => {}, [filterType])
  useEffect(() => {
    setCurrentPage(currentPage)
  }, [currentPage])
  const handleCardAction = (action, id) => {
    dispatch({ type: action, payload: id })
  }
  const handlePageChange = page => {
    dispatch(setCurrentPage(page))
    dispatch(setScrollPosition(0))
    setCurrentPage(page)
  }

  const cardById = id => {
    dispatch(setScrollPosition(window.scrollY))
    dispatch(setCurrentPage(currentPage))
    navigate(`/card/${id}`)
  }

  return (
    <Flex gap='middle' wrap>
      <Layout className='layout'>
        <Layout>
          <Header className='header'>
            <Button type='primary' onClick={showModal}>
              Новая карточка
            </Button>
            <MyModal open={open} setOpen={setOpen} />
            <div className='input-group'>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <MySelect setFilterType={handleFilterChange} />
              </div>
              <div className='search'>
                <Input
                  placeholder='Search'
                  value={filter.query}
                  onChange={e =>
                    setFilter({ ...filter, query: e.target.value })
                  }
                />
              </div>
            </div>
          </Header>
          <Content className='content'>
            <div className='cards__wrapper'>
              {/*условная отрисовка, если массив с карточками определенного типа пустой, обрисовывается message, иначе массив карточек с полями like или favorite равными true иначе общий массив карточек*/}
              {paginatedCards.length > 0 ? (
                paginatedCards.map(card => (
                  <MyCard
                    key={card.id}
                    {...card}
                    removedCard={() =>
                      handleCardAction('REMOVED_CARD', card.id)
                    }
                    setLike={() => handleCardAction('SET_LIKE', card.id)}
                    setFavorite={() =>
                      handleCardAction('SET_FAVORITE', card.id)
                    }
                    cardById={cardById}
                  />
                ))
              ) : (
                <NoCardsMessage
                  message={
                    filterType === 'favorite'
                      ? 'Добавьте карточки в избранное'
                      : filterType === 'like'
                        ? 'Добавьте карточки в понравившиеся'
                        : 'Нет доступных карточек'
                  }
                />
              )}
            </div>
            <MyPagination
              totalCards={totalFilteredCards}
              cardsPerPage={cardsPerPage}
              onPageChange={handlePageChange}
            />
          </Content>
          <Footer className='footer'>egorov.dev@gmail.com</Footer>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default CardList
