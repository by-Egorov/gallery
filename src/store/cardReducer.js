const initialState = {
	cards: [],
	loading: false,
	error: null,
	filteredCards: [],
	filterType: '',
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
			const updatedCards = state.cards.map(card =>
					card.id === action.payload ? { ...card, like: !card.like } : card
			);
			return {
					...state,
					cards: updatedCards,
					filteredCards: state.filterType ? updatedCards.filter(card => {
							if (state.filterType === 'Like') return card.like;
							if (state.filterType === 'Favorite') return card.favorite;
							return true;
					}) : updatedCards,
			};
	}
	case 'CARD_FAVORITE': {
			const updatedCards = state.cards.map(card =>
					card.id === action.payload ? { ...card, favorite: !card.favorite } : card
			);
			return {
					...state,
					cards: updatedCards,
					filteredCards: state.filterType ? updatedCards.filter(card => {
							if (state.filterType === 'Like') return card.like;
							if (state.filterType === 'Favorite') return card.favorite;
							return true;
					}) : updatedCards,
			};
	}
	case 'FILTER_CARD': {
			const filtered = state.cards.filter(card => {
					if (action.payload === 'Like') return card.like;
					if (action.payload === 'Favorite') return card.favorite;
					return true; // Если фильтр пустой, показываем все карточки
			});
			return {
					...state,
					filterType: action.payload,
					filteredCards: filtered,
			};
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
