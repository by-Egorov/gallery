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
import MySelect from '../components/TempMySelect'
const { Header, Footer, Content } = Layout

const CardList = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cards = useSelector(state =>
		state.filteredCards.length > 0 ? state.filteredCards : state.cards
	)

	const [open, setOpen] = useState(false)
	const showModal = () => {
		setOpen(true)
	}
	const handleSetLike = id => dispatch(setLike(id))
	const handleSetFavorite = id => dispatch(setFavorite(id))
	const handleRemoveCard = id => dispatch(removeCard(id))
	const handleCardById = id => cardById(navigate, id)
	console.log(cards)

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
							<span>sort by:</span>
							<MySelect/>
						</div>
					</Header>
					<Content className='content'>
						{cards.length === null ? (
							<p>нет карточек по данному фильтру</p>
						) : (
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
						)}
					</Content>
					<Footer className='footer'>egorov.dev@gmail.com</Footer>
				</Layout>
			</Layout>
		</Flex>
	)
}

export default CardList
