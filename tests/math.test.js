const { subtract, divide, multiply, power, absoluteValue, max, min, modulo } = require('../src/math.js');

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

// multiply tests
assertEqual(multiply(3, 4), 12, 'multiply(3, 4) should return 12');
assertEqual(multiply(-2, 5), -10, 'multiply(-2, 5) should return -10');
assertEqual(multiply(0, 100), 0, 'multiply(0, 100) should return 0');
assertEqual(multiply(7, 8), 56, 'multiply(7, 8) should return 56');
assertEqual(multiply(-3, -4), 12, 'multiply(-3, -4) should return 12');

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

// max tests
assertEqual(max(5, 3), 5, 'max(5, 3) should return 5');
assertEqual(max(3, 5), 5, 'max(3, 5) should return 5');
assertEqual(max(-5, -3), -3, 'max(-5, -3) should return -3');
assertEqual(max(-3, 5), 5, 'max(-3, 5) should return 5');
assertEqual(max(5, 5), 5, 'max(5, 5) should return 5');
assertEqual(max(0, 0), 0, 'max(0, 0) should return 0');
assertEqual(max(10, -100), 10, 'max(10, -100) should return 10');
assertEqual(max(-100, 10), 10, 'max(-100, 10) should return 10');
assertEqual(max(0, 5), 5, 'max(0, 5) should return 5');
assertEqual(max(5, 0), 5, 'max(5, 0) should return 5');
assertEqual(max(3.14, 2.71), 3.14, 'max(3.14, 2.71) should return 3.14');
assertEqual(max(-0.5, -0.1), -0.1, 'max(-0.5, -0.1) should return -0.1');
assertThrows(() => max('a', 2), 'max(string, 2) should throw');
assertThrows(() => max(2, 'b'), 'max(2, string) should throw');
assertThrows(() => max('a', 'b'), 'max(string, string) should throw');

// min tests
assertEqual(min(5, 3), 3, 'min(5, 3) should return 3');
assertEqual(min(3, 5), 3, 'min(3, 5) should return 3');
assertEqual(min(-5, -3), -5, 'min(-5, -3) should return -5');
assertEqual(min(-3, 5), -3, 'min(-3, 5) should return -3');
assertEqual(min(5, 5), 5, 'min(5, 5) should return 5');
assertEqual(min(0, 0), 0, 'min(0, 0) should return 0');
assertEqual(min(10, -100), -100, 'min(10, -100) should return -100');
assertEqual(min(-100, 10), -100, 'min(-100, 10) should return -100');
assertEqual(min(0, 5), 0, 'min(0, 5) should return 0');
assertEqual(min(5, 0), 0, 'min(5, 0) should return 0');
assertEqual(min(3.14, 2.71), 2.71, 'min(3.14, 2.71) should return 2.71');
assertEqual(min(-0.5, -0.1), -0.5, 'min(-0.5, -0.1) should return -0.5');
assertThrows(() => min('a', 2), 'min(string, 2) should throw');
assertThrows(() => min(2, 'b'), 'min(2, string) should throw');
assertThrows(() => min('a', 'b'), 'min(string, string) should throw');

// modulo tests
assertEqual(modulo(10, 3), 1, 'modulo(10, 3) should return 1');
assertEqual(modulo(10, 2), 0, 'modulo(10, 2) should return 0');
assertEqual(modulo(-10, 3), -1, 'modulo(-10, 3) should return -1');
assertEqual(modulo(0, 5), 0, 'modulo(0, 5) should return 0');
assertEqual(modulo(7, 7), 0, 'modulo(7, 7) should return 0');
assertEqual(modulo(1, 2), 1, 'modulo(1, 2) should return 1');
assertThrows(() => modulo(10, 0), 'modulo(10, 0) should throw');
assertThrows(() => modulo(0, 0), 'modulo(0, 0) should throw');

console.log(`Tests: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
