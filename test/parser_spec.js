import {expect} from 'chai';
import {handleCommand} from '../src/parser';

describe('Parser', () => {

	it('it can handle LEFT COMMAND', () => {
		 expect(handleCommand('LEFT')).to.deep.equal({type: 'ROTATE', direction: 'LEFT'});
	});
	it('it can handle RIGHT COMMAND', () => {
		expect(handleCommand('RIGHT')).to.deep.equal({type: 'ROTATE', direction: 'RIGHT'});
	});
	it('it can handle REPORT COMMAND', () => {
		expect(handleCommand('REPORT')).to.deep.equal({type: 'REPORT'});
	});
	it('it can handle MOVE COMMAND', () => {
		 expect(handleCommand('MOVE')).to.deep.equal({type:'MOVE'});
	});

	it('it can handle PLACE COMMAND', () => {
		expect(handleCommand('PLACE 1,3,NORTH')).to.deep.equal({
			type:'PLACE',
			position:{
				x:1, y:3, f:'NORTH'
			}
		});
	});
	it('handles lower case commands', () => {
		expect(handleCommand('move')).to.deep.equal({type:'MOVE'});
	});
	it('trims trailing spaces', () => {
		expect(handleCommand(' right ')).to.deep.equal({type: 'ROTATE', direction: 'RIGHT'});
	});
	it('ignores other words', () => {
		expect(handleCommand('hello')).to.not.be.ok;
	});
	it('ignores PLACE command with only two arguments', () => {
		expect(handleCommand('PLACE 1,3')).to.not.be.ok;
	});


});