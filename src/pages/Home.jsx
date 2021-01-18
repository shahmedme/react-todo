import React, { useState, useEffect } from "react";
import { message } from "antd";
import Page from "../components/Page";
import AddTodoItem from "../components/AddTodoItem";
import TodoList from "../components/TodoList";
import WeatherBar from "../components/WeatherBar";

export default function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let allTodos = JSON.parse(localStorage.getItem("todos"));

		if (allTodos !== null) {
			setTodos(allTodos);
		}
	}, []);

	const handleAddTodo = (item) => {
		let newTodoList = [...todos, item];
		newTodoList.sort((item1, item2) =>
			item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
		);
		localStorage.setItem("todos", JSON.stringify(newTodoList));
		setTodos(newTodoList);
		message.success("Successfully Added");
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

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		// let filteredTodos = updatedTodos.filter(
		// 	(todo) => todo.status !== "completed"
		// );
		setTodos(updatedTodos);
		message.info("Successfully Updated");
	};

	const handleDeleteTodo = (id) => {
		let filteredTodoList = todos.filter((todo) => todo.id !== id);

		localStorage.setItem("todos", JSON.stringify(filteredTodoList));
		setTodos(filteredTodoList);
		message.info("Successfully Deleted");
	};

	const getCompletedTodosFilteredByDate = () =>
		todos
			.filter((todo) => todo.status !== "completed")
			.sort((item1, item2) => Date.parse(item1.date) - Date.parse(item2.date));

	return (
		<Page>
			<div className="flex justify-center">
				<div className="mt-16">
					<button onClick={() => console.log(todos)}>Check state</button>
					<AddTodoItem handleAddTodo={handleAddTodo} />
					<TodoList
						todos={getCompletedTodosFilteredByDate}
						handleUpdateTodo={handleUpdateTodo}
						handleDeleteTodo={handleDeleteTodo}
					/>
					<WeatherBar />
				</div>
			</div>
		</Page>
	);
}
