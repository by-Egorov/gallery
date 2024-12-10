import React from 'react'
import { DeleteFilled, StarFilled, LikeFilled } from '@ant-design/icons'
import { Card } from 'antd'
const { Meta } = Card
const MyCard = ({
	image,
	title,
	description,
	id,
	like,
	favorite,
	setLike,
	setFavorite,
	removeCard,
	cardById,
}) => (
	<Card
		style={{
			padding: 15,
			width: 300,
			height: 405,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
		}}
		cover={
			<img
				alt='example'
				src={image}
				style={{ width: '100%', height: '200px', objectFit: 'contain' }}
			/>
		}
		onClick={() => cardById(id)}
		actions={[
			<LikeFilled
				key='like'
				onClick={e => {
					e.stopPropagation()
					setLike(id)
				}}
				style={{ color: like ? '	#3F00FF' : '' }}
			/>,
			<StarFilled
				key='favorite'
				onClick={e => {
					e.stopPropagation()
					setFavorite(id)
				}}
				style={{ color: favorite ? '#ffd533' : '' }}
			/>,
			<DeleteFilled
				key='delete'
				onClick={e => {
					e.stopPropagation()
					removeCard(id)
				}}
				style={{ color: '#E34234' }}
			/>,
		]}>
		<Meta
			title={title}
			description={
				<div
					style={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
					}}>
					{description}
				</div>
			}
		/>
	</Card>
)
export default MyCard
