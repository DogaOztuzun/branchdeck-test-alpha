- source_plan: `_bmad-output/initiative-repo-alpha-foundation/plan-gh-69-add-summarize.md`
  summary: `summarize` can return an infinite mean or median for finite input whose arithmetic overflows.
  evidence: `summarize([1e308, 1e308])` returns `{ count: 2, min: 1e308, max: 1e308, mean: Infinity, median: Infinity }` — the elements pass the finite check, but the sum and the median's `(a + b) / 2` overflow. The existing `median` already behaves this way, issue #69 does not specify a result contract for overflow, and every fix would either change existing behavior or contradict the issue.
