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

const minHeap = new PriorityQueue();
minHeap.enqueue([2, 3]);
minHeap.enqueue([0, 0]);
minHeap.enqueue([3, 3]);
minHeap.enqueue([1, 2]);

console.log("Min heap:", minHeap.dequeue());
console.log("Min heap:", minHeap.dequeue());
