export const test = () => {
  console.log("TESTING DDP PACKAGE SETUP")
}

export const listener = (ddpConnection, store) => {
  // console.log(ddpConnection, store);
  ddpConnection.on('message', (msg) => {
    console.log(msg);
  });
}
