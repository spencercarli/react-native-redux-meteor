export const ddpActions = {
  DDP_CONNECTION_STATUS: 'DDP_CONNECTION_STATUS',
  DDP_ADD_TO_COLLECTION: 'DDP_ADD_TO_COLLECTION',
  DDP_CHANGE_TO_COLLECTION: 'DDP_CHANGE_TO_COLLECTION',
  DDP_REMOVE_FROM_COLLECTION: 'DDP_REMOVE_FROM_COLLECTION'
}

const initialState = {
  connected: false,
  collections: {}
};
export const ddpReducer = (state = initialState, action) => {
  let fields, collections, cleared;
  switch(action.type) {
    case ddpActions.DDP_CONNECTION_STATUS:
      return Object.assign({}, state, { connected: action.status });

    case ddpActions.DDP_ADD_TO_COLLECTION:
      fields = action.fields || {};
      fields._id = action.id;
      collections = Object.assign({}, state.collections);
      collections[action.collection] = Object.assign({}, collections[action.collection]);
      collections[action.collection][action.id] = fields;
      return Object.assign({}, state, { collections });

    case ddpActions.DDP_CHANGE_TO_COLLECTION:
      // let newState = _.cloneDeep(state);
      // fields = fields || {};
      // cleared = cleared || [];
      //
      // let newFields = Object.assign({}, newState.collections[collection][id], fields);
      // cleared.forEach((clearVal) => {
      //   delete newFields[clearVal]
      // });
      //
      // newState.collections = newState.collections || {};
      // newState.collections[collection] = newState.collections[collection] || {};
      // newState.collections[collection][id] = newFields;
      //
      // return newState;
      fields = action.fields || {};
      cleared = action.cleared || [];
      let newData = Object.assign({}, state.collections[collection][id], fields);
      cleared.forEach((clearVal) => {
        delete newData[clearVal];
      });

      // return Object.assign({}, state, newData);
      return state;

    default:
      return state;
  }
}

export const listener = (ddpConnection, store) => {
  ddpConnection.on('message', (msg) => {
    const data = JSON.parse(msg);
    const m = data.msg;

    if (m === 'connected') handleConnectedMessage(data, store);
    if (m === 'failed') handleFailedMessage(data, store);
    if (m === 'disconnected') handleDisconnectedMessage(data, store);
    // if (m === 'ready') handleReadyMessage();
    // if (m === 'nosub') handleNoSubMessage();
    if (m === 'added') handleAddedMessage(data, store);
    if (m === 'changed') handleChangedMessage(data, store);
    if (m === 'removed') handleRemovedMessage(data, store);
    // if (m === 'result') handleResultMessage();
    // if (m === 'updated') handleUpdatedMessage();
  });
}

// DDP Events

// Connection Events
const handleConnectedMessage = (data, store) => {
  // console.log('handleConnectedMessage', data);
  store.dispatch({
    type: ddpActions.DDP_CONNECTION_STATUS,
    status: true
  });
}

const handleFailedMessage = (data, store) => {
  // console.log('handleFailedMessage');
  store.dispatch({
    type: ddpActions.DDP_CONNECTION_STATUS,
    status: false
  });
}

const handleDisconnectedMessage = (data, store) => {
  // console.log('handleDisconnectedMessage');
  store.dispatch({
    type: ddpActions.DDP_CONNECTION_STATUS,
    status: false
  });
}

// Subscription Events
const handleReadyMessage = () => {
  console.log('handleReadyMessage');
}

const handleNoSubMessage = () => {
  console.log('handleNoSubMessage');
}

const handleAddedMessage = (data, store) => {
  store.dispatch({
    type: ddpActions.DDP_ADD_TO_COLLECTION,
    collection: data.collection,
    fields: data.fields,
    id: data.id
  });
}

const handleChangedMessage = (data, store) => {
  console.log('handleChangedMessage');
  store.dispatch({
    type: ddpActions.DDP_CHANGE_TO_COLLECTION,
    collection: data.collection,
    fields: data.fields,
    id: data.id,
    cleared: cleared
  });
}

const handleRemovedMessage = (data, store) => {
  console.log('handleRemovedMessage');
}

// Method Events
const handleResultMessage = () => {
  console.log('handleResultMessage');
}

const handleUpdatedMessage = () => {
  console.log('handleUpdatedMessage');
}
