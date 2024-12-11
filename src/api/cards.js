import axios from 'axios'

export default async function handler(req, res) {
	try {
		const response = await axios.get('https://fakestoreapi.com/products')
		res.status(200).json(response.data)
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка загрузки данных', error: error.message })
	}
}
