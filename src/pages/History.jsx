import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import Page from "../components/Page";

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
		render: (title) => (
			<Button type="primary" danger>
				Delete
			</Button>
		),
	},
];

export default function History() {
	const [completedTodos, setCompletedTodos] = useState([]);

	useEffect(() => {
		let todos = JSON.parse(localStorage.getItem("todos"));

		if (todos !== null) {
			let filteredTodos = todos.filter((todo) => todo.status === "completed");
			setCompletedTodos(filteredTodos);
		}
	}, []);

	return (
		<Page>
			<div className="mt-28 flex justify-center">
				<div>
					<Table columns={columns} dataSource={completedTodos} />
				</div>
			</div>
		</Page>
	);
}
