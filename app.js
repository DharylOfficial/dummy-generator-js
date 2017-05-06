'use strict';

var dummyGenerator = require('./dummy-generator/dummyGenerator');

module.exports = dummyGenerator;
var temp = dummyGenerator(null, 5)

console.log(temp);