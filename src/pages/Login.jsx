import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import Page from "../components/Page";

export default function Login() {
	const [isLoginSuccess, setIsLoginSuccess] = useState(false);
	const [form] = Form.useForm();

	const onFinish = (values) => {
		const headers = {
			"Content-Type": "application/json",
		};

		axios
			.post(process.env.REACT_APP_WEBSITE_NAME + "/api/login", values, {
				headers: headers,
			})
			.then((res) => {
				form.resetFields();
				localStorage.setItem("token", res.data.token);
				message.success("Login Success");
				setIsLoginSuccess(true);
			})
			.catch((err) => {
				message.error(err.response.data.msg);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Page>
			{localStorage.getItem("token") ? (
				<Redirect to="/" />
			) : (
				<div className="w-2/4 mx-auto mt-28">
					<Form
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						form={form}
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<div className="flex justify-center">
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Login
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			)}
			{isLoginSuccess ? <Redirect to="/" /> : null}
		</Page>
	);
}
