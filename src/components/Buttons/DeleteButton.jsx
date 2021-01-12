import React, { Component } from "react";

export default class EditButton extends Component {
	render() {
		return (
			<button
				className="ml-2 focus:outline-none"
				onClick={this.props.handleDeleteTodo}
			>
				<i className="far fa-trash-alt"></i>
			</button>
		);
	}
}
