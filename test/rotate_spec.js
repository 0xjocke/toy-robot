import {List, Map} from 'immutable';
import {expect} from 'chai';
import {rotate} from '../src/core';

describe('rotate', () => {
	it('should rotate to West if State is NORTH and action LEFT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'NORTH'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'WEST'
		}));
	});
	it('should rotate to EAST if State is NORTH and action RIGHT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'NORTH'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should rotate to EAST if state is SOUTH and action LEFT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should rotate to WEST if state is SOUTH and action RIGHT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'WEST'
		}));
	});
	it('should rotate to NORTH if state is WEST and action RIGHT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'WEST'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'NORTH'
		}));
	});
	it('should rotate to SOUTH if state is WEST and action LEFT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'WEST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		}));
	});
	it('should rotate to SOUTH if state is EAST and action RIGHT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		});
		const nextState = rotate(state, 'RIGHT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		}));
	});
	it('should rotate to NORTH if state is EAST and action LEFT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'NORTH'
		}));
	});
	it('should not rotate if it hasn\'t been placed', () => {
		const state = Map({
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		});
		const nextState = rotate(state, 'LEFT')
		expect(nextState).to.equal(state);
	});
	it('should not rotate if the direction not is LEFT or RIGHT', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		});
		const nextState = rotate(state, 'HELLO')
		expect(nextState).to.equal(state);
	});
});
