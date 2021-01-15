import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Page from "../components/Page";

const columns = [
	{
		title: "Title",
		dataIndex: "title",
		key: "title",
		render: (title) => <p>{title}</p>,
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
		render: (date) => <p>{date}</p>,
	},
	{ title: "Action", key: "action", render: (title) => <p>Delete</p> },
];

export default function History() {
	const [completedTodos, setCompletedTodos] = useState([]);

	useEffect(() => {
		let todos = JSON.parse(localStorage.getItem("todos")).filter(
			(todo) => todo.status === "completed"
		);
		setCompletedTodos(todos);
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
