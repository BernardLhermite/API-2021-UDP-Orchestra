const protocol = require('./protocol');
const dgram = require('dgram');
const net = require('net');

// Mise en place de l'écoute UDP
const socket = dgram.createSocket('udp4');
socket.bind(protocol.port, () => {
  console.log("Joining multicast group");
  socket.addMembership(protocol.multicast);
});

let musicians = new Map();

// Action lorsqu'un datagramme UDP arrive
socket.on('message', (msg, source) => {
  const payload = JSON.parse(msg.toString());

  if (!musicians.has(payload.uuid)) {
    musicians.set(payload.uuid, {
      instrument: protocol.getInstrument(payload.sound),
      activeSince: new Date().toISOString()
    });
  }
  musicians.get(payload.uuid).lastActive = Date.now();
});

// Récupération des musiciens actifs et mise à jour du dictionnaire
function getTcpPayload() {
  let payload = [];
  for (const [uuid, musician] of musicians) {
    if (Date.now() - musician.lastActive > 5000) {
      musicians.delete(uuid);
      continue;
    }

    payload.push({
      'uuid': uuid,
      'instrument': musician.instrument,
      'activeSince': musician.activeSince
    });
  }

  return payload;
}

// Gestion de la connexion TCP
const PORT = 2205;
const server = net.createServer();
server.listen(PORT, () => {
    console.log('TCP Server is running on port ' + PORT +'.');
}).on('connection', (conn) => {
    conn.on('error', (error) => {
        console.log('An error occured with connection from ' + conn.remoteAddress + ': ' + error.message);
    });
    console.log('CONNECTED: ' + conn.remoteAddress + ':' + conn.remotePort);

    conn.write(JSON.stringify(getTcpPayload()));

    conn.end();
});