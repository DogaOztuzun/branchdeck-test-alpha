function greet(name) {
  return `Hello, ${name}!`;
}

// Typo: exporting wrong name
module.exports = { greetUser: greet };
