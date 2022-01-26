const protocol = require('./protocol');
const dgram = require('dgram');
const net = require('net');

const socket = dgram.createSocket('udp4');
socket.bind(protocol.port, () => {
  console.log("Joining multicast group");
  socket.addMembership(protocol.multicast);
});

let musicians = {};

socket.on('message', (msg, source) => {
  const payload = JSON.parse(msg.toString());

  if (!(payload.uuid in musicians)) {
    musicians[payload.uuid] = {
      instrument: protocol.getInstrument(payload.sound),
      activeSince: new Date().toISOString()
    }
  }
  musicians[payload.uuid]['lastActive'] = Date.now();
});

function getTcpPayload() {
  let payload = [];
  for (const [uuid, musician] of Object.entries(musicians)) {
    if (Date.now() - musician.lastActive > 5000) {
      delete musicians[uuid];
      continue;
    }

    payload.push({
      'uuid': uuid,
      'instrument': musician.instrument,
      'activeSince': musician.activeSince
    })
  }

  return payload;
}

const PORT = 2205;
const server = net.createServer();
server.listen(PORT, () => {
    console.log('TCP Server is running on port ' + PORT +'.');
}).on('connection', (conn) => {
    console.log('CONNECTED: ' + conn.remoteAddress + ':' + conn.remotePort);

    conn.write(JSON.stringify(getTcpPayload()));
    conn.end();
});