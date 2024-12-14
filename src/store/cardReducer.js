const ADD_CARD = 'ADD_CARD'
const REMOVED_CARD = 'REMOVED_CARD'
const SET_LIKE = 'SET_LIKE'
const SET_FAVORITE = 'SET_FAVORITE'
const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
const SET_SCROLL_POSITION = 'SET_SCROLL_POSITION'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_FILTER_TYPE = 'SET_FILTER_TYPE'

const initialState = {
  cards: [],
  filterType: 'all',
  scrollPosition: 0,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
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
    case SET_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case 'SET_FILTER_TYPE':
      return {
        ...state,
        filterType: action.payload,
      }
    default:
      return state
  }
}
