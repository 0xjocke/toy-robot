'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.place = place;
exports.move = move;
exports.report = report;
exports.rotate = rotate;

function place(position) {
	return {
		type: 'PLACE',
		position: position
	};
}

function move() {
	return {
		type: 'MOVE'
	};
}

function report() {
	return {
		type: 'REPORT'
	};
}

function rotate(direction) {
	return {
		type: 'ROTATE',
		direction: direction
	};
}