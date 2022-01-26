const protocol = require('./protocol');
const { program } = require('commander');
const { v4: uuidv4 } = require('uuid');
const dgram = require('dgram');

program
  .addArgument(new program.Argument('<instrument>', 'the instrument used by this musician')
  .choices(protocol.instruments))
  .parse();

const instrument = program.args[0];

const socket = dgram.createSocket('udp4');

const musician = {
  uuid: uuidv4(),
  sound: protocol.getSound(instrument),
}
const payload = JSON.stringify(musician);
const message = new Buffer.from(payload);

setInterval(() => {
  socket.send(message, 0, message.length, protocol.port, protocol.multicast,
    (err, bytes) => {
      console.log("Sending payload: " + payload + " via port " + socket.address().port);
  })
}, 1000);