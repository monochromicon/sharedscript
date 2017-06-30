const DeepstreamServer = require('deepstream.io');

const server = new DeepstreamServer({
	host: '0.0.0.0',
	port: 6020
});

server.start();
