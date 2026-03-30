const { divide } = require('../src/math.js');

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(e.message);
    process.exitCode = 1;
  }
}

function assertEquals(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

function assertThrows(fn) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
  }
  if (!threw) {
    throw new Error('Expected function to throw');
  }
}

test('divide returns correct result for positive numbers', () => {
  assertEquals(divide(10, 2), 5);
});

test('divide returns correct result for negative numbers', () => {
  assertEquals(divide(-10, 2), -5);
});

test('divide returns correct result for zero dividend', () => {
  assertEquals(divide(0, 5), 0);
});

test('divide throws error when dividing by zero', () => {
  assertThrows(() => divide(10, 0));
});

test('divide throws error when dividing 0 by 0', () => {
  assertThrows(() => divide(0, 0));
});
