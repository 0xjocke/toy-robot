#!/usr/bin/env babel-node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcStore = require('./src/store');

var _srcStore2 = _interopRequireDefault(_srcStore);

var _srcParser = require('./src/parser');

require('colors');

var readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});
var store = (0, _srcStore2['default'])();

console.log('Welcome to toy robot.'.green.bold);
console.log('');
console.log('These are valid command:'.bold);
console.log('PLACE x y f'.bold.underline);
console.log('- Where x and y is coordinates and f (facing) must be either NORTH, SOUTH, WEST or EAST');
console.log('MOVE'.bold.underline);
console.log('- Will move the robot one unit in current direct');
console.log('LEFT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the left');
console.log('RIGHT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the right');
console.log('REPORT'.bold.underline);
console.log('- The robot will say the current position and facing direction');

console.log();
console.log('----------------------------------------------------------------------------------');
console.log();
console.log('You have a table size of 5x5 unit to play');
console.log('Please note that our robot is smart and will not do anything that can hurt him.');
console.log('He will ignore commands making him fall out of the table.');
console.log('Also note that he wont listen to any commands if you havn\'t placed him.');
console.log();

function handleLineInput(input) {
	var action = (0, _srcParser.handleCommand)(input);
	action.forEach(store.dispatch);
	readline.prompt();
}

readline.on('line', handleLineInput).on('close', function () {
	console.log('Thanks for playing');
	process.exit(0);
}).setPrompt('Robot> ');
readline.prompt();
