import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
	const [todos, setTodos] = useState(props.todos);

	useEffect(() => {
		setTodos(props.todos);
	}, [props]);

	const handleSort = (e) => {
		switch (e.target.value) {
			case "title":
				let sortedTodosByTitle = [...todos].sort((item1, item2) =>
					item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
				);
				setTodos(sortedTodosByTitle);
				break;
			case "date":
				let sortedTodosByDate = [...todos].sort(
					(item1, item2) => Date.parse(item1.date) - Date.parse(item2.date)
				);
				setTodos(sortedTodosByDate);
				break;
			default:
				console.log("hello");
		}
	};

	return (
		<>
			{todos.length > 0 ? (
				<>
					<SortBy handleSort={handleSort} />
					<div className="todo-item-wrapper">
						{todos.map((todo, idx) => (
							<TodoItem
								key={idx}
								item={todo}
								handleUpdateTodo={props.handleUpdateTodo}
								handleDeleteTodo={props.handleDeleteTodo}
							/>
						))}
					</div>
				</>
			) : (
				<div className="text-center mt-5">No Todos Found</div>
			)}
			<style jsx>{`
				.todo-item-wrapper {
					overflow-y: scroll;
					height: 370px;
				}

				.todo-item-wrapper::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</>
	);
}

function SortBy(props) {
	const { handleSort } = props;

	return (
		<div className="flex items-center my-2">
			<p className="text-xs text-black-100">Sort by</p>
			<select
				className="rounded text-xs ml-2 focus:outline-none"
				onChange={handleSort}
			>
				<option value="date">Date</option>
				<option value="title">Title</option>
			</select>
		</div>
	);
}
