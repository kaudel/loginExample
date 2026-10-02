---
title: moon requires an initial git commit before any command works
date: 2026-10-02
category: integration-issues
module: moon
problem_type: integration_issue
component: tooling
symptoms:
  - "`moon projects --json` fails with `fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree`"
  - "Every moon command fails identically, including read-only ones like `moon projects` — not just build/run tasks"
  - "`.moon/workspace.yml` and `.moon/toolchains.yml` parse without error, and `moon --version` works, so the failure looks like a project-graph bug rather than a missing-history problem"
root_cause: incomplete_setup
resolution_type: environment_setup
severity: high
related_components:
  - "git"
framework_version: "moon 2.5.6"
tags:
  - "moon"
  - "monorepo"
  - "git"
  - "initial-commit"
  - "vcs"
---

# moon requires an initial git commit before any command works

## Problem

moon (the monorepo task orchestrator) refuses to run any command — including read-only ones — in a repository that has zero git commits. It fails with a generic git error instead of a moon-specific "no commit history" message, which makes the real cause easy to misdiagnose as a broken `.moon/` config.

## Symptoms

- `moon projects --json` (and `moon run <task>`) exits non-zero with:
  ```
  Error: process::failed

    × Process git failed: exit code 128
    │ fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
    │ Use '--' to separate paths from revisions, like this:
    │ 'git <command> [<revision>...] -- [<file>...]'
  ```
- This happens on every moon command that touches the project graph, not just build/run tasks — even the simplest read-only listing command fails the same way.
- `moon --version` succeeds, and `.moon/workspace.yml` / `.moon/toolchains.yml` parse without complaint (confirmed by fixing unrelated config errors first and still hitting this failure afterward), so the symptom points at config rather than git history at first glance.

## What Didn't Work

- Re-checking `.moon/workspace.yml` and `.moon/toolchains.yml` for syntax errors — both were valid; `moon --version` ran fine, and the error only appeared once a project-graph command (`moon projects`) actually ran.
- Looking for a moon setting to disable VCS integration — moon's `workspace.yml` `vcs:` block has several fields (`client`, `defaultBranch`, `hookFormat`, `hooks`, `provider`, `remoteCandidates`, `sync`), but `client` only accepts the value `"git"`. There is no way to disable or swap out git. The dependency is unconditional.

## Solution

Make an initial commit before running any moon command:

```bash
git add <files>
git commit -m "Initial repo scaffolding"
```

Confirmed working immediately after: `moon projects --json` and `moon run <task>` both succeeded with no other changes.

## Why This Works

moon resolves workspace/project state through git unconditionally, even for commands that do nothing with history. Internally this surfaces as a `Process git failed: exit code 128` wrapper around a plain `git rev-parse`-style call — exit 128 is git's own "fatal" exit code, here for "ambiguous argument 'HEAD'" because no commit exists yet to resolve. A repo with no commits has no `HEAD`, so that internal git call fails before moon ever gets to parsing the project graph. Nothing in moon's own error output names git or "no commits" as the cause — that only becomes clear by running `git log` / `git status` outside of moon and noticing "No commits yet".

## Prevention

- When scaffolding a brand-new repo that will use moon from the start, make the first `git commit` part of step 1 — before writing `.moon/` config or running any moon command to verify it.
- Treat "every single moon command fails identically, including trivial ones like `moon projects`" as a specific signal pointing at missing git history, not at a config mistake — a real config error usually fails with a `config::parse::failed` message naming the offending field, not a generic git process error.
- Fast diagnostic: run `git rev-parse HEAD` directly. If that fails outside of moon too, the root cause is the missing commit, not moon.

## Related Issues

None found — this is the first learning doc captured for this repository, and no related GitHub issues were searched (the `gh` CLI is not installed in this environment).
