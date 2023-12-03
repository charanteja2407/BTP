let nodes = [];
let edges = [];
let chart;
const label_size = 16; // Decreased size for better visibility
let graphData;
let numberOfNodes, graphType;

function parseAndCreateGraph() {
	graphData = document.getElementById("graphData").value.trim().split("\n");
	[numberOfNodes, graphType] = graphData[0].split(" ");
	// console.log(graphData);
	// console.log(numberOfNodes);

	nodes = Array.from({ length: parseInt(numberOfNodes) }, (_, i) => ({
		id: i + 1,
	}));
	edges = [];

	for (let i = 1; i < graphData.length; i++) {
		const [from, to, weight] = graphData[i].split(" ");
		edges.push({ from, to, weight });
	}

	// function captureWarning(str) {
	//   alert(str);
	// }

	// // console.warn = captureWarning;
	if (graphType == "Y") {
		if (isdirected(nodes, edges)) {
			createGraph(graphType);
			populateNodeSelects();
		}
	} else if (graphType == "N") {
		if (isUndirected(nodes, edges)) {
			createGraph(graphType);
			edges = duplicateEdges(edges);
			populateNodeSelects();
		}
	}
}

function duplicateEdges(edges) {
	let newEdges = [];
	edges.forEach((e) => {
		newEdges.push(e);
		newEdges.push({
			...e,
			from: e.to,
			to: e.from,
		});
	});
	return newEdges;
}

function isdirected(nodes, edges) {
	const mapEdges = new Map();

	for (const edge of edges) {
		const strEdge = `${edge.from},${edge.to}`;
		if (mapEdges.has(strEdge) && mapEdges.get(strEdge) !== edge.weight) {
			// console.log("Invalid directed graph");
			alert(
				`${strEdge} -> ${edge.weight} already exist and edge weights are different`
			);
			return false;
		}
		mapEdges.set(strEdge, edge.weight);
	}

	return true;
}

function isUndirected(nodes, edges) {
	const mapEdges = new Map();

	for (const edge of edges) {
		let x = Math.min(edge.from, edge.to),
			y = Math.max(edge.from, edge.to);
		const strEdge = `${x},${y}`;
		if (mapEdges.has(strEdge) && mapEdges.get(strEdge) !== edge.weight) {
			// console.log("Invalid undirected graph");
			alert(
				`${strEdge} - ${edge.weight} already exist and edge weights are different`
			);
			return false;
		}
		mapEdges.set(strEdge, edge.weight);
	}

	return true;
}

function createGraph(graphType) {
	container.innerHTML = "";
	var data = {
		nodes: nodes,
		edges: edges,
	};
	chart = anychart.graph(data);

	// chart.title().enabled(true).text('Labels get.');

	var labels = chart.edges().labels();

	labels.enabled(true);
	labels.format("{%weight}");
	labels.fontSize(10);

	if (graphType == "Y") {
		chart.title().enabled(true).text("Enable arrows");
		// Enable arrows.
		chart.edges().arrows().enabled(true);
	}

	// chart.edges().labels().enabled(false); // Removed edge labels
	chart.nodes().labels().enabled(true);
	chart.nodes().labels().fontSize(label_size);
	// var arrows = chart.edges().arrows();
	// arrows.enabled(false);
	// arrows.size(8);
	chart.container("container");
	chart.draw();
	chart.zoomOut();
}

function populateNodeSelects() {
	const nodeASelect = document.getElementById("nodeA");
	const nodeBSelect = document.getElementById("nodeB");
	nodeASelect.innerHTML = "";
	nodeBSelect.innerHTML = "";
	for (const node of nodes) {
		const option = document.createElement("option");
		option.text = node.id.toString();
		nodeASelect.add(option);
		nodeBSelect.add(option.cloneNode(true));
	}
}

function resetgraph() {
	var data = {
		nodes: nodes,
		edges: edges,
	};

	data.edges.forEach((edge) => {
		edge.normal = null; // Resetting edge styles
	});

	// Resetting node styles
	data.nodes.forEach((node) => {
		node.normal = null;
		node.extra = null;
	});

	chart.dispose();
	chart = anychart.graph(data);

	var labels = chart.edges().labels();
	labels.enabled(true);

	chart.nodes().labels().enabled(true);
	chart.nodes().labels().fontSize(label_size);
	labels.enabled(true);
	labels.format("{%weight}");
	labels.fontSize(10);

	if (graphType == "Y") {
		chart.edges().arrows().enabled(true);
	}

	chart.container(container);
	chart.draw();
}

// function highlightPath(path) {
//   const container = document.getElementById("container");

//   for (let i = 0; i < path.length - 1; i++) {
//     const from = path[i],
//       to = path[i + 1];
//     for (let j = 0; j < data.edges.length; j++) {
//       if (data.edges[j].from == from && data.edges[j].to == to) {
//         data.edges[j].normal = {
//           stroke: {
//             color: "#ffa000",
//             thickness: "2",
//             lineJoin: "round",
//           },
//           arrows: {
//             to: true,
//             from: true,
//           },
//         };
//       } else if (data.edges[j].from == to && data.edges[j].to == from) {
//         data.edges[j].normal = {
//           stroke: {
//             color: "#ffa000",
//             thickness: "2",
//             lineJoin: "round",
//           },
//           arrows: {
//             from: true,
//             to: true,
//           },
//         };
//       }
//     }
//   }

//   chart.dispose(); // Dispose the current chart
//   chart = anychart.graph(data); // Create a new chart with updated data

//   if (nodes.length < 12) {
//     chart.nodes().labels().enabled(true);
//     chart.nodes().labels().fontSize(label_size);
//   } else {
//     chart.nodes().labels().enabled(false);
//   }

//   chart.container(container);
//   chart.draw();
// }

//   function dijkstra(nodes, edges, startNode, endNode) {
//     const distances = {};
//     const previousNodes = {};
//     const unvisitedNodes = [];

//     nodes.forEach((node) => {
//       unvisitedNodes.push(node.id);
//       distances[node.id] = Infinity;
//       previousNodes[node.id] = null;
//     });

//     distances[startNode] = 0;

//     while (unvisitedNodes.length > 0) {
//       const currentNode = getClosestNode(unvisitedNodes, distances);
//       unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
//       edges
//         .filter((edge) => edge.from === currentNode)
//         .forEach((edge) => {
//           // const potentialDistance =
//           //   distances[currentNode] +
//           //   getEdgeWeight(currentNode, edge.to, edge.from);
//           // getEdgeWeight(currentNode, edge.to, edge.from, edge.arrows && edge.arrows.to);
//           const potentialDistance =
// distances[currentNode] +
// getEdgeWeight(currentNode, edge.to, edge.arrows && edge.arrows.to);

//           if (potentialDistance < distances[edge.to]) {
//             distances[edge.to] = potentialDistance;
//             previousNodes[edge.to] = currentNode;
//           }
//         });
//     }

//     const shortestPath = [];
//     let currentNode = endNode;

//     while (currentNode !== null) {
//       shortestPath.unshift(currentNode);
//       currentNode = previousNodes[currentNode];
//     }

//     return shortestPath.length > 1 ? shortestPath : null;
//   }

/**/
function highlightPath(path, graphType) {
	const container = document.getElementById("container");
	var data = {
		nodes: nodes,
		edges: edges,
	};

	data.edges.forEach((edge) => {
		edge.normal = null;
	});

	for (let i = 0; i < path.length - 1; i++) {
		const from = path[i],
			to = path[i + 1];
		for (let j = 0; j < data.edges.length; j++) {
			if (data.edges[j].from == from && data.edges[j].to == to) {
				data.edges[j].normal = {
					stroke: {
						color: "#ffa000",
						thickness: "2",
						lineJoin: "round",
					},
					arrows: {
						to: true,
						from: true,
					},
				};
			} else if (data.edges[j].from == to && data.edges[j].to == from) {
				data.edges[j].normal = {
					stroke: {
						color: "#ffa000",
						thickness: "2",
						lineJoin: "round",
					},
					arrows: {
						from: true,
						to: true,
					},
				};
			}
		}
	}

	data.nodes.forEach((node) => {
		node.normal = {
			fill: "blue", // Green color for start node
			stroke: {
				color: "blue",
			},
		};
	});

	// Highlight start node with one color
	data.nodes.forEach((node) => {
		if (node.id === path[0]) {
			node.normal = {
				fill: "#00ff00", // Green color for start node
				stroke: {
					color: "#00ff00",
				},
			};
		}
	});

	// Highlight end node with another color and add an extra circle around it
	data.nodes.forEach((node) => {
		if (node.id === path[path.length - 1]) {
			node.normal = {
				fill: "#ff0000", // Red color for end node
				stroke: {
					color: "#ff0000",
					thickness: "2",
				},
			};
			node.extra = {
				circle: {
					enabled: true,
					fill: "pink", // Red color for the extra circle
					radius: 100,
				},
			};
		}
	});

	chart.dispose();
	chart = anychart.graph(data);

	// chart.title().enabled(true).text("Labels get.");

	var labels = chart.edges().labels();

	labels.enabled(true);
	labels.format("{%weight}");
	labels.fontSize(10);

	if (graphType == "Y") {
		// chart.title().enabled(true).text("Enable arrows");
		// Enable arrows.
		chart.edges().arrows().enabled(true);
	}

	if (nodes.length < 12) {
		chart.nodes().labels().enabled(true);
		chart.nodes().labels().fontSize(label_size);
	} else {
		chart.nodes().labels().enabled(false);
	}

	var labels = chart.edges().labels();
	chart.nodes().labels().enabled(true);

	labels.format("{%weight}");
	labels.fontSize(10);

	chart.container(container);
	chart.draw();
}

// function highlightPath(path) {
//   const container = document.getElementById("container");
//   var data = {
//     nodes: nodes,
//     edges: edges,
//   };

//   data.edges.forEach((edge) => {
//     edge.normal = null;
//   });

//   for (let i = 0; i < path.length - 1; i++) {
//     const from = path[i],
//       to = path[i + 1];
//     for (let j = 0; j < data.edges.length; j++) {
//       if (data.edges[j].from == from && data.edges[j].to == to) {
//         data.edges[j].normal = {
//           stroke: {
//             color: "#ffa000",
//             thickness: "2",
//             lineJoin: "round",
//           },
//           arrows: {
//             to: true,
//             from: true,
//           },
//         };

//         // Calculate middle point for the arrow
//         const middlePoint = calculateMiddlePoint(data.nodes, from, to);
//         data.edges[j].normal["arrow-at"] = middlePoint;
//       } else if (data.edges[j].from == to && data.edges[j].to == from) {
//         data.edges[j].normal = {
//           stroke: {
//             color: "#ffa000",
//             thickness: "2",
//             lineJoin: "round",
//           },
//           arrows: {
//             from: true,
//             to: true,
//           },
//         };

//         // Calculate middle point for the arrow
//         const middlePoint = calculateMiddlePoint(data.nodes, to, from);
//         data.edges[j].normal["arrow-at"] = middlePoint;
//       }
//     }
//   }

//   // Highlight start node with one color
//   data.nodes.forEach((node) => {
//     if (node.id === path[0]) {
//       node.normal = {
//         fill: "#00ff00", // Green color for start node
//         stroke: {
//           color: "#00ff00",
//         },
//       };
//     }
//   });

//   // Highlight end node with another color and add an extra circle around it
//   data.nodes.forEach((node) => {
//     if (node.id === path[path.length - 1]) {
//       node.normal = {
//         fill: "#ff0000", // Red color for end node
//         stroke: {
//           color: "#ff0000",
//           thickness: "2",
//         },
//       };
//       node.extra = {
//         circle: {
//           enabled: true,
//           fill: "blue", // Red color for the extra circle
//           radius: 100,
//         },
//       };
//     }
//   });

//   chart.dispose();
//   chart = anychart.graph(data);

//   if (nodes.length < 12) {
//     chart.nodes().labels().enabled(true);
//     chart.nodes().labels().fontSize(label_size);
//   } else {
//     chart.nodes().labels().enabled(false);
//   }

//   chart.container(container);
//   chart.draw();
// }

function calculateMiddlePoint(nodes, fromNode, toNode) {
	const from = nodes.find((node) => node.id === fromNode);
	const to = nodes.find((node) => node.id === toNode);

	if (from && to) {
		const middlePointX = (from.x + to.x) / 2;
		const middlePointY = (from.y + to.y) / 2;
		return [middlePointX, middlePointY];
	}

	return null;
}
function findTspPath() {
	const path = travelingSalesman();
	highlightPath(path, graphType);
}

function travelingSalesman() {
	const graph = [];
	const nodeMap = {};

	console.log(nodes, edges);
	for (let i = 0; i < nodes.length; i++) {
		nodeMap[nodes[i].id] = i;
		// nodeMap[i] = nodes[i].id;
		graph.push(new Array(nodes.length).fill(0));
	}

	// Populate the graph with edge weights
	for (const edge of edges) {
		const fromIdx = nodeMap[parseInt(edge.from)];
		const toIdx = nodeMap[parseInt(edge.to)];

		// const fromIdx = nodes.indexOf(edge.from);
		// const toIdx = nodes.indexOf(edge.to);
		graph[fromIdx][toIdx] = parseInt(edge.weight);
	}

	console.log("grap", graph);

	let { path, cost } = tsp(graph);
	console.log("path", path);

	let outPath = [];
	path.forEach((p) => outPath.push(nodes[p].id));

	console.log("ans", outPath);

	return outPath;
}
function tsp(graph) {
	let n = graph.length;
	let dp = Array.from(Array(1 << n), () => Array(n).fill(-1));
	let path = Array.from(Array(1 << n), () => Array(n));

	function tsp(mask, pos) {
		if (mask === (1 << n) - 1) {
			return graph[pos][0];
		}
		if (dp[mask][pos] !== -1) {
			return dp[mask][pos];
		}

		let ans = Number.MAX_VALUE;

		for (let i = 0; i < n; i++) {
			if ((mask >> i) & 1) continue;
			let newAns = graph[pos][i] + tsp(mask | (1 << i), i);
			if (newAns < ans) {
				ans = newAns;
				path[mask][pos] = i;
			}
		}

		return (dp[mask][pos] = ans);
	}

	let minCost = tsp(1, 0);

	let mask = 1;
	let pos = 0;
	let tspPath = [0];
	while (true) {
		pos = path[mask][pos];
		mask = mask | (1 << pos);
		tspPath.push(pos);
		if (mask === (1 << n) - 1) break;
	}

	return { path: tspPath, cost: minCost };
}

function getClosestNode(unvisitedNodes, distances) {
	return unvisitedNodes.reduce((closestNode, node) => {
		if (distances[node] < distances[closestNode]) {
			// console.log("node: " + node);
			return node;
		} else {
			return closestNode;
		}
	}, unvisitedNodes[0]);
}

function getEdgeWeight(edge, toNode) {
	return edge.to === toNode ? edge.weight : null; // Modifying to find the weight based on the 'to' node
}
