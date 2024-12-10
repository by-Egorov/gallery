import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'antd'
import { DeleteFilled, StarFilled, LikeFilled } from '@ant-design/icons'
import { setLike, setFavorite, removeCard } from '../store/cardActions'

const { Meta } = Card

const CardItem = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const cards = useSelector(state => state.cards)
	const [card, setCard] = useState(null)

	useEffect(() => {
		if (Array.isArray(cards)) {
			const foundCard = cards.find(card => card.id === Number(id))
			setCard(foundCard)
		}
	}, [id, cards])

	const handleSetLike = id => dispatch(setLike(Number(id)))
	const handleSetFavorite = id => dispatch(setFavorite(Number(id)))
	const handleRemoveCard = id => dispatch(removeCard(Number(id)))

	return (
		<>
			{card ? (
				<div
					style={{
						padding: 25,
						display: 'flex',
						justifyContent: 'center',
					}}>
					<Card
						cover={
							<img
								alt='example'
								src={card.image}
								style={{ width: '100%', height: '360px', objectFit: 'contain' }}
							/>
						}
						style={{
							padding: 15,
							width: '800px',
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
									handleSetLike(id)
								}}
								style={{ color: card.like ? '#3F00FF' : '' }}
							/>,
							<StarFilled
								key='favorite'
								onClick={e => {
									e.stopPropagation()
									handleSetFavorite(id)
								}}
								style={{ color: card.favorite ? '#ffd533' : '' }}
							/>,
							<DeleteFilled
								key='delete'
								onClick={e => {
									e.stopPropagation()
									handleRemoveCard(id)
								}}
								style={{ color: '#E34234' }}
							/>,
							<Button onClick={() => navigate(-1)}>Назад</Button>,
						]}>
						<Meta
							title={card.title}
							description={
								<div style={{ minHeight: '50px' }}>{card.description}</div>
							}
						/>
					</Card>
				</div>
			) : (
				<div style={{ padding: '20px' }}>
					<p>Карточка не найдена</p>
					<Link to='/'>Назад</Link>
				</div>
			)}
		</>
	)
}

export default CardItem
