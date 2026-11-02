<!-- bmad:context -->
<!-- Verified 2026-11-02 against b0fd77a. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## repo-alpha

Test repository for the Branchdeck PR Shepherd deployment: an issue becomes a ticket, an agent
implements it on a worktree of this repository, and the owner merges the resulting pull request.
Node with no build step; `npm test` runs the whole suite. Planning artifacts live in
`_bmad-output/`, BMAD skills in `.agents/skills/`, BMAD scripts and config in `_bmad/`.

## Policy

- Open a pull request for every change and never merge — the owner merges.
- Commit the BMAD plan and its evidence with the pull request, under `_bmad-output/`; a plan that
  exists only on the agent's machine is not reviewable.
- Do not implement before the owner approves the plan; an author approving its own plan is not
  approval.
- Never edit `node_modules/` — it is committed to this repository.
- Route by what a request needs before touching code: an unsettled idea → `bmad-forge-idea` or
  `bmad-brainstorming`; a decision that needs evidence → `bmad-deep-recon`; a written account of
  the product → `bmad-product-brief`, `bmad-prfaq` or `bmad-prd`; decisions several pieces must
  share → `bmad-architecture`, and `bmad-ux` when the experience changes; settled acceptance
  criteria → `bmad-build`.
- Mechanical edits — a typo, formatting, a single obvious fix — skip the ceremony and go straight
  to a pull request.
- Read each skill's own `SKILL.md` first: only `bmad-build`, `bmad-build-auto`, `bmad-agent-po`,
  `bmad-code-review`, `bmad-qa-generate-e2e-tests`, `bmad-retrospective` and `bmad-walkthrough` are
  entered through `render_skill.py`; the planning skills carry their own activation flow.

## Where things are

- Math functions: `src/math.js`. Greeting: `src/main.js`.
- Suite: `tests/math.test.js`, run by `npm test`.
- CI: `.github/workflows/ci.yml` — `lint` checks `greet` is exported, `test` checks its output;
  neither runs the suite, which runs in the `math-test` job.
- Repository map and decisions of record: `_bmad-output/architecture.md` and
  `_bmad-output/research/`.
- BMAD skills: `.agents/skills/`, pinned by `skills-lock.json`; BMAD scripts and config: `_bmad/`.

## Running and verifying

- `npm test` needs no install step — a clean checkout runs on Node alone.
- BMAD skills render through `uv run --no-cache ./_bmad/scripts/render_skill.py --project-root .
  --skill ./.agents/skills/<skill>`; `uv` must be on PATH.
- The suite prints its own summary and decides the exit code itself; keep that block last in the
  file.

## Conventions that differ from defaults

- Adding a math function means extending the final `module.exports` in `src/math.js`; the file
  re-declares it after each function and only the last declaration is in effect.
- The suite is hand-written; `jest` is listed as a devDependency but unused — do not introduce it.

## Known pitfalls

- The suite once printed its summary and set the exit code before the last assertions, so those
  assertions never counted and could not fail the run — finalization belongs at the end of the file.
- A BMAD workflow that needs an initiative fails with `no active initiative` until
  `_bmad/custom/config.user.toml` names one.
- The CI job named `test` checks `greet` only, so a green `test` job says nothing about the suite.

<!-- /bmad:context -->
