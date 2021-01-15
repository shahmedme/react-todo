import React, { useState, useEffect } from "react";
import { Card, Checkbox } from "antd";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

export default function TodoItem(props) {
	const [item, setItem] = useState(props.item);
	const [title, setTitle] = useState();
	const [showActionButtons, setShowActionButtons] = useState(false);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		setItem(props.item);
	}, [props]);

	const handleEditTodo = () => {
		setTitle(item.title);
		setEditMode(true);
	};

	const handleDeleteTodo = () => {
		let isDelete = window.confirm("Are you sure you want to delete?");

		if (isDelete) {
			props.handleDeleteTodo(item.id);
		}
	};

	const handleUpdateTodo = () => {
		if (title.length !== 0) {
			let updatedItem = {
				title: title,
				date: item.date,
				id: item.id,
			};
			props.handleUpdateTodo(updatedItem);
			setItem(updatedItem);
			setEditMode(false);
		} else {
			alert("Field Can't be blank");
		}
	};

	const handleUpdateCancel = () => {
		setTitle(item.title);
		setEditMode(false);
	};

	const handleInputChange = (e) => {
		setTitle(e.target.value);
	};

	const handleActionButtonsVisibility = () => {
		showActionButtons
			? setShowActionButtons(false)
			: setShowActionButtons(true);
	};

	const handleStatusChange = () => {
		let updatedItem = {
			...item,
			status: "completed",
		};
		props.handleUpdateTodo(updatedItem);
		setItem(updatedItem);
	};

	return (
		<>
			<Card
				bordered={false}
				bodyStyle={{ padding: "7px 10px" }}
				className="mb-3 todo-item"
				onMouseEnter={handleActionButtonsVisibility}
				onMouseLeave={handleActionButtonsVisibility}
			>
				{!editMode ? (
					<>
						<div className="inline-flex">
							{showActionButtons ? (
								<Checkbox onChange={handleStatusChange}></Checkbox>
							) : null}
							<p className="title ml-2">{props.item.title}</p>
						</div>
						{showActionButtons ? (
							<div className="action-buttons">
								<EditButton handleEditTodo={handleEditTodo} />
								<DeleteButton handleDeleteTodo={handleDeleteTodo} />
							</div>
						) : (
							<div className="text-xs pt-0.5 date">
								{new Date(item.date).toLocaleString("default", {
									day: "numeric",
									month: "long",
								})}
							</div>
						)}
					</>
				) : (
					<>
						<input
							type="text"
							value={title}
							className="w-72 mr-4 focus:outline-none update-field"
							onChange={handleInputChange}
						/>
						<div className="buttons">
							<button
								className="focus:outline-none bg-red-500 text-white rounded-sm text-sm px-2 py-0.5 btn-update"
								onClick={handleUpdateCancel}
							>
								Cancel
							</button>
							<button
								className="focus:outline-none bg-green-500 text-white rounded-sm text-sm px-2 py-0.5 ml-1 btn-update"
								onClick={handleUpdateTodo}
							>
								Update
							</button>
						</div>
					</>
				)}
			</Card>
			<style jsx>{`
				.title {
					float: left;
				}

				.date {
					float: right;
				}

				.action-buttons {
					float: right;
				}

				.update-field {
					float: left;
					border-bottom: 1px solid rgba(0, 0, 0, 0.6);
				}

				.buttons {
					float: right;
				}
			`}</style>
		</>
	);
}
