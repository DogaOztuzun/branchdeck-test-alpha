const { subtract, divide, multiply, power, absoluteValue, max, min, abs, clamp, median, round, floor, ceil, sign } = require('../src/math.js');

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

console.log(`Tests: ${passed} passed, ${failed} failed`);

// abs tests
assertEqual(abs(-5), 5, 'abs(-5) should be 5');
assertEqual(abs(5), 5, 'abs(5) should be 5');
assertEqual(abs(0), 0, 'abs(0) should be 0');
assertEqual(abs(-0), 0, 'abs(-0) should be 0');
assertEqual(Number.isNaN(abs(NaN)), true, 'abs(NaN) should be NaN');
assertEqual(abs(Infinity), Infinity, 'abs(Infinity) should be Infinity');
assertEqual(abs(-Infinity), Infinity, 'abs(-Infinity) should be Infinity');
assertThrows(() => abs('5'), 'abs(string) should throw');
assertThrows(() => abs(undefined), 'abs(undefined) should throw');


// ceil tests
assertEqual(ceil(3.2), 4, 'ceil(3.2) should be 4');
assertEqual(ceil(-3.2), -3, 'ceil(-3.2) should be -3');
assertEqual(ceil(3), 3, 'ceil(3) should be 3');
assertEqual(ceil(0), 0, 'ceil(0) should be 0');
assertEqual(ceil(-0), -0, 'ceil(-0) should be -0');
assertEqual(Number.isNaN(ceil(NaN)), true, 'ceil(NaN) should be NaN');
assertEqual(ceil(Infinity), Infinity, 'ceil(Infinity) should be Infinity');
assertEqual(ceil(-Infinity), -Infinity, 'ceil(-Infinity) should be -Infinity');
assertThrows(() => ceil('3.2'), 'ceil(string) should throw');
assertThrows(() => ceil(undefined), 'ceil(undefined) should throw');

if (failed > 0) {
  console.log(`\n${failed} test(s) failed`);
  process.exit(1);
} else {
  console.log(`\nAll ${passed} tests passed`);
}

// sign tests
assertEqual(sign(5), 1, 'sign(5) should be 1');
assertEqual(sign(-5), -1, 'sign(-5) should be -1');
assertEqual(sign(0), 0, 'sign(0) should be 0');
assertEqual(sign(-0), 0, 'sign(-0) should be 0');
assertEqual(sign(3.14), 1, 'sign(3.14) should be 1');
assertEqual(sign(-3.14), -1, 'sign(-3.14) should be -1');
assertEqual(Number.isNaN(sign(NaN)), true, 'sign(NaN) should be NaN');
assertThrows(() => sign('5'), 'sign(string) should throw');
assertThrows(() => sign(undefined), 'sign(undefined) should throw');
