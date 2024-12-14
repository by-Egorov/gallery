import { useEffect } from 'react'
import CardList from './page/CardList'
import { Routes, Route } from 'react-router-dom'
import CardItem from './page/CardItem'
import axios from 'axios'
import {useDispatch} from "react-redux";

const App = () => {
const dispatch = useDispatch()

  useEffect(() => {

      const fetchData = async () => {
          const res = await axios.get('https://fakestoreapi.com/products')
          console.log(res.data)

          dispatch({
              type: 'FETCH_CARDS_SUCCESS',
              payload: res.data,
          })
      }
      fetchData()
  }, [dispatch])

  return (
    <Routes>
      <Route path='/card/:id' element={<CardItem />} />
      <Route path='/' element={<CardList />} />
    </Routes>
  )
}

export default App
