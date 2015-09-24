/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var promiseMiddleWare = function promiseMiddleWare(store) {
  return function (next) {
    return function (action) {
      if (typeof action.then !== 'function') {
        return next(action);
      }
      return Promise.resolve(action).then(store.dispatch);
    };
  };
};

exports.promiseMiddleWare = promiseMiddleWare;
var arrayMiddleWare = function arrayMiddleWare(store) {
  return function (next) {
    return function (action) {
      console.log(action);
      if (typeof action !== 'array') {
        return next(action);
      }
      return action.map(store.dispatch);
    };
  };
};

exports.arrayMiddleWare = arrayMiddleWare;
var logger = function logger(store) {
  return function (next) {
    return function (action) {
      if (store.getState().get('speak')) {
        console.log(action);
      }
      return next(action);
    };
  };
};
exports.logger = logger;