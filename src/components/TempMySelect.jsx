import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterType } from '../store/cardActions.js'

const MySelect = () => {
  const filterType = useSelector(state => state.filterType)
  const dispatch = useDispatch()
  const getFilterCard = selectedValue => {
    dispatch(setFilterType(selectedValue))
  }
  return (
    <>
      <Select
        className='select'
        value={filterType}
        onChange={getFilterCard}
        showSearch={false}
        placeholder='Filter by..'
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        defaultValue={{ value: 'all', label: 'Все карточки' }}
        options={[
          {
            value: 'all',
            label: 'Все карточки',
          },
          {
            value: 'like',
            label: 'Понравившиеся',
          },
          {
            value: 'favorite',
            label: 'Избранные',
          },
        ]}
      />
    </>
  )
}
export default MySelect
