import { useState, useEffect } from 'react'

// Хук для адаптивного количества карточек на странице
const useResponsiveCardsPerPage = () => {
    const calculateCardsPerPage = () => {
        const width = window.innerWidth
        if (width >= 1200) return 8 // На широких экранах
        if (width >= 768) return 6 // На средних экранах
        return 4 // На маленьких экранах
    }

    const [cardsPerPage, setCardsPerPage] = useState(calculateCardsPerPage)

    useEffect(() => {
        const handleResize = () => {
            setCardsPerPage(calculateCardsPerPage())
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return cardsPerPage
}

// Основной хук для фильтрации и пагинации карточек
const usePaginatedAndFilteredCards = (cards, filterType, currentPage) => {
    const cardsPerPage = useResponsiveCardsPerPage()

    // Фильтрация карточек
    const filteredCards =
        filterType === 'favorite'
            ? cards.filter(card => card.favorite)
            : filterType === 'like'
                ? cards.filter(card => card.like)
                : cards

    // Пагинация
    const lastIndex = currentPage * cardsPerPage
    const firstIndex = lastIndex - cardsPerPage

    return {
        currentCards: filteredCards.slice(firstIndex, lastIndex),
        totalFilteredCards: filteredCards.length,
        cardsPerPage,
    }
}

export default usePaginatedAndFilteredCards