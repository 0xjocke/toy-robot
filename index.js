import makeStore from './src/store';
import {handleCommand} from './src/parser';
import 'colors';
const readline = require('readline')
.createInterface({
	input: process.stdin,
	output: process.stdout
});
const store = makeStore();



console.log('Welcome to toy robot.'.green.bold);
console.log('');
console.log('These are valid command:'.bold);
console.log('PLACE x,y,f'.bold.underline);
console.log('- Where x and y is coordinates and f (facing) must be either NORTH, SOUTH, WEST or EAST');
console.log('MOVE'.bold.underline);
console.log('- Will move the robot one unit in current direct');
console.log('LEFT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the left');
console.log('RIGHT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the right');
console.log('REPORT'.bold.underline);
console.log('- The robot will say the current position and facing direction');
console.log('READ textfiles/example.txt'.bold.underline);
console.log('- You can use any textfile on your computer. The robot will execute all valid commands.');

console.log();
console.log('----------------------------------------------------------------------------------');
console.log();
console.log('You have a table size of 5x5 units to play with.');
console.log('Please note that our robot is smart and will not do anything that can hurt him.');
console.log('He will ignore commands making him fall out of the table.');
console.log('Also note that he wont listen to any commands if you haven\'t placed him.');
console.log('If you try to kill him or using invalid commands he will try to tell you what went wrong.');
console.log();

function handleLineInput(input){
	const action = handleCommand(input);
	action.forEach(store.dispatch);
	readline.prompt();
}

readline
.on('line', handleLineInput)
.on('close', ()=> {
	console.log('Thanks for playing');
	process.exit(0);
})
.setPrompt('Robot> ');
readline.prompt();