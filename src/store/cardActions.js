
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
export const cardById = (navigate, id) => {
  const scrollPosition = window.scrollY
  navigate(`/card/${id}`, { state: { scrollPosition } })
}
