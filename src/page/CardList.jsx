import { useState, useEffect } from 'react'
import { Button, Flex, Layout } from 'antd'
import MyModal from '../components/MyModal'
import MyCard from '../components/MyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { cardById } from '../store/cardActions'
import MySelect from '../components/TempMySelect'

const { Header, Footer, Content } = Layout

// Функция фильтрации, аргументы - массив и тип фильтрации(value из select (/TempMySelect.jsx)
const filterCards = (cards, filterType) => {
  if (filterType.includes('favorite')) return cards.filter(card => card.favorite)
  if (filterType.includes('like')) return cards.filter(card => card.like)
  return cards
}

// на вход принимает message(фраза, которая отображается)
const NoCardsMessage = ({ message }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    <span style={{ transform: 'rotate(90deg)', fontSize: '32px' }}>:(</span>
    <div>{message}</div>
  </div>
)

const CardList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const cards = useSelector(state => state.cards)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }
  useEffect(() => {
    const scrollPosition = location.state?.scrollPosition || 0
    window.scrollTo(0, scrollPosition)
  }, [location.state])

  const handleCardById = id => cardById(navigate, id)

  const handleCardAction = (action, id) => {
    dispatch({ type: action, payload: id })
  }

  const filteredCards = filterCards(cards, value)

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
              <MySelect setValue={setValue} />
            </div>
          </Header>
          <Content className='content'>
            <div className='cards__wrapper'>
             {/*условная отрисовка, если массив с карточками определенного типа пустой, обрисовывается message, иначе массив карточек с полями like или favorite равными true иначем общий массив карточек*/}
              {filteredCards.length > 0 ? (
                filteredCards.map(card => (
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
                    value.includes('favorite')
                      ? 'Добавьте карточки в избранное'
                      : value.includes('like')
                        ? 'Добавьте карточки в понравившиеся'
                        : 'Нет доступных карточек'
                  }
                />
              )}
            </div>
          </Content>
          <Footer className='footer'>egorov.dev@gmail.com</Footer>
        </Layout>
      </Layout>
    </Flex>
  )
}

export default CardList
