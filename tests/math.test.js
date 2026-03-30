const { subtract } = require('../src/math');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${e.message}`);
    failed++;
  }
}

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}`);
  }
}

test('subtract(5, 3) returns 2', () => {
  assertEqual(subtract(5, 3), 2);
});

test('subtract(10, 10) returns 0', () => {
  assertEqual(subtract(10, 10), 0);
});

test('subtract(0, 5) returns -5', () => {
  assertEqual(subtract(0, 5), -5);
});

test('subtract(-5, -3) returns -2', () => {
  assertEqual(subtract(-5, -3), -2);
});

test('subtract(100, 50) returns 50', () => {
  assertEqual(subtract(100, 50), 50);
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
