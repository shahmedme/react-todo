import React, { Component } from "react";
import AddTodoItem from "./components/AddTodoItem";
import TodoItem from "./components/TodoItem";
import { Button } from "antd";
import "./App.css";

export default class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		let todos = JSON.parse(localStorage.getItem("todos"));

		if (todos !== null) {
			todos.sort((item1, item2) => (item1.title > item2.title ? 1 : -1));
			this.setState({ todos });
		}
	}

	handleAddTodo = (item) => {
		let newTodo = {
			title: item,
			date: new Date(),
		};

		let newTodoList = this.state.todos.concat(newTodo);
		localStorage.setItem("todos", JSON.stringify(newTodoList));
		// newTodoList.sort((item1, item2) => (item1.title > item2.title ? 1 : -1));
		this.setState({ todos: newTodoList });
	};

	handleUpdateTodo = (previousItem, newItem) => {
		let filteredTodoList = this.state.todos.filter(
			(todo) => todo.title !== previousItem.title
		);

		let updatedTodoList = filteredTodoList.concat(newItem);

		localStorage.setItem("todos", JSON.stringify(updatedTodoList));
	};

	handleDeleteTodo = (item) => {
		let filteredTodoList = this.state.todos.filter(
			(todo) => todo.title !== item
		);

		localStorage.setItem("todos", JSON.stringify(filteredTodoList));
		this.setState({ todos: filteredTodoList });
	};

	handleSort = (e) => {
		console.log("handlesort");
		if (e.target.value === "date") {
			let sortedTodosByDate = this.state.todos.sort(
				(item1, item2) => item1.date - item2.date
			);

			console.log(this.state.todos, sortedTodosByDate);

			this.setState({
				todos: sortedTodosByDate,
			});
		}
	};

	render() {
		return (
			<div className="flex justify-center">
				<div className="my-24">
					<h1 className="text-center text-4xl font-bold mb-5">TODO App</h1>

					<AddTodoItem handleAddTodo={this.handleAddTodo} />

					{this.state.todos.length > 0 ? (
						<>
							<div className="flex items-center my-2">
								<p className="text-xs text-black-100">Sort by</p>
								<select
									className="rounded text-xs ml-2 focus:outline-none"
									onChange={this.handleSort}
								>
									<option value="title">Title</option>
									<option value="date">Date</option>
								</select>
							</div>

							{this.state.todos.map((todo) => (
								<TodoItem
									item={todo}
									handleUpdateTodo={this.handleUpdateTodo}
									handleDeleteTodo={this.handleDeleteTodo}
								/>
							))}
						</>
					) : (
						<div className="text-center mt-5">No Todos Found</div>
					)}
				</div>
			</div>
		);
	}
}
