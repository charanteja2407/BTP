import React, { Component } from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Pathfinder from "./pathfinderComponents/pathfinder";

class App extends Component {
	render() {
		return (
			<Router basename="/">
				<Switch>
					<Route path="/" component={Pathfinder} />
				</Switch>
			</Router>
		);
	}
}

export default App;
