---
title: 'Add summarize(numbers) to the math utilities'
type: 'feature'
ticket: ''
created: '2026-11-02'
status: 'built'
baseline_revision: '4d3bbdb2cd3cfb7afea8a62824028b851c213da9'
route: 'oneshot'
route_source: 'auto'
risk: 'low'
review: 'quick'
review_source: 'pinned'
lenses_ran:
  - 'quick'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The math utilities answer one number at a time; nothing in `src/math.js` describes a
list of numbers in one call. Issue #69 asks for `summarize(numbers)` returning
`{ count, min, max, mean, median }`, covered by tests in the existing suite and a short README
usage example.

**Approach:** Add an exported `summarize` function that validates its input (rejecting empty
arrays, non-arrays, non-number elements, `NaN` and infinities), computes the five statistics
from a sorted copy so the caller's array and its order stay untouched, and reuses the existing
`median` helper for the middle value. Cover it with hand-written assertions in the existing
suite and show one call in the README.

</frozen-after-approval>

## Code Map

- `src/math.js` — the utilities. `median(arr)` already validates "array, not empty, numeric
  elements" and sorts a copy (`[...arr]`); reuse it, but note it lets `NaN` and infinities
  through, so `summarize` rejects those itself. `sign` is the last function in the file and the
  newest one to carry a JSDoc block — follow it. The last `module.exports` line is the one in
  effect (AD-3), so `summarize` goes there. Do not touch the earlier functions, including the
  duplicated `round`/`floor`/`ceil` definitions — they are pre-existing, and unrelated
  refactoring is out of scope.
- `tests/math.test.js` — hand-written suite. Helpers: `assertEqual(actual, expected, message)`
  (strict `===`) and `assertThrows(fn, message)`. The summary print and the `process.exitCode`
  block sit at the very end and must stay last (AD-1). No object-comparison helper exists yet,
  so the new one is added beside the other two, in the same hand-written style.
- `README.md` — a title and one sentence today; the usage example goes below them.
- `.github/workflows/ci.yml` — the `math-test` job runs `npm test`; no change needed.
- `AGENTS.md` — repository rules: no new dependencies, extend the final `module.exports`, keep
  the suite's finalization last.

## Tasks & Acceptance

**Execution:**
- `src/math.js` — add `summarize(numbers)` with a JSDoc block, the input rejections, and the
  five statistics; add `summarize` to the final `module.exports` — the new function is the only
  public surface added and every earlier export keeps working.
- `tests/math.test.js` — add one `summarize` block above the summary/exit block, plus a small
  deep-equality helper for the returned object — the new assertions must run and count before
  the suite finalizes, so a failing one fails `npm test`.
- `README.md` — add a short usage example showing the `require` and one `summarize` call with
  its result — the issue asks for a README usage example.

**Acceptance Criteria:**
- Given unsorted input, when `summarize` is called, then the result reports the true statistics
  (`summarize([3, 1, 2])` → `{ count: 3, min: 1, max: 3, mean: 2, median: 2 }`).
- Given duplicates, decimals or negative numbers, when `summarize` is called, then `count`,
  `min`, `max`, `mean` and `median` describe that input exactly.
- Given an array argument, when `summarize` returns, then the caller's array still holds the
  same elements in the same order.
- Given an empty array, a non-array, a non-number element, `NaN` or an infinity, when
  `summarize` is called, then it throws an `Error` and returns nothing.
- Given the module is loaded, when its exports are listed, then every export that existed before
  still exists and `summarize` is among them.
- Given the suite runs, when a `summarize` assertion fails, then `npm test` exits non-zero.
- Given the README, when a reader follows the example, then it shows a `summarize` call and its
  result.

## Implementation Notes

Oneshot route: the change is additive and small — one function, one test block, one README
section — and issue #69 fixes the interface and the rejection rules, so no design choice is left
open. The owner's comment on issue #69 asks for plan and implementation in one request, which is
the named exception to the "owner approves the plan first" rule (D3): the plan travels with the
pull request for that review (AD-4).

Decisions and surprises:

- `summarize` validates first (array, not empty, numeric elements, finite elements) and then
  reuses the existing `median` helper on the sorted copy. `median` on its own lets `NaN` and
  infinities through, so the finite check belongs in `summarize`.
- The sorted copy (`[...numbers].sort(...)`) is what keeps the caller's array and its order
  untouched; the returned object holds plain numbers.
- The suite had no object comparison, so `deepEqual` and `assertDeepEqual` were added beside
  `assertEqual` and `assertThrows` in the same hand-written style — no framework.
- The new test block sits above the summary/exit block, so the suite still finalizes last
  (AD-1).
- `summarize` was appended to the last `module.exports` line only (AD-3); the earlier,
  overwritten declarations were left alone, as were the duplicated `round`/`floor`/`ceil`
  definitions.

Verification run:

- `npm test` — 121 passed, 0 failed (the suite had 95 before this change).
- The three results quoted in issue #69 reproduced exactly.
- Every earlier export is still exported, `summarize` among them.
- The input array keeps its elements and its order after the call.
- A deliberately failing `summarize` assertion made `npm test` exit 1, then was reverted; the
  suite is green again.
- A deliberately wrong expected error message made `npm test` exit 1 as well, then was reverted;
  the rejection assertions are not vacuous.
- The three CI job steps (`lint`, `test`, `math-test`) pass locally.

Files changed:

- `src/math.js` — `summarize` added after `sign`, and `summarize` appended to the last
  `module.exports`.
- `tests/math.test.js` — the module is now bound as `math` next to the destructured names; the
  new `deepEqual`, `assertDeepEqual` and `assertThrowsError` helpers sit beside `assertEqual` and
  `assertThrows`; the `summarize` block sits above the summary/exit block.
- `README.md` — the usage example and the two sentences describing the contract.
- `_bmad-output/initiative-repo-alpha-foundation/plan-gh-69-add-summarize.md` — this plan.

Review: the quick lens was launched as a context-free reviewer; the thorough lenses (adversarial
critique, edge cases, verification gaps, structure, prose) were skipped, since the review
selection is pinned to `quick`. Its eight findings are triaged below.

## Plan Change Log

- After the quick review: the evidence in this file was completed (decisions, files changed, the
  commands that were run and what they printed), the frontmatter was finalized
  (`status: 'built'`, `lenses_ran: ['quick']`, `context: []`), the recorded assertion count was
  corrected to the number the suite actually prints, the rejection assertions were strengthened
  to check the error type and message, the export assertion was relaxed to what the acceptance
  criterion asks and now uses the module binding the suite already has, and the README states the
  overflow limitation. Nothing else about the implementation changed.

## Review Triage Log

Quick lens, one pass, eight findings.

1. `medium` — the plan shipped without the evidence the repository rules require. Patch: the
   decisions, the files changed and the output of every verification command are now recorded
   above. (The finding was stated against the diff snapshot, which predates that evidence.)
2. `medium` — the plan's review fields were not final. Patch: `status: 'built'`,
   `lenses_ran: ['quick']`, `review: 'quick'`, `review_source: 'pinned'`, and this triage log.
3. `medium` — the recorded count (120) contradicted the suite (121). Patch: the evidence now says
   121, the number a green run prints.
4. `medium` — `assertThrows` counts any thrown value as a pass, so the rejection assertions did
   not show that the intended validation rejected the input. Patch: a new `assertThrowsError`
   helper checks that an `Error` is thrown and that its message is the expected one, and every
   rejection case now uses it. A deliberately wrong expected message was confirmed to fail the
   run.
5. `low` — finite input can still yield an infinite mean or median when the arithmetic overflows
   (`summarize([1e308, 1e308])`). Deferred: the acceptance criteria do not cover overflow, the
   same overflow already exists in `median`, and every fix would either change existing behavior
   or contradict the issue. The README now states the limitation, and the item is recorded in
   `deferred-work.md`.
6. `low` — the export assertion was stricter than the acceptance criterion and brittle.
   Patch: it now checks that every earlier export is still a function and that `summarize` is
   exported, without pinning the full export list, and it reuses the module binding instead of
   requiring the module again.
7. `low` — the `context:` entry did not follow the template's documented path form. Patch:
   `context` is empty; the rules it named are already in the Code Map.
8. `low` — every call sorts the array twice, and the mean is summed in the caller's order while
   the other statistics come from the sorted copy. Rejected: the values are identical either way,
   the second sort is the price of reusing the tested `median` helper rather than duplicating its
   logic, and the alternative — summing in sorted order — would change the floating-point result
   of the mean.

## Verification

**Commands:**
- `npm test` — expected: the suite prints `Tests: N passed, 0 failed` with the `summarize`
  assertions counted, and exits 0.
- `node -e "const m = require('./src/math.js'); console.log(m.summarize([3,1,2]), m.summarize([4,1,3,2]), m.summarize([7]))"`
  — expected: the three results quoted in issue #69.
- `node -e "const m = require('./src/math.js'); const want = ['subtract','divide','multiply','power','absoluteValue','max','min','abs','clamp','median','round','floor','ceil','sign','summarize']; const got = Object.keys(m); if (got.length !== want.length || want.some(k => !got.includes(k))) { console.error(got); process.exit(1); }"`
  — expected: no output, exit 0 (every earlier export preserved).
- `node -e "const m = require('./src/math.js'); const a = [3,1,2]; m.summarize(a); if (a.join(',') !== '3,1,2') process.exit(1)"` —
  expected: exit 0 (the input array is not reordered).
