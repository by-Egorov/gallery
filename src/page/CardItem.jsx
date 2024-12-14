import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'antd'
import { DeleteFilled, StarFilled, LikeFilled } from '@ant-design/icons'
import {setLike, setFavorite, removeCard, setScrollPosition} from '../store/cardActions'

const { Meta } = Card

const CardItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const cards = useSelector(state => state.cards)
  const [card, setCard] = useState(null)

  const setLikeHandler = id => {
    dispatch(setLike(id))
  }

  const setFavoriteHandler = id => {
    dispatch(setFavorite(id))
  }
  const setRemoveCardHandler = id => {
    dispatch(removeCard(id))
  }
  const handleBack = () => {
    dispatch(setScrollPosition(window.scrollY))
    navigate(-1)
  }
  useEffect(() => {
    if (Array.isArray(cards)) {
      const foundCard = cards.find(card => card.id === Number(id))
      setCard(foundCard)
    }
  }, [id, cards])
console.log(window.scrollY)
  return (
    <>
      {card ? (
        <div className='card__wrapper'>
          <Card
            className='card-item'
            cover={
              <img
                alt='example'
                src={card.image}
                style={{ width: '100%', height: '360px', objectFit: 'contain' }}
              />
            }
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            actions={[
              <LikeFilled
                key='like'
                onClick={e => {
                  e.stopPropagation()
                  setLikeHandler(card.id)
                }}
                style={{ color: card.like ? '#3F00FF' : '' }}
              />,
              <StarFilled
                key='favorite'
                onClick={e => {
                  e.stopPropagation()
                  setFavoriteHandler(card.id)
                }}
                style={{ color: card.favorite ? '#ffd533' : '' }}
              />,
              <DeleteFilled
                key='delete'
                onClick={e => {
                  e.stopPropagation()
                  setRemoveCardHandler(card.id)
                }}
                style={{ color: '#E34234' }}
              />,
              <Button onClick={() => navigate(-1)}>Назад</Button>,
            ]}
          >
            <Meta
              title={
                <div style={{ textAlign: 'center', whiteSpace: 'wrap' }}>
                  {card.title}
                </div>
              }
              description={
                <div style={{ minHeight: '50px' }}>{card.description}</div>
              }
            />
          </Card>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <p>Карточка не найдена</p>
          <button onClick={handleBack}>Назад</button>
        </div>
      )}
    </>
  )
}

export default CardItem
