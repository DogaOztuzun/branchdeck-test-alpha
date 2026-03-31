const { subtract, divide } = require('../src/math.js');

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

function assertThrows(fn, message) {
  try {
    fn();
    failed++;
    console.log(`FAIL: ${message} (expected throw, but did not)`);
  } catch (e) {
    passed++;
  }
}

// subtract tests
assertEqual(subtract(5, 3), 2, 'subtract(5, 3) should return 2');
assertEqual(subtract(10, 4), 6, 'subtract(10, 4) should return 6');
assertEqual(subtract(0, 0), 0, 'subtract(0, 0) should return 0');
assertEqual(subtract(-5, -3), -2, 'subtract(-5, -3) should return -2');
assertEqual(subtract(3, 5), -2, 'subtract(3, 5) should return -2');

// divide tests
assertEqual(divide(10, 2), 5, 'divide(10, 2) should return 5');
assertEqual(divide(-10, 2), -5, 'divide(-10, 2) should return -5');
assertEqual(divide(0, 5), 0, 'divide(0, 5) should return 0');
assertEqual(divide(7, 2), 3.5, 'divide(7, 2) should return 3.5');
assertThrows(() => divide(10, 0), 'divide(10, 0) should throw');
assertThrows(() => divide(0, 0), 'divide(0, 0) should throw');

console.log(`Tests: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
