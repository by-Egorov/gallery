import React, { useState } from 'react'
import { Button, Flex, Layout } from 'antd'
import MyModal from '../components/MyModal'
import MyCard from '../components/MyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	setLike,
	setFavorite,
	removeCard,
	cardById,
} from '../store/cardActions'
const { Header, Footer, Content } = Layout

const CardList = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cards = useSelector(state => state.cards)

	const [open, setOpen] = useState(false)
	const showModal = () => {
		setOpen(true)
	}
	const handleSetLike = id => setLike(dispatch, id)
	const handleSetFavorite = id => setFavorite(dispatch, id)
	const handleRemoveCard = id => removeCard(dispatch, id)
	const handleCardById = id => cardById(navigate, id)

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
					</Header>
					<Content className='content'>
						<div className='cards__wrapper'>
							{cards.map(card => (
								<MyCard
									key={card.id}
									image={card.image}
									title={card.title}
									description={card.description}
									like={card.like}
									favorite={card.favorite}
									removeCard={handleRemoveCard}
									setLike={handleSetLike}
									setFavorite={handleSetFavorite}
									id={card.id}
									cardById={handleCardById}
								/>
							))}
						</div>
					</Content>
					<Footer className='footer'>egorov.dev@gmail.com</Footer>
				</Layout>
			</Layout>
		</Flex>
	)
}

export default CardList
