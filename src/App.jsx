import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import "./App.css";

export default function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/history" component={History} />
			</Switch>
			<style>{`
				a:hover {
					color: inherit;
				}
			`}</style>
		</Router>
	);
}
