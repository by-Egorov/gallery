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

const { Header, Footer, Content } = Layout

const useResponsiveCardsPerPage = () => {
  const calculateCardsPerPage = () => {
    const width = window.innerWidth
    if (width >= 1200) return 8 // На широких экранах
    if (width >= 768) return 6 // На средних экранах
    return 4 // На маленьких экранах
  }

  const [cardsPerPage, setCardsPerPage] = useState(calculateCardsPerPage)

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(calculateCardsPerPage())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return cardsPerPage
}

// на вход принимает message(фраза, которая отображается)
// eslint-disable-next-line react/prop-types
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
const useFilteredAndPaginatedCards = (
  cards,
  filterType,
  currentPage,
  cardsPerPage,
) => {
  const filteredCards =
    filterType === 'favorite'
      ? cards.filter(card => card.favorite)
      : filterType === 'like'
        ? cards.filter(card => card.like)
        : cards

  const lastIndex = currentPage * cardsPerPage
  const firstIndex = lastIndex - cardsPerPage

  return filteredCards.slice(firstIndex, lastIndex)
}

const CardList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
  const [filterType, setFilterType] = useState('')
  // const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  //Pagination

  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = useResponsiveCardsPerPage()

  const totalFilteredCards =
    filterType === 'favorite'
      ? cards.filter(card => card.favorite).length
      : filterType === 'like'
        ? cards.filter(card => card.like).length
        : cards.length

  const currentCards = useFilteredAndPaginatedCards(
    cards,
    filterType,
    currentPage,
    cardsPerPage,
  )

  //Pagination

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
