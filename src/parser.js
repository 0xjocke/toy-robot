import {place, rotate, move, report} from './action_creators.js';

/**
 * Handles singlecommand
 * @param  {string} command
 * @return {Object}
 */
function handleSingleCommand(command){
	if(command === 'LEFT' || command === 'RIGHT'){
		return rotate(command);
	}
	if(command === 'REPORT'){
		return report();
	}
	if(command === 'MOVE'){
		return move();
	}
	return null;
}

/**
 * Returns action object for PLACE command.
 * If action isnt PLACE or we have less than three arguments return null.
 * The validation of the arguments is handled by the reducer.
 *
 * @param  {String} command
 * @return {Object}
 */
function handleCommandWithArguments(command){
	const [actionType, actionArguments] = command.split(' '),
		  [x,y,f] = actionArguments.split(',');
	if(actionType !== 'PLACE' || actionArguments.split(',').length !== 3){
		return null;
	}
	return place({
		x: parseInt(x, 10),
		y: parseInt(y,10),
		f: f
	});
}

/**
 * handleCommand
 * @param  {string} input
 * @return {object}
 */
export function handleCommand(input){
	const command = input.toUpperCase().trim(),
		  actionWithArguments = command.split(' ').length > 1;
	if(actionWithArguments){
		return handleCommandWithArguments(command);
	}
	return handleSingleCommand(command);
}