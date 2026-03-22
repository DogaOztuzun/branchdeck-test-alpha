function greet(name) {
  return `Hello, ${name}!`;
}

// Wrong export name - CI will fail
module.exports = { sayHello: greet };
