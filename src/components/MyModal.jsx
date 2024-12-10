import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, Modal, Button } from 'antd'
import { useDispatch } from 'react-redux'
const { TextArea } = Input

const MyModal = ({ open, setOpen }) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()

	const normFile = e => {
		if (Array.isArray(e)) {
			return e
		}
		return e?.fileList || []
	}

	const onCreate = values => {
		const timestamp = Date.now()

		const fileUrl = values.file?.[0]?.thumbUrl || null

		const newCard = {
      id: timestamp,
      title: values.title,
      description: values.description || '',
      fileUrl,
    };
		dispatch({
			type: 'ADD_CARD',
			payload: newCard, 
		})
		setOpen(false)
	}
	return (
		<Modal
			open={open}
			title='Create a new collection'
			okText='Create'
			cancelText='Cancel'
			onCancel={() => setOpen(false)}
			onOk={() => form.submit()}
			destroyOnClose>
			<Form
				layout='vertical'
				form={form}
				name='form_in_modal'
				onFinish={onCreate}>
				<Form.Item
					label='Title'
					name='title'
					rules={[{ required: true, message: 'Please input the title!' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Description' name='description'>
					<TextArea rows={4} />
				</Form.Item>
				<Form.Item
					label='Upload'
					valuePropName='fileList'
					getValueFromEvent={normFile}
					name='file'>
					<Upload action='/upload.do' listType='picture-card'>
						<div>
							<PlusOutlined />
							<div style={{ marginTop: 8 }}>Upload</div>
						</div>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	)
}
export default MyModal
