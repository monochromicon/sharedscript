const deepstream = require('deepstream.io-client-js');
const {name, version} = require('../package.json');

console.log(name, version);
const client = deepstream('localhost:6020').login();
