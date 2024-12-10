const initialState = {
	cards: [],
	loading: false,
	error: null,
}

export const cardReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_CARD': {
			return {
				...state,
				cards: [...state.cards, action.payload],
			}
		}
		case 'REMOVE_CARD': {
			return {
				...state,
				cards: state.cards.filter(card => card.id !== action.payload),
			}
		}
		case 'CARD_LIKE': {
			return {
				...state,
				cards: state.cards.map(card =>
					card.id === action.payload
						? { ...card, like: !card.like }
						: card
				),
			}
		}
		case 'CARD_FAVORITE': {
			return {
				...state,
				cards: state.cards.map(card =>
					card.id === action.payload
						? { ...card, favorite: !card.favorite }
						: card
				),
			}
		}
		case 'FETCH_CARDS_REQUEST': {
			return {
				...state,
				loading: true,
				error: null,
			}
		}
		case 'FETCH_CARDS_SUCCESS': {
			return {
				...state,
				loading: false,
				cards: [
					...state.cards,
					...action.payload.filter(
						newCard => !state.cards.some(card => card.id === newCard.id)
					),
				],
			}
		}
		case 'FETCH_CARDS_FAILURE': {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}
		default:
			return state
	}
}
