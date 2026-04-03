const { subtract, divide, power, absoluteValue } = require('../src/math.js');

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

// power tests
assertEqual(power(2, 3), 8, 'power(2, 3) should return 8');
assertEqual(power(5, 0), 1, 'power(5, 0) should return 1');
assertEqual(power(0, 5), 0, 'power(0, 5) should return 0');
assertEqual(power(-2, 3), -8, 'power(-2, 3) should return -8');
assertEqual(power(2, -1), 0.5, 'power(2, -1) should return 0.5');
assertEqual(power(10, 2), 100, 'power(10, 2) should return 100');
assertThrows(() => power(0, 0), 'power(0, 0) should throw');
assertThrows(() => power(0, -1), 'power(0, -1) should throw');
assertThrows(() => power('a', 2), 'power(string, 2) should throw');
assertThrows(() => power(2, 'b'), 'power(2, string) should throw');
assertThrows(() => power(-4, 0.5), 'power(-4, 0.5) should throw');
assertThrows(() => power(2, 2000), 'power(2, 2000) should throw');

// absoluteValue tests
assertEqual(absoluteValue(5, 3), 2, 'absoluteValue(5, 3) should return 2');
assertEqual(absoluteValue(3, 5), 2, 'absoluteValue(3, 5) should return 2');
assertEqual(absoluteValue(-5, -3), 2, 'absoluteValue(-5, -3) should return 2');
assertEqual(absoluteValue(-3, 5), 8, 'absoluteValue(-3, 5) should return 8');
assertEqual(absoluteValue(0, 0), 0, 'absoluteValue(0, 0) should return 0');
assertEqual(absoluteValue(10, 10), 0, 'absoluteValue(10, 10) should return 0');
assertEqual(absoluteValue(100, 50), 50, 'absoluteValue(100, 50) should return 50');
assertThrows(() => absoluteValue('a', 2), 'absoluteValue(string, 2) should throw');
assertThrows(() => absoluteValue(2, 'b'), 'absoluteValue(2, string) should throw');

console.log(`Tests: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
