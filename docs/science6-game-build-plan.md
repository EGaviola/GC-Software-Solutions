# Science 6 Game Build Plan (CMCSS-Aligned)

## Curriculum Source
Primary source set (priority order):
- docs/tn-grade6-curriculum-reference.md (confirmed baseline from user-provided standards text)
- https://sites.google.com/cmcss.net/cmcssparentacademicresources/middle/sixth-grade/science-6th-grade
- https://drive.google.com/file/d/1rZhcmt2hYmPbuHghi4UsuLjUcwvR46ss/view
- https://docs.google.com/document/d/1rQHUzcpa-lFvnzsoDwIjCg0dvv014ygW0s5AkRNFPQM/edit?tab=t.0

Reference expectation:
- Use the most detailed accessible source for unit sequence and pacing.
- Cross-check standards language across all accessible links.
- Use docs/tn-grade6-curriculum-reference.md as the active standards map for backlog creation and mission tagging.

## Source Access Status
- The local standards reference file is available and treated as confirmed baseline content.
- The Google Drive file currently requires authentication in this environment.
- The Google Doc currently requires authentication in this environment.
- This plan is therefore a provisional build spec based on the visible source hub and standard grade-6 science scope.
- Replace provisional unit mapping with exact district sequence once shared as export (PDF/Doc) or public link.

## Confirmed Standards Coverage for Build
- Energy: 6.PS3.1, 6.PS3.2, 6.ETS1.2
- Ecosystems and energy flow: 6.LS2.1, 6.LS2.2, 6.LS2.3
- Ecosystem health and biodiversity: 6.LS2.4, 6.LS2.5, 6.LS4.1, 6.ETS1.1
- Hydrosphere and atmosphere: 6.ESS2.1, 6.ESS2.2, 6.ESS2.4
- Climate: 6.ESS2.3, 6.ESS2.6, 6.ESS2.7
- Earth and human activity: 6.ESS2.5, 6.ESS2.6, 6.ESS3.1, 6.ESS3.2, 6.ESS3.3

Implementation rule:
- Every mission must carry one primary standard code and optional secondary codes.
- Every unit boss challenge must assess at least three standards from the same cluster.

## Product Definition
A cross-platform science adventure game for grade 6 learners with:
- Story-driven mission arcs
- Interactive labs (simulation-first, not quiz-first)
- Escape-room science challenges
- Adaptive AI tutoring and remediation
- Teacher and parent reporting

## Proposed Tech Stack (Default)
- Client: React Native (iOS, Android), React Native Web (Chromebook/Web)
- Backend API: Node.js (NestJS)
- Data: PostgreSQL (Amazon RDS)
- Auth: Amazon Cognito
- Content Storage: Amazon S3 + CloudFront
- Realtime/Events: Amazon EventBridge + WebSockets
- Analytics: Amazon Kinesis Firehose + Redshift or Athena
- AI services: Model gateway service with moderation and prompt policy layers

## Learning Model
- Mastery model by topic and standard
- Per-standard skill score: 0-100
- Adaptive difficulty tiers: Guided, Standard, Advanced
- Prediction-before-experiment mechanic for bonus rewards

## Game Loop
1. Enter academy hub
2. Select mission from unlocked lab
3. Predict outcome
4. Run simulation/experiment
5. Analyze results and submit conclusion
6. Receive AI coaching and rewards
7. Unlock next mission path

## Core Labs for Grade 6
- Energy and Energy Transfer Lab
- Matter and Chemical Change Lab
- Earth Systems and Climate Lab
- Ecology and Environmental Impact Lab
- Engineering Design Workshop

## Escape Room Templates
- Grid Failure: Restore a city power system using energy-transfer logic
- Lab Leak: Contain a reaction by modeling heat transfer and states of matter
- Eco Collapse: Stabilize food web after species loss event
- Weather Crisis: Rebuild forecast model from atmospheric evidence

## MVP Scope (First 16 Weeks)
- 2 labs fully playable
- 1 escape room template per lab
- 40 missions total
- AI hints + remediation for each mission
- Teacher dashboard: class roster, assignment, mastery heatmap
- Parent dashboard: progress, time-on-task, strengths/gaps

## Delivery Phases

### Phase 1: Foundations (Weeks 1-4)
- Monorepo setup
- Auth, profiles, role model (student/teacher/parent/admin)
- Curriculum data model and standard tagging
- Mission runtime framework

### Phase 2: Core Gameplay (Weeks 5-8)
- Simulation engine v1
- Prediction and scoring mechanics
- XP, badges, progression track
- Mission authoring schema and tools

### Phase 3: Learning Intelligence (Weeks 9-12)
- Mastery estimator service
- Adaptive mission sequencing
- AI tutor feedback generation with guardrails
- Basic anti-cheat telemetry

### Phase 4: Dashboards and Launch Hardening (Weeks 13-16)
- Teacher and parent dashboards
- Accessibility pass (screen reader labels, contrast, captions)
- Performance tuning and crash analytics
- Pilot release package

## Initial Epics and Stories

### Epic 1: Curriculum Graph
- As a curriculum admin, I can map every mission to one or more grade-6 standards.
- As a teacher, I can assign missions by standard cluster.

### Epic 2: Mission Runtime
- As a student, I can run experiments by changing variables and observing outcomes.
- As a student, I must submit a hypothesis before experiment execution.

### Epic 3: Adaptive Tutor
- As a student, I receive hints that target my misconception, not just the answer.
- As a teacher, I can view misconception patterns by class and standard.

### Epic 4: Engagement Systems
- As a student, I earn XP, badges, and unlockables tied to mastery.
- As a student, I can complete daily challenge missions.

## Acceptance Criteria Examples
- Every mission includes: hypothesis prompt, variable controls, data output, explanation feedback.
- Every mission has at least one standard tag and one misconception tag.
- Hint generation must return in under 2 seconds for 95th percentile requests.
- Teacher mastery heatmap updates within 60 seconds of mission completion.

## KPIs
- Learning efficacy: +15% standard mastery growth in 6 weeks
- Engagement: D7 retention >= 45%
- Session quality: average session >= 18 minutes
- Mission success after remediation >= 70%
- Teacher adoption: >= 60% of assigned classes active weekly

## Compliance and Safety
- COPPA/FERPA/GDPR-K baseline controls
- Data minimization for minors
- Human-review workflow for flagged AI outputs
- Full audit log for teacher-visible grading data

## What Is Needed to Finalize CMCSS Alignment
1. Public or exported copy of the pacing guide
2. Public or exported standards list used by district
3. Preferred grading/report format for teacher dashboard
4. Target pilot calendar (term/quarter)
