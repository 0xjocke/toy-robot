'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = reducer;

var _core = require('./core');

/**
 * Takes currentState,action and returns newState
 * currentState, action => newState
 *
 * @param  {Immutable.Map} state
 * @param  {Object} action
 * @return {Immutable.Map}
 */

function reducer(state, action) {
	if (state === undefined) state = _core.INITIAL_STATE;

	switch (action.type) {
		case 'PLACE':
			return (0, _core.place)(state, action.position);
		case 'ROTATE':
			return (0, _core.rotate)(state, action.direction);
		case 'MOVE':
			return (0, _core.move)(state);
		case 'REPORT':
			return (0, _core.report)(state);
	}
	return state;
}

module.exports = exports['default'];