import axios from 'axios'

export const setLike = id => ({
	type: 'SET_LIKE',
	payload: id,
})

export const setFavorite = id => ({
	type: 'SET_FAVORITE',
	payload: id,
})
export const removeCard = id => ({
	type: 'REMOVED_CARD',
	payload: id,
})
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
	return async dispatch => {
		dispatch(fetchCardsRequest())
		try {
			const response = await axios.get('https://fakestoreapi.com/products')
			dispatch(fetchCardsSuccess(response.data))
		} catch (error) {
			dispatch(fetchCardsFailure(error.message))
		}
	}
}

export const cardById = (navigate, id) => {
	const scrollPosition = window.scrollY 
	navigate(`/card/${id}`, { state: { scrollPosition } }) 
}
