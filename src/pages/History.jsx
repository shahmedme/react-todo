import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import Page from "../components/Page";

export default function History() {
	const [todos, setTodos] = useState([]);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			render: (title) => <p>{title}</p>,
		},
		{
			title: "Deadline",
			dataIndex: "date",
			key: "date",
			render: (date) => (
				<p>
					{new Date(date).toLocaleString("default", {
						day: "numeric",
						month: "long",
					})}
				</p>
			),
		},
		{
			title: "Started At",
			dataIndex: "range",
			key: "range",
			render: (date) => {
				let msg = date[0] ?? "No Date";
				return <p>{msg}</p>;
			},
		},
		{
			title: "End At",
			dataIndex: "range",
			key: "range",
			render: (date) => {
				let msg = date[1] ?? "No Date";
				return <p>{msg}</p>;
			},
		},
		{
			title: "Action",
			key: "action",
			dataIndex: "id",
			render: (id) => (
				<Button
					type="primary"
					danger
					onClick={() => {
						let filteredTodoList = todos.filter((todo) => todo.id !== id);
						localStorage.setItem("todos", JSON.stringify(filteredTodoList));
						setTodos(filteredTodoList);
					}}
				>
					Delete
				</Button>
			),
		},
	];

	useEffect(() => {
		let todos = JSON.parse(localStorage.getItem("todos"));

		if (todos !== null) {
			setTodos(todos);
		}
	}, []);

	return (
		<Page>
			<div className="mt-28 flex justify-center">
				<div>
					<Table
						columns={columns}
						dataSource={todos.filter((todo) => todo.status === "completed")}
					/>
				</div>
			</div>
		</Page>
	);
}
