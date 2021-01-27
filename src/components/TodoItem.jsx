import React, { useState, useEffect } from "react";
import { Card, Checkbox, DatePicker, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

const { confirm } = Modal;
const { RangePicker } = DatePicker;

export default function TodoItem(props) {
	const [item, setItem] = useState(props.item);
	const [title, setTitle] = useState();
	const [showActionButtons, setShowActionButtons] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [range, setRange] = useState(null);

	useEffect(() => {
		setItem(props.item);
	}, [props]);

	const handleEditTodo = () => {
		setTitle(item.title);
		setEditMode(true);
	};

	const handleUpdateTodo = () => {
		if (title.length !== 0) {
			let updatedItem = {
				...item,
				title: title,
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

	const handleCompleteTask = () => {
		let updatedItem = {
			...item,
			status: "completed",
			range: range,
		};

		props.handleUpdateTodo(updatedItem);
		setItem(updatedItem);
	};

	const showDeleteConfirm = () => {
		confirm({
			title: "Are you sure delete this task?",
			icon: <ExclamationCircleOutlined />,
			// content: "Some descriptions",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				props.handleDeleteTodo(item._id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
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
								<Checkbox onChange={() => setIsModalVisible(true)}></Checkbox>
							) : null}
							<p className="title ml-2">{props.item.title}</p>
						</div>
						{showActionButtons ? (
							<div className="action-buttons">
								<EditButton handleEditTodo={handleEditTodo} />
								<DeleteButton handleDeleteTodo={showDeleteConfirm} />
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
			<Modal
				title="Total Spent Time"
				visible={isModalVisible}
				onOk={() => {
					handleCompleteTask();
					setIsModalVisible(false);
				}}
				onCancel={() => setIsModalVisible(false)}
			>
				<RangePicker
					onChange={(value, dateString) => {
						setRange(dateString);
					}}
				/>
			</Modal>
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
