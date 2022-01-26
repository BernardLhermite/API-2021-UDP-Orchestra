const protocol = require('./protocol');
const dgram = require('dgram');

const socket = dgram.createSocket('udp4');
socket.bind(protocol.port, () => {
  console.log("Joining multicast group");
  socket.addMembership(protocol.multicast);
});

socket.on('message', (msg, source) => {
	console.log("Data has arrived: " + msg + ". Source port: " + source.port);
});