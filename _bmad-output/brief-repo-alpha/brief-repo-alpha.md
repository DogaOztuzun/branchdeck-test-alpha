# Product Brief: repo-alpha

## Executive Summary

repo-alpha is the controlled testbed for Branchdeck PR Shepherd, the deployment that turns a
GitHub issue into a pull request a person can check before merging. The code in it is
deliberately small — a greeting function and a small math library, each covered by hand-written
assertions — because the point of the repository is the *method*, not the feature count: an issue
becomes a plan, the plan becomes evidence, the evidence becomes a reviewable pull request.

Every change here is therefore two changes at once: a change to the fixture code, and a change to
the deployment's way of working. The brief below states what both are for, so a planner can tell
which part of a request is the product and which part is the probe.

## The Problem

An agent that edits code leaves the owner unable to tell whether the work satisfies the request.
The owner ends up re-deriving the intent, re-running the suite by hand, and trusting a summary
written by the same agent that made the change. In this repository that risk is concrete rather
than theoretical: the math suite printed its summary and decided the exit code before its last
assertions, so it reported "All 86 tests passed" while nine assertions had never run and could
never fail the build (issue #64). CI did not run the suite at all, so nothing else would have
caught it.

The second gap is planning. Without a written account of what this repository is for, a planner
has only the issue text and the code, and produces a plan that is locally reasonable and globally
unanchored.

## The Solution

Work in this repository follows one path: understand, decide, plan, implement, verify, review.
Each step leaves an artifact under `_bmad-output/`, and the artifacts travel with the pull request,
so the owner can check the reasoning and the evidence without re-running the work.

Planning is not optional decoration. A change with acceptance criteria gets a plan that names
its files, its checks and its risks before any code is written, and the owner approves that plan
before implementation starts. A mechanical change — a typo, a formatting fix, a single obvious
edit — skips the ceremony and goes straight to a pull request.

## What Makes This Different

The differentiator is not a technical moat; it is a discipline that is cheap to state and
expensive to fake. Two different runs on this repository produced different results precisely
because the artifacts were missing: the first produced a correct change with a plan that stayed
on the agent's machine, the second produced the same change with the plan, the review findings and
the deferred work visible on GitHub. The method is the product.

## Who This Serves

One person today: the owner of the Branchdeck deployment, who merges every pull request and
cannot delegate that. Their success looks like being able to read one pull request and know
whether the issue is satisfied. Secondary readers are the agents themselves, who inherit
`AGENTS.md` and the planning artifacts as the context they work from.

## Success Criteria

- Every pull request opened here carries its plan and evidence under `_bmad-output/`.
- The acceptance criteria of an issue can be verified from the pull request alone.
- CI executes the entire suite; a green run means every assertion ran and was counted.
- No pull request is merged by an agent.
- A plan is approved by the owner before implementation, never by its own author.

## Scope

In scope: the fixture library and its assertions, the CI workflow, and the deployment's planning
and evidence artifacts. Out of scope: production features, a UI, new dependencies, a test
framework, and anything that turns this repository into a product rather than a probe of the
method.

## Vision

The repository stays small on purpose. What grows is the method: richer decision records, better
evidence per change, and a path from an idea to an accepted pull request that can be reused
unchanged in repositories that do matter.
