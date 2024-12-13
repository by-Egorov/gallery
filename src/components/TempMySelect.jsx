import { Select } from 'antd'

const MySelect = ({ setFilterType }) => {
  const getFilterCard = selectedValue => {
    console.log('Selected value:', selectedValue)
    setFilterType(selectedValue)
  }

  return (
    <>
      <Select
       className='select'
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
