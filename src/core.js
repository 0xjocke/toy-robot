import {Map} from 'immutable';
import {validatePlaceValues} from './validation.js';
import {TABLE_SIZE} from '../index.js';


/**
 * Takes the old state and new placeValues and return newState.
 * @param  {Immutable.Map} state
 * @param  {Object || Immutable.Map} placeValues
 * @return {Immutable.Map}
 */
export function placeRobot(state, placeValues) {
	const immbutablePlaceValues = Map(placeValues);
	if(!validatePlaceValues(immbutablePlaceValues)){
		return state;
	}
  return state
  	.set('isPlaced', true)
  	.set('tableSize', TABLE_SIZE)
  	.set('position', Map({
  		x: immbutablePlaceValues.get('x'),
  		y: immbutablePlaceValues.get('y')
  	}))
  	.set('facing', immbutablePlaceValues.get('f'));
}

/**
 * Adds or decrease depending on the change parameter.
 * Using a currying pattern to remember how postion should change.
 * Also makes sure we dont fall down from the table.
 *
 * @param  {String} change
 * @return {Int}
 */
function makeCorrectMove(change){
	return position =>{
		if(change === 'increase' && position !== 4){
			return position + 1;
		}
		if(change === 'decrease' && position !== 0){
			return position - 1;
		}
		return position;
	};
};

/**
 * Moves the robot one unit in the facing direction.
 * If the robot isnt placed old state is returned.
 *
 * @param  {Immutable.Map} state
 * @return {Immutable.Map}
 */
export function move(state) {
	if(!state.get('isPlaced')){
		return state;
	}
	switch (state.get('facing')) {
	case 'NORTH':
	  return state.updateIn(['position', 'y'], makeCorrectMove('increase'));
	case 'SOUTH':
	  return state.updateIn(['position', 'y'], makeCorrectMove('decrease'));
	case 'EAST':
		return state.updateIn(['position', 'x'], makeCorrectMove('increase'));
	case 'WEST':
		return state.updateIn(['position', 'x'], makeCorrectMove('decrease'));
	}
	return state;
}