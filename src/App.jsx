import React, { useEffect } from 'react'
import CardList from './page/CardList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from './store/cardActions'
import { Routes, Route } from 'react-router-dom'
import CardItem from './page/CardItem'
const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCards())
	}, [dispatch])

	return (
		<Routes>
			<Route path='/card/:id' element={<CardItem />}/>
      <Route path='/' element={<CardList />}/>
		</Routes>
	)
}

export default App
