import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Playground from "./pages/Playground";
import Chart from "./pages/Chart";
import Charts from "./pages/Charts";
import "./App.css";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/history" component={History} />
				<Route exact path="/playground" component={Playground} />
				<Route path="/chart" component={Chart} />
				<Route path="/charts" component={Charts} />
				<Route exact path="/" component={Home} />
			</Switch>
			<style>{`
				a:hover {
					color: inherit;
				}
			`}</style>
		</Router>
	);
}
