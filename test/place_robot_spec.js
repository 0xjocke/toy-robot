import {List, Map} from 'immutable';
import {expect} from 'chai';

import {placeRobot} from '../src/core';



describe('placeRobot', () => {

	it('place to robot on correct cordinates and direction', () => {
		const state = Map();
		const placeValues = Map({
			x: 1,
			y:1,
			f: 'WEST'
		});
		const nextState = placeRobot(state, placeValues);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				width: 5,
				height:5
			}),
			position: Map({x: 1, y: 1}),
			facing: 'WEST'
		}));
	});

	it('converts to immutable', () => {
		const state = Map();
		const placeValues = {
			x: 1,
			y:1,
			f: 'WEST'
		};
		const nextState = placeRobot(state, placeValues);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 1}),
				facing: 'WEST'
			}));
	});

	it('ignores place action if X or Y greater than table size', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: 6,
			y:1,
			f: 'WEST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y:9,
			f: 'WEST'
		};
		const nextStateInvalidX = placeRobot(state, placeValuesInvalidX);
		const nextStateInvalidY = placeRobot(state, placeValuesInvalidY);
		expect(nextStateInvalidX).to.equal(state);
		expect(nextStateInvalidY).to.equal(state);

	});

	it('can be placed when it already have been placed', () => {
		const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 1}),
				facing: 'EAST'
		});
		const placeValues = {
			x: 1,
			y:3,
			f: 'NORTH'
		};
		const nextState = placeRobot(state, placeValues);
		expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
		}));
	});
	it('should ignore place action when position X or Y is not an integer', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: 1.3,
			y:3,
			f: 'EAST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y:3.1,
			f: 'EAST'
		};
		const nextStateInvalidY = placeRobot(state, placeValuesInvalidX);
		const nextStateInvalidX = placeRobot(state, placeValuesInvalidY);
		expect(nextStateInvalidY).to.equal(state);
		expect(nextStateInvalidX).to.equal(state);
	});
	it('should ignore place action when position X or Y is negative', () => {
		const state = Map();
		const placeValuesInvalidX = {
			x: -1,
			y:3,
			f: 'EAST'
		};
		const placeValuesInvalidY = {
			x: 1,
			y: -4,
			f: 'EAST'
		};
		const nextStateInvalidY = placeRobot(state, placeValuesInvalidX);
		const nextStateInvalidX = placeRobot(state, placeValuesInvalidY);
		expect(nextStateInvalidY).to.equal(state);
		expect(nextStateInvalidX).to.equal(state);
	});

	it('should ignore place action when facing is not WEST, EAST, SOUTH or NORTH ', () => {
		const state = Map();
		const placeValues = {
			x: 1,
			y:3,
			f: 'MIDDLE'
		};
		const nextState = placeRobot(state, placeValues);
		expect(nextState).to.equal(Map());
	});
});