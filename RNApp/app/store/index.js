import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import reducers from '../reducers'
import config from '../config';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => config.env === 'dev'
});

const middleWare = [];
middleWare.push(loggerMiddleware); // logger always has to be last

export default function makeStore() {
  return createStore(reducers, applyMiddleware(...middleWare));
}
