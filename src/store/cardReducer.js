const ADD_CARD = 'ADD_CARD'
const REMOVED_CARD = 'REMOVED_CARD'
const SET_LIKE = 'SET_LIKE'
const SET_FAVORITE = 'SET_FAVORITE'
const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST'
const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE'
const UPDATE_CARD_STATUS = 'UPDATE_CARD_STATUS'


const initialState = {
	cards: [],
	loading: false,
	error: null,
	currentPage: 1,
	perPage: 10,
	totalCount:0
}

export const cardReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CARD: {
			return {
				...state,
				cards: [...state.cards, action.payload],
			}
		}
		case REMOVED_CARD: {
			return {
				...state,
				cards: state.cards.filter(card => card.id !== action.payload),
			}
		}
		case SET_LIKE:
			return {
				...state,
				cards: state.cards.map(card =>
					card.id === action.payload ? { ...card, like: !card.like } : card
				),
			}
		case SET_FAVORITE:
			return {
				...state,
				cards: state.cards.map(card =>
					card.id === action.payload
						? { ...card, favorite: !card.favorite }
						: card
				),
			}

		case FETCH_CARDS_REQUEST:
			return {
				...state,
				loading: true,
			}
			case FETCH_CARDS_SUCCESS:
				return {
					...state,
					cards: action.payload.map(card => {
						const localCard = state.cards.find(localCard => localCard.id === card.id);
						return localCard ? { ...card, ...localCard } : card;
					}),
				};
			case UPDATE_CARD_STATUS:
				return {
					...state,
					cards: state.cards.map(card => 
						card.id === action.payload.id ? { ...card, ...action.payload.status } : card
					),
				};
		case FETCH_CARDS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
