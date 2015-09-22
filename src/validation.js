import {Map} from 'immutable';
import {TABLE_SIZE} from '../index.js';

/**
 * Checks if number is and Integer
 * @param  {int}  number
 * @return {Boolean}
 */
function isNumberAnInteger(number){
	return typeof number ==='number' && (number%1) === 0;
}

/**
 * Valdates position, make sure X and Y is an Integer
 * And that is inside of our table.
 * @private
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
function validatePosition(placeValues){
	const isNegativeNumber = placeValues.get('y') < 0 || placeValues.get('x') < 0,
		  xIsBiggerThanTableSize = placeValues.get('x') > TABLE_SIZE.get('x'),
		  yIsBiggerThanTableSize = placeValues.get('y') > TABLE_SIZE.get('y');

	if(!isNumberAnInteger(placeValues.get('y')) ||
	   !isNumberAnInteger(placeValues.get('x')) ){
		return false;
	}

	if(isNegativeNumber){
		return false;
	}

	if(xIsBiggerThanTableSize || yIsBiggerThanTableSize){
		return false;
	}
	return true;
}

/**
 * Checks that facing is valid string.
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
function validateFacing(placeValues){
	const validFacingValue = Map({
		NORTH: true,
		SOUTH: true,
		EAST: true,
		WEST: true
	});
	return validFacingValue.has(placeValues.get('f'));
}

/**
 * Validate placeValues with the help of private validation functions.
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
export function validatePlaceValues(placeValues){
	if(!validateFacing(placeValues)){
		return false;
	}
	if(!validatePosition(placeValues)){
		return false;
	}
	return true;
}