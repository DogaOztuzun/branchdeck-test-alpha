const { subtract } = require('../src/math.js');

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

assertEqual(subtract(5, 3), 2, 'subtract(5, 3) should return 2');
assertEqual(subtract(10, 4), 6, 'subtract(10, 4) should return 6');
assertEqual(subtract(0, 0), 0, 'subtract(0, 0) should return 0');
assertEqual(subtract(-5, -3), -2, 'subtract(-5, -3) should return -2');
assertEqual(subtract(3, 5), -2, 'subtract(3, 5) should return -2');

console.log(`Tests: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
