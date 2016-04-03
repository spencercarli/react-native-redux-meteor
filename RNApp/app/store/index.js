import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import immutableCheckMiddleWare from 'redux-immutable-state-invariant';

import reducers from '../reducers'
import config from '../config';

// import { listener } from 'redux-meteor-ddp';
import { listener } from '../../redux-meteor-ddp';
import ddpClient from '../ddp';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => config.env === 'dev'
});

const middleWare = [];

if (config.env === 'dev') {
  middleWare.push(immutableCheckMiddleWare());
}

middleWare.push(loggerMiddleware); // logger always has to be last

export default function makeStore() {
  const store = createStore(reducers, applyMiddleware(...middleWare));
  listener(ddpClient, store);
  return store;
}
