import React, { Component } from "react";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

export default class TodoItem extends Component {
	state = {
		item: this.props.item,
		title: this.props.item.title,
		showActionButtons: true,
	};

	handleEditTodo = () => {
		this.setState({ showActionButtons: false });
	};

	handleDeleteTodo = () => {
		this.props.handleDeleteTodo(this.props.item.title);
	};

	handleUpdateTodo = () => {
		let newItem = {
			title: this.state.title,
			date: this.state.item.date,
		};

		this.props.handleUpdateTodo(this.props.item, newItem);

		this.setState({
			showActionButtons: true,
		});
	};

	handleInputChange = (e) => {
		this.setState({ title: e.target.value });
	};

	render() {
		return (
			<div className="shadow-md bg-white my-3 rounded py-2 px-3 flex items-center justify-between todo-item">
				{this.state.showActionButtons ? (
					<>
						<p>{this.state.title}</p>
						<div className="action-buttons">
							<EditButton handleEditTodo={this.handleEditTodo} />
							<DeleteButton handleDeleteTodo={this.handleDeleteTodo} />
						</div>
					</>
				) : (
					<>
						<input
							type="text"
							value={this.state.title}
							className="w-full mr-4 focus:outline-none update-field"
							onChange={this.handleInputChange}
						/>
						<button
							className="focus:outline-none bg-green-500 text-white text-sm px-2 py-0.5 rounded"
							onClick={this.handleUpdateTodo}
						>
							Update
						</button>
					</>
				)}
			</div>
		);
	}
}
