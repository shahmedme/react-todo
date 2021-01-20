import React from "react";
import {
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams,
} from "react-router-dom";
import { Button } from "antd";
import { InnerNav } from "../components/Navbar/";
import XYChart from "../components/Charts/XYChart";
import PieChart from "../components/Charts/PieChart";
import RadarChart from "../components/Charts/RadarChart";
import TreeMapChart from "../components/Charts/TreeMapChart";
import SankeyDiagram from "../components/Charts/SankeyDiagram";

export default function Chart() {
	let match = useRouteMatch();

	return (
		<div>
			<InnerNav />

			<Switch>
				<Route path={match.path + "/pie"} component={PieChart} />
				<Route path={match.path + "/xy"} component={XYChart} />
				<Route path={match.path + "/radar"} component={RadarChart} />
				<Route path={match.path + "/treemap"} component={TreeMapChart} />
				<Route path={match.path + "/sankeydiagram"} component={SankeyDiagram} />
			</Switch>
		</div>
	);
}
