const { multiply } = require('../src/math');

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
}

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}`);
    console.error(`  ${e.message}`);
    process.exitCode = 1;
  }
}

test('multiply returns product of two positive numbers', () => {
  assertEqual(multiply(3, 4), 12, 'multiply(3, 4) should equal 12');
});

test('multiply with zero', () => {
  assertEqual(multiply(5, 0), 0, 'multiply(5, 0) should equal 0');
});

test('multiply with negative numbers', () => {
  assertEqual(multiply(-2, 3), -6, 'multiply(-2, 3) should equal -6');
});

test('multiply with two negative numbers', () => {
  assertEqual(multiply(-2, -3), 6, 'multiply(-2, -3) should equal 6');
});

test('multiply with decimal numbers', () => {
  assertEqual(multiply(0.5, 0.4), 0.2, 'multiply(0.5, 0.4) should equal 0.2');
});

test('multiply with one', () => {
  assertEqual(multiply(7, 1), 7, 'multiply(7, 1) should equal 7');
});
