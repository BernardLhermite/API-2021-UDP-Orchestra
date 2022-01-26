const PORT = 3000
const MULTICAST_ADDRESS = "239.255.22.5"
const INSTRUMENTS = {
    'piano': 'ti-ta-ti',
    'trumpet': 'pouet',
    'flute': 'trulu',
    'violin': 'gzi-gzi',
    'drum': 'boum-boum'
}
module.exports = Object.freeze({
    port: PORT,
    multicast: MULTICAST_ADDRESS,
    getSound: (instrument) => INSTRUMENTS[instrument],
    instruments: Object.keys(INSTRUMENTS)
});