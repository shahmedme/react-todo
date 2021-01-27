import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Page from "../components/Page";
import AddTodoItem from "../components/AddTodoItem";
import TodoList from "../components/TodoList";
import WeatherBar from "../components/WeatherBar";

export default function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await axios.get(
				process.env.REACT_APP_WEBSITE_NAME + "/api/todos",
				{
					headers: {
						authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);
			setTodos(res.data);
		}
		fetchData();
	}, []);

	const handleAddTodo = (item) => {
		let newTodoList = [...todos, item];
		newTodoList.sort((item1, item2) =>
			item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
		);

		axios
			.post(process.env.REACT_APP_WEBSITE_NAME + "/api/todos", item, {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then(function (res) {
				setTodos(newTodoList);
				message.success("Successfully Added");
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const handleUpdateTodo = (item) => {
		let idx = todos.findIndex((todo) => {
			return todo._id === item._id;
		});

		let updatedTodos = [...todos];

		updatedTodos[idx] = item;

		axios
			.put(process.env.REACT_APP_WEBSITE_NAME + "/api/todos", item, {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then(function (res) {
				console.log(res.data);
				setTodos(updatedTodos);
				message.info("Successfully Updated");
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const handleDeleteTodo = (id) => {
		axios
			.delete(process.env.REACT_APP_WEBSITE_NAME + "/api/todos", {
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
				},
				data: {
					id: id,
				},
			})
			.then((res) => {
				let filteredTodoList = todos.filter((todo) => todo._id !== id);
				console.log(res.data);
				console.log(filteredTodoList);
				setTodos(filteredTodoList);
				message.info("Successfully Deleted");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getIncompletedTodosSortedByDate = () =>
		todos
			.filter((todo) => todo.status !== "completed")
			.sort((item1, item2) => Date.parse(item1.date) - Date.parse(item2.date));

	return (
		<Page>
			<div className="flex justify-center">
				<div className="mt-16">
					<AddTodoItem handleAddTodo={handleAddTodo} />
					<TodoList
						todos={getIncompletedTodosSortedByDate}
						handleUpdateTodo={handleUpdateTodo}
						handleDeleteTodo={handleDeleteTodo}
					/>
					<WeatherBar />
				</div>
			</div>
		</Page>
	);
}
