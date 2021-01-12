import React, { Component } from "react";

export default class EditButton extends Component {
	render() {
		return (
			<button
				className="focus:outline-none"
				onClick={this.props.handleEditTodo}
			>
				<i className="far fa-edit"></i>
			</button>
		);
	}
}
