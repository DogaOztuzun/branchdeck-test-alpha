# Implementation Plan: Issue #17

## Problem
Add divide(a, b) function to src/math.js on top of existing subtract function. Previous PR #13 conflicted because it was based on old main.

## Approach
- Append divide function to existing src/math.js (preserve subtract)
- Update module.exports to include both subtract and divide
- Add tests to tests/math.test.js (preserve existing subtract tests, add divide tests)

## Files to Modify
- `src/math.js` — add divide function, update exports
- `tests/math.test.js` — add divide test cases

## Test Strategy
- Unit tests: divide(10,2)=5, divide(-10,2)=-5, divide(0,5)=0
- Edge cases: divide by zero throws Error, 0/0 throws Error

## Edge Cases
- Division by zero (b === 0)
- Negative numbers
- Zero dividend
