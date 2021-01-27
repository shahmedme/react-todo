import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Playground from "./pages/Playground";
import Chart from "./pages/Chart";
import Timeline from "./pages/Timeline";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

export default function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/history" component={History} />
				<Route exact path="/playground" component={Playground} />
				<PrivateRoute path="/chart" component={Chart} />
				<PrivateRoute path="/timeline" component={Timeline} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/register" component={Register} />
				<PrivateRoute exact path="/" component={Home} />
			</Switch>
			<style>{`
				a:hover {
					color: inherit;
				}
			`}</style>
		</Router>
	);
}
