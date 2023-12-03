class PriorityQueue {
	constructor() {
		this.queue = [];
	}

	enqueue(item) {
		this.queue.push(item);
		this.queue.sort((a, b) => a[0] - b[0]);
	}

	dequeue() {
		if (this.isEmpty()) return -1;
		return this.queue.shift();
	}

	isEmpty() {
		return this.queue.length === 0;
	}
}

function dij(nodes, edges, start, end) {
	edges.forEach((e) => {
		e.from = parseInt(e.from);
		e.to = parseInt(e.to);
		e.weight = parseInt(e.weight);
	});

	const nodeMap = {};
	nodes.forEach((node, i) => {
		nodeMap[node.id] = i;
	});

	const sn = nodeMap[start];
	const en = nodeMap[end];

	let n = nodes.length;

	const adj = {};
	edges.forEach((edge) => {
		let from = nodeMap[edge.from];
		let to = nodeMap[edge.to];
		let dis = edge.weight;

		if (!adj[from]) adj[from] = [];
		adj[from].push([to, dis]);
	});

	const par = {};
	par[sn] = -1;

	const dist = Array(n).fill(Infinity);

	dist[sn] = 0;
	const minHeap = new PriorityQueue();
	minHeap.enqueue([0, sn]);

	while (!minHeap.isEmpty()) {
		const [d, x] = minHeap.dequeue();

		if (x == en) break;

		adj[x].forEach((yData) => {
			let y = yData[0];
			let w = yData[1];

			if (d + w < dist[y]) {
				dist[y] = d + w;
				minHeap.enqueue([d + w, y]);
				par[y] = x;
			}
		});
	}

	let path = [];
	if (dist[en] == Infinity) return;

	let x = en;
	while (par[x] != -1) {
		path.push(x);
		x = par[x];
	}
	path.push(sn);

	let ans = [];
	path.reverse().forEach((p) => ans.push(nodes[p].id));

	return ans;
}

nodes = [
	{
		id: 1,
	},
	{
		id: 2,
	},
	{
		id: 3,
	},
	{
		id: 4,
	},
	{
		id: 5,
	},
];

edges = [
	{
		from: "1",
		to: "2",
		weight: "2",
	},
	{
		from: "2",
		to: "1",
		weight: "2",
	},
	{
		from: "1",
		to: "3",
		weight: "1",
	},
	{
		from: "3",
		to: "1",
		weight: "1",
	},
	{
		from: "2",
		to: "3",
		weight: "3",
	},
	{
		from: "3",
		to: "2",
		weight: "3",
	},
	{
		from: "2",
		to: "4",
		weight: "5",
	},
	{
		from: "4",
		to: "2",
		weight: "5",
	},
	{
		from: "3",
		to: "4",
		weight: "1",
	},
	{
		from: "4",
		to: "3",
		weight: "1",
	},
	{
		from: "4",
		to: "5",
		weight: "4",
	},
	{
		from: "5",
		to: "4",
		weight: "4",
	},
];

console.log(dij(nodes, edges, 1, 5));
