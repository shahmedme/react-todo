import React from "react";
import { Form, Input, Button, DatePicker } from "antd";

export default function AddTodoItem(props) {
	const [form] = Form.useForm();

	const handleFormSubmit = (values) => {
		values = {
			...values,
			date: values["date"].format("YYYY-MM-DD"),
			status: "new",
		};
		props.handleAddTodo(values);
		form.resetFields();
	};

	return (
		<div>
			<Form onFinish={handleFormSubmit} form={form} className="flex">
				<Form.Item
					name="title"
					rules={[{ required: true, message: "Please enter todo title" }]}
				>
					<Input placeholder="What to do?" className="w-72" />
				</Form.Item>
				<Form.Item
					name="date"
					rules={[{ required: true, message: "Please enter a date" }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="ml-2">
						Add
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
