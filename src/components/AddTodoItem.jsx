import React, { Component } from "react";

export default class Add extends Component {
	state = {
		title: "",
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.props.handleAddTodo(this.state.title);
		this.setState({
			title: "",
		});
	};

	handleInputChange = (e) => {
		this.setState({
			title: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						value={this.state.title}
						placeholder="What to do?"
						className="py-2 px-3 rounded w-96 focus:outline-none"
						onChange={this.handleInputChange}
					/>
					<button
						type="submit"
						className="bg-red-500 px-5 py-2 ml-2 text-white font-bold rounded focus:outline-none"
					>
						Add
					</button>
				</form>
			</div>
		);
	}
}
