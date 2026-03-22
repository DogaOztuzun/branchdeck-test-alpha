const { formatName } = require('./utils');

function greet(name) {
  return `Hello, ${formatName(name)}!`;
}

module.exports = { greet };
