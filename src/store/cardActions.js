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
export const setScrollPosition = position => ({
  type: 'SET_SCROLL_POSITION',
  payload: position,
})
export const setCurrentPage = page => ({
  type: 'SET_CURRENT_PAGE',
  payload: page,
})

export const setFilterType = filterType => ({
  type: 'SET_FILTER_TYPE',
  payload: filterType,
})
