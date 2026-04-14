const { greet } = require('../src/main.js');

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, message) {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    console.log(`FAIL: ${message}`);
    console.log(`  Expected: ${expected}`);
    console.log(`  Actual: ${actual}`);
  }
}

// greet tests
assertEqual(greet('Alice'), 'Hi, Alice!', 'greet("Alice") should return "Hi, Alice!"');
assertEqual(greet('Bob'), 'Hi, Bob!', 'greet("Bob") should return "Hi, Bob!"');
assertEqual(greet(''), 'Hi, !', 'greet("") should return "Hi, !"');

console.log(`Tests: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log(`\n${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log(`\nAll ${passed} tests passed`);
}
