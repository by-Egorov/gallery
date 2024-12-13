import { useState } from 'react'
import { Pagination } from 'antd'

const MyPagination = ({ totalCards, cardsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const onChange = page => {
    setCurrentPage(page) // Обновляем текущую страницу
    if (onPageChange) {
      onPageChange(page) // Вызываем колбэк для обработки изменения страницы
    }
  }

  return (
      <Pagination
          current={currentPage} // Передаём текущую страницу
          onChange={onChange} // Обработчик смены страницы
          total={totalCards} // Общее количество элементов
          pageSize={cardsPerPage} // Количество элементов на странице
          showSizeChanger={false} // Отключаем возможность изменения размера страницы
      />
  )
}

export default MyPagination
