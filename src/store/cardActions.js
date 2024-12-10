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
export const setLike = (dispatch, id) => {
	dispatch({
		type: 'CARD_LIKE',
		payload: id,
	})
}
export const setFavorite = (dispatch, id) => {
	dispatch({
		type: 'CARD_FAVORITE',
		payload: id,
	})
}
export const removeCard = (dispatch, id) => {
	dispatch({
		type: 'REMOVE_CARD',
		payload: id,
	})
}
export const cardById = (navigate, id) => {
	navigate(`/card/${id}`)
}