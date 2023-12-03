import React, { Component } from "react";
import SimpleSelect from "./simpleSelect";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<nav
				className="navbar navbar-expand-lg"
				// style={{ backgroundColor: "" }}
			>
				<span className="navbar-brand">Graph Visualizer</span>
			</nav>
		);
	}
}

export default Navbar;
