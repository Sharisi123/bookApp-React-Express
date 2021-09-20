module.exports = socketJwt;

function socketJwt(socket: any, next: any) {
  const header = socket.handshake.headers["authorization"];
  if (jwt(header)) {
    return next();
  }
  return next(new Error("authentication error"));
}

export {};
