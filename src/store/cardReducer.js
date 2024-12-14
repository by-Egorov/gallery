const ADD_CARD = 'ADD_CARD'
const REMOVED_CARD = 'REMOVED_CARD'
const SET_LIKE = 'SET_LIKE'
const SET_FAVORITE = 'SET_FAVORITE'
const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'

const initialState = {
  cards: [],
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
          card.id === action.payload ? { ...card, like: !card.like } : card,
        ),
      }
    case SET_FAVORITE:
      return {
        ...state,
        cards: state.cards.map(card =>
          card.id === action.payload
            ? { ...card, favorite: !card.favorite }
            : card,
        ),
      }
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload.map(card => {
          const localCard = (state.cards || []).find(
            localCard => localCard.id === card.id,
          )
          return localCard ? { ...card, ...localCard } : card
        }),
        loading: false,
      }
    default:
      return state
  }
}
