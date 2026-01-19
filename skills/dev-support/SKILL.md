---
name: dev-support
description: Project management skill optimized for short, interruptible development sessions. Use this when you need to design features, create documentation (specs, architecture, test plans, roadmaps), manage work context during interruptions, or resume work after a break. Supports any technology stack and helps maintain productivity across fragmented work sessions.
license: MIT License
metadata:
  author: Keiji Miyake
  version: "2.2"
---

# Dev Support Skill

This skill helps you manage development projects across short, interruptible work sessions. It emphasizes documentation-driven development and context preservation to minimize productivity loss when switching between tasks.

## Core Principles

- **Two-tier documentation**: Project-level (`docs/`) + Feature-level (`docs/dev/[feature-name]/`)
- **Critical file**: CONTEXT.md is the most important for interruption/resumption
- **Technology agnostic**: Works with any programming language or framework
- **Flexible sessions**: Always ask user for session duration (default: 30 minutes)
- **Manual-first approach**: Use standard commands unless user explicitly requests helper scripts
- **Architecture consistency**: Ensure features align with project architecture

## Session Start Workflow

1. **Ask session duration**: "How long is this session? (default: 30 minutes)"
2. **Check project documentation structure**:
   - Look for `docs/README.md` (documentation index)
   - Check `ARCHITECTURE.md` (project-level architecture)
   - Verify `docs/dev/README.md` (active features list)
3. **Find and read CONTEXT.md** files in `docs/dev/**/`
4. **Summarize last session**:
   - Date/time and duration
   - Task being worked on
   - Completed vs incomplete items
   - Next actions from CONTEXT.md
5. **Check ROADMAP.md** if exists, show overall progress
6. **Ask user**: "Continue from where you left off?"
7. **Handle existing projects**: If no structured docs exist, propose project-wide documentation setup

## New Feature Development

1. **Check project architecture alignment**:
   - Read `ARCHITECTURE.md` or `docs/architecture/overview.md`
   - Verify feature fits within existing system design
   - Identify affected components
2. **Inform user** that `docs/dev/[feature-name]/` directory is recommended
3. **Propose creating**:
   - **SPEC.md**: Requirements, user stories, acceptance criteria
   - **DESIGN.md**: Architecture, technical decisions, API design
   - **TEST_PLAN.md**: Test cases, validation methods
   - **ROADMAP.md**: Implementation phases, milestones, progress tracking
   - **CONTEXT.md**: Work context (most critical for resumption)
4. **After approval**, create documents manually:
   - `mkdir -p docs/dev/[feature-name]`
   - Create each file with appropriate templates
5. **Register feature**:
   - Add to `docs/dev/README.md` with status, priority, dependencies
   - Update project ROADMAP if exists
6. **Technology stack tracking**:
   - Ask: "What technology stack is this project using?"
   - Record in `.meta.json`: `{"feature": "name", "stack": "stack", "createdAt": "date"}`
   - Or read from existing DESIGN.md if available
7. **Architecture decision recording**:
   - If significant technical decision made, offer to create ADR in `docs/architecture/decisions/`

## During Work Session

- **Monitor time**: Inform user of remaining time periodically
- **5-minute warning**: "5 minutes left. Prepare to update CONTEXT.md"
- **Suggest updates**:
  - DESIGN.md when architecture changes
  - TEST_PLAN.md when adding test cases
  - CONTEXT.md for technical decisions
- **Task splitting**: Recommend breaking tasks if they exceed session time

## Session End (CRITICAL)

**This is mandatory - never skip this step:**

1. **Record actual time**: "This session was [X] minutes"
2. **Update CONTEXT.md** with:
   - Last session date/time
   - Session duration (actual time worked)
   - Current work details
   - Progress: completed/in-progress/not-started
   - Next session actions (priority order)
   - Technical notes, discoveries, issues
   - List of changed files
   - Environment restoration steps (if needed)
3. **Update ROADMAP.md** progress percentage
4. **Update project-level docs if needed**:
   - `docs/dev/README.md`: Update feature status
   - `ARCHITECTURE.md`: If architecture changed
   - Create ADR in `docs/architecture/decisions/` if significant decision made
5. **Encourage Git commit** (WIP commits are acceptable)

### CONTEXT.md Template

```markdown
## Last Session
- Date/time: [timestamp]
- Duration: [actual work time]
- Task: [what you worked on]

## Progress
- Completed: [finished work]
- In Progress: [current work]
- Blocked: [issues]

## Next Session (Priority Order)
1. [Action 1] - Priority: High
2. [Action 2] - Priority: Medium

## Technical Notes
- [Key decisions and discoveries]

## Changed Files
- [List of modified files]

## Environment Restoration
### Setup Commands
[Dependencies, environment variables, etc.]

### Runtime Environment
- Node.js: [version]
- Other tools: [versions]

### Hardware State (IoT/Electronics)
- GPIO pins: [connection status]
```

## Technology Stack Management

**Priority order for determining stack:**
1. Read from `.meta.json` in feature directory if exists
2. Infer from DESIGN.md content if available
3. Ask user: "What technology stack is this project using?"
4. Record in `.meta.json` for future sessions

## Document Creation Support

Help users organize information into structured documentation:
- Transform specs into SPEC.md format
- Compile design discussions into DESIGN.md
- Format test cases into TEST_PLAN.md tables
- Structure work plans into ROADMAP.md phases

## Existing Project Integration

When working with projects without structured documentation:
1. **Assess current state**:
   - Check for existing docs (README, docs/, wiki, etc.)
   - Identify project maturity level (new/growing/mature)
2. **Propose documentation structure** based on project size:
   - **Small/New**: Minimal structure (README + docs/dev/)
   - **Growing**: Add ARCHITECTURE.md + docs/dev/README.md
   - **Mature**: Full structure with architecture/, guides/, api/
3. **If user declines full structure**:
   - Create minimal CONTEXT.md in appropriate location
   - Ask user where to store session context
   - Respect user preferences but recommend best practices
4. **Migration path**: Offer to gradually evolve docs as project grows

## Helper Scripts (Advanced Use Only)

If `scripts/manage-dev.ts` exists **and user explicitly requests it**:
- Can assist with automated directory/file creation
- Provides progress summaries
- Generates templates

**Default behavior**: Always use standard commands (`mkdir`, direct file creation) unless user says otherwise.

## Best Practices

- **Flexible sessions**: Discuss duration with user (15/30/45/60/90 min options)
- **Reserve documentation time**: Always keep 5-10 minutes before session end
- **CONTEXT.md is mandatory**: It's a message to your future self
- **Split tasks appropriately**: Must complete within session time
- **Commit frequently**: Small commits, WIP is OK
- **Document decisions**: Always record technical decision rationale
- **Documentation-first**: Write docs before code when possible
- **Record actual time**: Log actual work time in CONTEXT.md
- **Two-tier thinking**: Consider both project-level and feature-level impacts
- **Architecture alignment**: Verify new features fit existing architecture
- **ADR for big decisions**: Create Architecture Decision Records for significant choices

Focus on workflow and documentation structure, not specific tools.

## Project Documentation Structure

### Recommended Full Structure

```
project-root/
├── README.md                    # Project overview (required)
├── ARCHITECTURE.md             # System-wide architecture
├── CONTRIBUTING.md             # Contribution guidelines
├── CHANGELOG.md                # Release history
│
├── docs/
│   ├── README.md              # Documentation index
│   ├── getting-started/       # Onboarding guides
│   │   ├── installation.md
│   │   ├── quickstart.md
│   │   └── configuration.md
│   │
│   ├── architecture/          # System design
│   │   ├── overview.md       # System overview
│   │   ├── components.md     # Component architecture
│   │   ├── data-flow.md      # Data flow diagrams
│   │   └── decisions/        # ADR (Architecture Decision Records)
│   │       ├── 001-database-choice.md
│   │       ├── 002-api-design.md
│   │       └── template.md
│   │
│   ├── api/                   # API specifications
│   │   ├── rest-api.md
│   │   └── graphql-schema.md
│   │
│   ├── guides/                # Developer guides
│   │   ├── coding-standards.md
│   │   ├── testing.md
│   │   └── deployment.md
│   │
│   └── dev/                   # Active feature development
│       ├── README.md          # Active features index
│       └── [feature-name]/    # Per-feature docs
│           ├── SPEC.md
│           ├── DESIGN.md
│           ├── TEST_PLAN.md
│           ├── ROADMAP.md
│           └── CONTEXT.md
```

### Minimal Structure (Small Projects)

```
project-root/
├── README.md                    # Project overview
├── ARCHITECTURE.md             # Basic architecture notes
└── docs/
    └── dev/
        ├── README.md          # Active features
        └── [feature-name]/
            ├── SPEC.md
            ├── DESIGN.md
            └── CONTEXT.md
```

### Documentation Maturity Levels

**Level 1 - Startup** (< 3 months, 1-2 developers):
- README.md
- docs/dev/[feature]/CONTEXT.md

**Level 2 - Growing** (3-12 months, 2-5 developers):
- + ARCHITECTURE.md
- + docs/dev/README.md
- + docs/getting-started/

**Level 3 - Mature** (> 1 year, 5+ developers):
- + docs/architecture/decisions/ (ADRs)
- + docs/guides/
- + docs/api/
- + CONTRIBUTING.md
