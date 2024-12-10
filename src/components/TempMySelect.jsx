import React, { useState } from 'react'
import { Select } from 'antd'
import { useDispatch } from 'react-redux'
const MySelect = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')

	const getFilterCard = selectedValue => {
		setValue(selectedValue)
	}

	return (
		<>
			<Select
				style={{ width: '200px' }}
				value={value}
				onChange={getFilterCard}
				showSearch
				placeholder='Select..'
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
				}
				options={[
					{ value: 'all', label: 'Все карточки' },
					{
						value: 'Like',
						label: 'Понравившиеся',
					},
					{
						value: 'Favorite',
						label: 'Избранные',
					},
				]}
			/>
		</>
	)
}
export default MySelect
