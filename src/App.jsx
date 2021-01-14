import React, { useState, useEffect } from "react";
import { message, Button } from "antd";
import AddTodoItem from "./components/AddTodoItem";
import TodoItem from "./components/TodoItem";
import WeatherBar from "./components/WeatherBar";
import "./App.css";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [sortType, setSortType] = useState("title");

	useEffect(() => {
		let todos = JSON.parse(localStorage.getItem("todos"));

		if (todos !== null) {
			todos.sort((item1, item2) => (item1.title > item2.title ? 1 : -1));
			setTodos(todos);
		}
	}, []);

	// useEffect(() => {

	// }, [todos]);

	console.log("sort type is", sortType);

	// useEffect(() => {
	// 	console.log("sort type is changed");
	// 	if (sortType === "date") {
	// 		console.log("sorting is started");
	// 		let sortedTodosByDate = [...todos].sort(
	// 			(item1, item2) => Date.parse(item1.date) - Date.parse(item2.date)
	// 		);
	// 		console.log(sortedTodosByDate);
	// 		// setTodos(sortedTodosByDate);
	// 	}
	// }, [sortType]);

	const handleAddTodo = (item) => {
		let newTodoList = todos.concat(item);
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
		};

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		setTodos(updatedTodos);
		message.info("Successfully Updated");
	};

	const handleDeleteTodo = (id) => {
		let filteredTodoList = todos.filter((todo) => todo.id !== id);

		localStorage.setItem("todos", JSON.stringify(filteredTodoList));
		setTodos(filteredTodoList);
		message.info("Successfully Deleted");
	};

	// const handleSort = (e) => {
	// 	if (e.target.value === "date") {
	// 		let sortedTodosByDate = [...todos].sort(
	// 			(item1, item2) => Date.parse(item1.date) - Date.parse(item2.date)
	// 		);
	// 		setTodos(sortedTodosByDate);
	// 	}
	// };

	return (
		<div className="flex justify-center">
			<div className="my-24">
				<h1 className="text-center text-4xl font-bold mb-5">TODO</h1>

				<AddTodoItem handleAddTodo={handleAddTodo} />

				{todos.length > 0 ? (
					<>
						<div className="flex items-center my-2">
							<p className="text-xs text-black-100">Sort by</p>
							<select
								className="rounded text-xs ml-2 focus:outline-none"
								onChange={(e) => setSortType(e.target.value)}
							>
								<option value="title">Title</option>
								<option value="date">Date</option>
							</select>
						</div>

						{todos.map((todo, idx) => (
							<TodoItem
								key={idx}
								item={todo}
								handleUpdateTodo={handleUpdateTodo}
								handleDeleteTodo={handleDeleteTodo}
							/>
						))}
					</>
				) : (
					<div className="text-center mt-5">No Todos Found</div>
				)}
				<WeatherBar />
			</div>
		</div>
	);
}
