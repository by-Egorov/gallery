import axios from 'axios'

export const fetchCardsRequest = () => ({
	type: 'FETCH_CARDS_REQUEST',
})

export const fetchCardsSuccess = cards => ({
	type: 'FETCH_CARDS_SUCCESS',
	payload: cards,
})

export const fetchCardsFailure = error => ({
	type: 'FETCH_CARDS_FAILURE',
	payload: error,
})

export const fetchCards = () => {
	return async (dispatch, getState) => {
		dispatch(fetchCardsRequest())
		try {
			const response = await axios.get('https://fakestoreapi.com/products')
			const serverCards = response.data
			const localCards = getState().cards.cards

			// Слияние состояния
			const mergedCards = serverCards.map(serverCard => {
				const localCard = localCards.find(card => card.id === serverCard.id)
				return localCard ? { ...serverCard, ...localCard } : serverCard
			})

			dispatch(fetchCardsSuccess(mergedCards))
		} catch (error) {
			dispatch(fetchCardsFailure(error.message))
		}
	}
}

export const cardById = (navigate, id) => {
	navigate(`/card/${id}`)
}