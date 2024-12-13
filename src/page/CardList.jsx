import { useState, useEffect } from 'react'
import { Button, Flex, Layout } from 'antd'
import MyModal from '../components/MyModal'
import MyCard from '../components/MyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { cardById } from '../store/cardActions'
import MySelect from '../components/TempMySelect'
import { LoadingOutlined } from '@ant-design/icons'
import MyPagination from '../components/MyPagination.jsx'
import usePaginatedAndFilteredCards from '../hooks/usePaginatedAndFilteredCards.js'

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
  const location = useLocation()
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
  const [filterType, setFilterType] = useState('')
  const [open, setOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  // const currentPage = useSelector(state => state.cards.currentPage)
  const { currentCards, totalFilteredCards, cardsPerPage } =
    usePaginatedAndFilteredCards(cards, filterType, currentPage)

  const showModal = () => {
    setOpen(true)
  }
  useEffect(() => {
    const scrollPosition = location.state?.scrollPosition || 0
    window.scrollTo(0, scrollPosition)
  }, [location.state])

  useEffect(() => {
    setCurrentPage(1) // Сбрасываем на первую страницу
  }, [filterType])

  const handleCardById = id => cardById(navigate, id)

  const handleCardAction = (action, id) => {
    dispatch({ type: action, payload: id })
  }

  return (
    <Flex gap='middle' wrap>
      <Layout className='layout'>
        <Layout>
          <Header className='header'>
            <div>
              <Button type='primary' onClick={showModal}>
                Новая карточка
              </Button>
              <MyModal open={open} setOpen={setOpen} />
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <MySelect setFilterType={setFilterType} />
            </div>
          </Header>
          <Content className='content'>
            <div className='cards__wrapper'>
              {/*условная отрисовка, если массив с карточками определенного типа пустой, обрисовывается message, иначе массив карточек с полями like или favorite равными true иначе общий массив карточек*/}
              {currentCards.length > 0 ? (
                currentCards.map(card => (
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
                    cardById={handleCardById}
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
              onPageChange={setCurrentPage}
            />
          </Content>
          <Footer className='footer'>egorov.dev@gmail.com</Footer>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default CardList
