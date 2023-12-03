import React, { Component } from "react";
import SimpleSelect from "./simpleSelect";

class Menu extends Component {
	render() {
		return (
			<nav className="nav" style={{ backgroundColor: "#1a73e8" }}>
				<SimpleSelect
					onAlgoChanged={this.props.onAlgoChanged}
					items={this.props.algorithms}
				/>
				{/* <SimpleSelect
					onAlgoChanged={this.props.onMazeChanged}
					items={this.props.mazes}
				/> */}
				<button
					onClick={this.props.onVisualize}
					className="btn m-2"
					style={{ backgroundColor: "white", color: "black" }}>
					Visualize
				</button>
				<button
					className="btn m-2"
					onClick={this.props.onCreateMaze}
					style={{ backgroundColor: "white", color: "black" }}>
					Create Maze
				</button>
				<button
					onClick={this.props.onClearPath}
					className="btn m-2"
					style={{ backgroundColor: "white", color: "black" }}>
					Clear Path
				</button>
				<button
					onClick={this.props.onClearBoard}
					className="btn  m-2"
					style={{ backgroundColor: "white", color: "black" }}>
					Clear Board
				</button>
			</nav>
		);
	}
}

export default Menu;
