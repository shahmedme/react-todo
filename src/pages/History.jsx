import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";
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
			dataIndex: "_id",
			render: (_id) => (
				<Button
					type="primary"
					danger
					onClick={() => {
						axios
							.delete(process.env.REACT_APP_WEBSITE_NAME + "/api/todos", {
								headers: {
									authorization: "Bearer " + localStorage.getItem("token"),
								},
								data: {
									id: _id,
								},
							})
							.then((res) => {
								let filteredTodoList = todos.filter((todo) => todo._id !== _id);
								setTodos(filteredTodoList);
								message.info("Successfully Deleted");
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				>
					Delete
				</Button>
			),
		},
	];

	useEffect(() => {
		async function fetchData() {
			let res = await axios.get(
				process.env.REACT_APP_WEBSITE_NAME + "/api/todos",
				{
					headers: {
						authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);

			if (res.data.length > 0) {
				setTodos(res.data);
			}
		}
		fetchData();
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
