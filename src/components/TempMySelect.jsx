import { Select } from 'antd'

const MySelect = ({ setValue }) => {
  const getFilterCard = selectedValue => {
    setValue(selectedValue)
  }

  return (
    <>
      <Select
        style={{ width: '200px' }}
        onChange={getFilterCard}
        showSearch
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
