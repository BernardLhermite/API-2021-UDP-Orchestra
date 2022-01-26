module.exports = Object.freeze({
    PORT = 3000,
    MULTICAST_ADDRESS = "239.255.22.5",
    INSTRUMENTS = {
        'piano': 'ti-ta-ti',
        'trumpet': 'pouet',
        'flute': 'trulu',
        'violin': 'gzi-gzi',
        'drum': 'boum-boum'
    },
    getSound : (instrument) => INSTRUMENTS[instrument]
});