import React, { useState, useEffect } from 'react'
import { Button, Flex, Layout } from 'antd'
import MyModal from '../components/MyModal'
import MyCard from '../components/MyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { cardById } from '../store/cardActions'
import MySelect from '../components/TempMySelect'
const { Header, Footer, Content } = Layout

const CardList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const cards = useSelector(state => state.cards)

	const [open, setOpen] = useState(false)
	const showModal = () => {
		setOpen(true)
	}
	useEffect(() => {
    const scrollPosition = location.state?.scrollPosition || 0;
    window.scrollTo(0, scrollPosition);
  }, [location.state]);


	const removedCard = (id) => {
		dispatch({
			type: 'REMOVED_CARD',
			payload: id
		})
	}

	const setLike = (id) => {
		dispatch({
			type: 'SET_LIKE',
			payload: id
		})
	}
	const setFavorite = (id) => {
		dispatch({
			type: 'SET_FAVORITE',
			payload: id
		})
	}
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
						<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
							<span>sort by:</span>
							<MySelect />
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
										removedCard={removedCard}
										setLike={setLike}
										setFavorite={setFavorite}
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
