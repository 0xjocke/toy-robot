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