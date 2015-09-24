'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.handleCommand = handleCommand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _action_creatorsJs = require('./action_creators.js');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * Handles singlecommand
 * @param  {string} command
 * @return {Array}
 */
function handleSingleCommand(command) {
	if (command === 'LEFT' || command === 'RIGHT') {
		return [(0, _action_creatorsJs.rotate)(command)];
	}
	if (command === 'REPORT') {
		return [(0, _action_creatorsJs.report)()];
	}
	if (command === 'MOVE') {
		return [(0, _action_creatorsJs.move)()];
	}
	console.log('I dont know what that mean..');
	return [];
}
/**
 * Checks if filetype of path is Txt
 * Also gives error message is needed.
 * @param  {String}  path
 * @return {Boolean}
 */
function isFileTypeTxt(path) {
	var fileType = path.substr(path.lastIndexOf('.')).toLowerCase();
	if (fileType !== '.txt') {
		console.log('I can only read .txt files');
		return false;
	} else {
		return true;
	}
}

/**
 * handleReadCommand checks that its a .txt file
 * If a file its found it splits the commands to an array.
 * @param  {String} path
 * @return {Array}
 */
function handleReadCommand(path) {
	if (!isFileTypeTxt(path)) {
		return [];
	}
	try {
		return _fs2['default'].readFileSync(path, 'utf8').split('\n');
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log('I\'m sorry, I cant find your file.');
		} else {
			console.log(err);
		}
		return [];
	}
}

/**
 * Returns action for PLACE command.
 * If action isnt PLACE or we have less than three arguments return null.
 * The validation of the arguments is handled by the reducer.
 *
 * @param  {String} command
 * @return {Array}
 */
function handleCommandWithArguments(command) {
	var _command$split = command.split(' ');

	var _command$split2 = _slicedToArray(_command$split, 2);

	var actionType = _command$split2[0];
	var actionArguments = _command$split2[1];

	var _actionArguments$split = actionArguments.split(',');

	var _actionArguments$split2 = _slicedToArray(_actionArguments$split, 3);

	var x = _actionArguments$split2[0];
	var y = _actionArguments$split2[1];
	var f = _actionArguments$split2[2];

	if (actionType === 'READ') {
		return handleReadCommand(actionArguments).map(handleCommand).reduce(function (acc, val) {
			return acc.concat(val);
		}, []);
	}
	if (actionType !== 'PLACE' || actionArguments.split(',').length !== 3) {
		console.log('Are you trying to PLACE me?');
		return [];
	}
	return [(0, _action_creatorsJs.place)({
		x: parseInt(x, 10),
		y: parseInt(y, 10),
		f: f
	})];
}

/**
 * handleCommand
 * @param  {string} input
 * @return {Array}
 */

function handleCommand(input) {
	var command = input.toUpperCase().trim(),
	    actionWithArguments = command.split(' ').length > 1;
	if (actionWithArguments) {
		return handleCommandWithArguments(command);
	}
	return handleSingleCommand(command);
}