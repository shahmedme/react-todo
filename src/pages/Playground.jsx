import React from "react";
import {
	Switch,
	Route,
	Link,
	useHistory,
	useRouteMatch,
} from "react-router-dom";
import { Button } from "antd";

export default function Playground() {
	let history = useHistory();
	let match = useRouteMatch();

	const handleClick = () => {
		console.log(match);
	};

	return (
		<div>
			<Button type="primary" onClick={handleClick}>
				Click Me
			</Button>
		</div>
	);
}
