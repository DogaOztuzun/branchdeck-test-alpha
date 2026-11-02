# Decision records — 2026-11-02

Evidence-backed decisions on how development runs in this repository. Each record states the
question, the evidence it rests on, the conclusion, and what would reopen it. Sources are pull
requests and deployment tickets in `DogaOztuzun/branchdeck-test-alpha`, readable by anyone with
access to the repository.

## D1 — The repository is the source of truth for agent skills

**Question.** Where do BMAD skills live so that agent sessions actually load them?

**Evidence.** Worker sessions are given a worktree built from a ref fetched from GitHub, so files
that exist only in a local checkout never reach them. The `bmad-build` run on issue #64 loaded
the skill from `<worktree>/.agents/skills/bmad-build` — the repository copy added by pull request
#66 — not from the machine-wide copy.

**Conclusion.** `.agents/skills/` in this repository is the source of truth; `skills-lock.json`
pins each skill so an update is a reviewable diff. The machine-wide copy is a convenience until
the repository copy is merged.

**Reopens when.** A second repository needs the same skills and the duplication stops paying for
itself.

## D2 — Planning artifacts travel with the change

**Question.** Should a plan stay on the agent's machine?

**Evidence.** In the `bmad-build` run on issue #64 the plan file and the deferred-work file were
written in the worktree and left uncommitted: pull request #67 touched only
`.github/workflows/ci.yml` and `tests/math.test.js`. The reasoning behind the change was
therefore invisible to the owner reviewing the diff.

**Conclusion.** The plan and its evidence are committed with the change, under `_bmad-output/`.
Recorded as AD-4 in the architecture spine and as policy in `AGENTS.md`.

**Reopens when.** A repository's noise budget makes the artifacts unreadable; then the rule moves
to a separate artifact store with links instead of files.

## D3 — The owner approves the plan; the author does not

**Question.** Who signs off on a plan before implementation?

**Evidence.** The instruction "validate the proposed plan and approve for implementation" let the
same session write the plan and approve it. That is the one move this deployment's own discipline
forbids — a candidate cannot redefine its own passing standard — and it removes the only moment
where a wrong direction is cheap to catch.

**Conclusion.** Implementation starts only after the owner approves the plan. The agent stops at
the plan and presents it.

**Reopens when.** A class of work arrives where the owner explicitly wants unattended execution;
that class is then named in the request, not assumed.

## D4 — CI must execute the suite

**Question.** What is the minimum a green pull request may claim?

**Evidence.** Issue #64: the suite reported success while nine assertions had never run, and CI
checked only `greet`, so nothing else would have caught it.

**Conclusion.** Every pull request's CI runs the whole suite (`npm test`), next to the existing
greet checks. Recorded as AD-2.

**Reopens when.** The suite grows a runner that reports coverage the current jobs do not.

## D5 — Skills are routed by kind, not by one command

**Question.** Is `render_skill.py` the way to enter every BMAD skill?

**Evidence.** Of the 31 installed skills, seven ship a `workflow.md` and are entered through
`uv run --no-cache ./_bmad/scripts/render_skill.py` — `bmad-build`, `bmad-build-auto`,
`bmad-agent-po`, `bmad-code-review`, `bmad-qa-generate-e2e-tests`, `bmad-retrospective`,
`bmad-walkthrough`. The planning skills carry their own activation flow instead:
`bmad-product-brief`, `bmad-architecture`, `bmad-prd`, `bmad-ux` and `bmad-deep-recon` halt with
`render entry is missing` if routed through the renderer.

**Conclusion.** Read the skill's own `SKILL.md` first and follow its activation steps. The renderer
is the entry point for the workflow-shaped skills only.

**Reopens when.** The BMAD release makes every skill render-based.

## D6 — The active initiative is a project setting here

**Question.** How is the "no active initiative" failure avoided for every worktree?

**Evidence.** The `bmad-build` run failed a workflow call with `no active initiative: set
core.active_initiative in _bmad/custom/config.user.toml`. BMAD merges configuration in three
layers, later winning: `_bmad/config.toml`, then `_bmad/custom/config.toml`, then
`_bmad/custom/config.user.toml`. Only the last one is personal, and `_bmad/custom/.gitignore`
excludes `*.user.toml` from the repository.

**Conclusion.** The shared deployment needs the project-scoped `_bmad/custom/config.toml` to name
the initiative, so every worktree has one; the personal file stays free for an individual to
override.

**Reopens when.** Work in this repository needs more than one initiative in flight at a time, which
then means passing the initiative folder per run instead of naming one globally.
