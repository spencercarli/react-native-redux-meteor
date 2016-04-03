import React, { Component } from 'react-native';

import App from './containers/app';

import { Provider } from 'react-redux';
import createStore from './store';
const store = createStore();

export default class RNApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
