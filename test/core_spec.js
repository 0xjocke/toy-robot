import {List, Map} from 'immutable';
import {expect} from 'chai';

import {placeRobot, move} from '../src/core';

describe('app logic', () => {

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

	describe('move', () => {
		it('should move one unit North when facing North', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 4}),
				facing: 'NORTH'
			}));
		});
		it('should move one unit South when facing South', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 2, y: 3}),
				facing: 'SOUTH'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 2, y: 2}),
				facing: 'SOUTH'
			}));
		});
		it('should move one unit EAST when facing EAST', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 2, y: 3}),
				facing: 'EAST'
			})
			const nextState = move(state);
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
		it('should move one unit WEST when facing WEST', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 2, y: 3}),
				facing: 'WEST'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 1, y: 3}),
				facing: 'WEST'
			}));
		});
		it('should not move when facing WEST and x is 0 (end of table)', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 0, y: 3}),
				facing: 'WEST'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 0, y: 3}),
				facing: 'WEST'
			}));
		});
		it('should not move when facing EAST and x is 4 (end of table)', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 3}),
				facing: 'EAST'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 3}),
				facing: 'EAST'
			}));
		});
		it('should not move when facing NORTH and y is 4 (end of table)', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 4}),
				facing: 'NORTH'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 4}),
				facing: 'NORTH'
			}));
		});
		it('should not move when facing SOUTH and y is 0 (end of table)', () => {
			const state = Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 0}),
				facing: 'SOUTH'
			})
			const nextState = move(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 4, y: 0}),
				facing: 'SOUTH'
			}));
		});
		it('should not move if robot hasnt been placed', () => {
			const state = Map({
				tableSize: Map({
					width: 5,
					height:5
				}),
				position: Map({x: 3, y: 3}),
				facing: 'SOUTH'
			});
			const nextState = move(state);
			expect(nextState).to.equal(state);
		});
	});
});