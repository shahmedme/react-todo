import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Page from "../components/Page";
import AddTodoItem from "../components/AddTodoItem";
import TodoList from "../components/TodoList";
import WeatherBar from "../components/WeatherBar";
import { TODOS } from "../endpoints";

export default function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let res = await axios.get(TODOS);
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
			.post(TODOS, item)
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
			return todo.id === item.id;
		});

		let updatedTodos = [...todos];

		updatedTodos[idx] = {
			title: item.title,
			date: item.date,
			id: item.id,
			range: item.range,
			status: item.status,
		};
		setTodos(updatedTodos);

		axios
			.put(TODOS + "/" + item.id, item)
			.then(function (res) {
				message.info("Successfully Updated");
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const handleDeleteTodo = (id) => {
		axios
			.delete(TODOS + "/" + id)
			.then((res) => {
				let filteredTodoList = todos.filter((todo) => todo.id !== id);
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
