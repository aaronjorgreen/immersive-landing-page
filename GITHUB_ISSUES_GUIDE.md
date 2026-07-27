# GitHub Issues Guide

**Mandatory for all agents and contributors.**

You **must** follow this guide whenever you create, update, merge, or close work in this repository. No exceptions. Do not commit directly to `main` for feature work. Do not merge code without a linked issue.

---

## 1. Golden Rules

1. **Every piece of work starts with an issue** — before you write code.
2. **Every PR links to an issue** — use `Closes #N` or `Fixes #N` in the PR description.
3. **One issue = one deliverable** — do not bundle unrelated work.
4. **Label every issue** — immediately on creation.
5. **Close issues only when acceptance criteria are met** — not when code is merely pushed.
6. **Keep `main` deployable** — merge only reviewed, working increments.

---

## 2. Issue Labels (Mandatory)

Apply **at least one label from each applicable category** when creating an issue.

### Type (required — pick one)

| Label | Use when |
|---|---|
| `setup` | Project scaffolding, tooling, config |
| `feature` | New user-facing capability |
| `section` | A narrative act / page section |
| `polish` | Performance, responsive, visual refinement |
| `bug` | Something broken that worked before |
| `docs` | Documentation only |

### Priority (required — pick one)

| Label | Use when |
|---|---|
| `priority: critical` | Blocks all other work |
| `priority: high` | Core experience or current sprint |
| `priority: medium` | Important but not blocking |
| `priority: low` | Nice-to-have, future |

### Status (optional — update as work progresses)

| Label | Use when |
|---|---|
| `status: in-progress` | Actively being worked on |
| `status: blocked` | Waiting on dependency or decision |
| `status: ready-for-review` | PR open, awaiting merge |

> If these labels do not exist in the repo yet, **create them** before opening issues.

---

## 3. Issue Creation (Mandatory Steps)

Before writing any code:

### Step 1 — Check for duplicates
Search open and closed issues. Do not create duplicates.

### Step 2 — Create the issue with this structure

**Title format:** `[Type] Short descriptive title`

Examples:
- `[Setup] Project foundation and design tokens`
- `[Section] Act 3 — River (FG/BG parallax)`
- `[Polish] Responsive and mobile experience`

**Body template (copy and fill in):**

```markdown
## Summary
One paragraph: what this issue delivers and why it matters to the experience.

## Acceptance Criteria
- [ ] Criterion 1 (specific, testable)
- [ ] Criterion 2
- [ ] Criterion 3

## Implementation Notes
Optional: files to touch, dependencies on other issues, creative/technical constraints.

## Depends On
- #N (if applicable, otherwise "None")

## Out of Scope
What this issue explicitly does NOT include.
```

### Step 3 — Apply labels
Minimum: one **Type** label + one **Priority** label.

### Step 4 — Assign yourself
If you are the agent doing the work, assign the issue to yourself (or note assignment in a comment).

---

## 4. Initial Issue Backlog (Create These First)

When beginning implementation, create all issues from `IMPLEMENTATION_PLAN.md` Section 10 before starting Phase 0:

1. `[Setup] Project foundation and design tokens`
2. `[Core] Scroll infrastructure and parallax system`
3. `[Section] Act 1 — Hero`
4. `[Section] Act 2 — Canopy`
5. `[Section] Act 3 — River (FG/BG parallax)`
6. `[Section] Act 4 — Wildlife`
7. `[Section] Act 5 — Community`
8. `[Section] Act 6 — Depths`
9. `[Section] Act 7 — CTA / The Arrival`
10. `[Polish] Performance and cross-browser pass`
11. `[Polish] Responsive and mobile experience`

Set dependencies in issue bodies (e.g. all sections depend on `[Core]`).

---

## 5. Branch & PR Workflow (Mandatory)

### Branch naming
```
<type>/<issue-number>-<short-slug>
```
Examples:
- `setup/1-project-foundation`
- `section/4-river-parallax`
- `polish/10-mobile-pass`

### Before opening a PR
1. Issue exists and is labeled.
2. Branch is up to date with `main` (rebase if needed).
3. Code runs locally without errors.
4. Acceptance criteria are addressed.

### PR title format
Same as issue title: `[Type] Short descriptive title`

### PR body template (mandatory)

```markdown
## Summary
What changed and why (1–3 sentences).

## Linked Issue
Closes #N

## Acceptance Criteria Checklist
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Test Plan
Steps to verify the change works (desktop + mobile where relevant).

## Screenshots / Notes
Optional: visual evidence for section work.
```

### Merge rules
- **Squash merge** preferred — keeps history clean.
- Do **not** merge your own PR without verifying acceptance criteria.
- One PR per issue unless explicitly scoped otherwise in the issue.

---

## 6. Issue Management During Work

### When starting work
1. Comment on the issue: `Starting work — branch: <branch-name>`
2. Add `status: in-progress` label.
3. Create branch from latest `main`.

### When blocked
1. Comment with what is blocking and what is needed.
2. Add `status: blocked` label.
3. Do not switch to unrelated work without closing or handoff comment.

### When PR is open
1. Add `status: ready-for-review` label.
2. Ensure PR description links issue with `Closes #N`.

### When merging
1. Verify all acceptance criteria in PR checklist.
2. Merge PR.
3. Confirm issue auto-closed via `Closes #N`.
4. If not auto-closed, close manually with comment: `Merged via PR #N. Acceptance criteria met.`

---

## 7. Issue Closure (Mandatory)

Close an issue **only when**:

- [ ] PR is merged to `main`
- [ ] All acceptance criteria are checked off
- [ ] No known regressions from this change
- [ ] Dependent issues are unblocked (comment if relevant)

**Do not close issues for:**
- Partial work ("will finish later")
- Work only on a branch, not merged
- Scope moved to another issue without cross-linking

When closing manually, leave a brief comment summarising what was delivered.

---

## 8. Bug Issues

Bug reports must include:

```markdown
## Bug Description
What is wrong.

## Steps to Reproduce
1. ...
2. ...

## Expected vs Actual
- Expected: ...
- Actual: ...

## Environment
Browser / device / viewport size
```

Label: `bug` + appropriate priority.

---

## 9. Repo Hygiene Checklist (Every Session)

Before ending a work session, verify:

- [ ] All open PRs link to an issue
- [ ] No orphan branches left unmerged without explanation
- [ ] Issues in progress have `status: in-progress`
- [ ] Merged work has closed issues
- [ ] `main` builds and runs

---

## 10. Agent Directive

**If you are an AI agent working on this repository:**

1. Read `IMPLEMENTATION_PLAN.md` and this guide **before** any code changes.
2. Create the issue backlog (Section 4) if it does not exist.
3. Pick the next open issue by priority and dependency order.
4. Follow the full workflow: issue → branch → PR → merge → close.
5. Never skip labeling, linking, or acceptance criteria.
6. Comment on issues when state changes — silent work is not acceptable.
7. Do not implement features outside the current issue scope.

Failure to follow this guide creates technical debt and **must be corrected before proceeding**.

---

*This guide is part of the project contract. Treat it as binding.*
