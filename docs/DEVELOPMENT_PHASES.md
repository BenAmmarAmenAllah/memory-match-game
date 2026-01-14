# 📅 Development Phases

## Phase 1: Basic UI Layout
**Goal:** Create visual foundation with all components.

### Tasks
- Set up project structure
- Create App, Header, Card, GameBoard components
- Add Timer, ProgressBar placeholders
- Create Win/Lose screen overlays
- Add flip animations and styling

### Deliverable
Clickable UI with placeholder cards and basic animations.

---

## Phase 2: Game Logic
**Goal:** Implement core matching mechanics.

### Tasks
- Create GameContext and gameReducer
- Generate card pairs with shuffle
- Handle card flip and match detection
- Update progress bar on match
- Detect win condition

### Deliverable
Functional memory game without timer/levels.

---

## Phase 3: Levels & Timer
**Goal:** Add difficulty and countdown.

### Tasks
- Define level configs (Easy/Medium/Hard)
- Create LevelSelector component
- Implement useTimer hook
- Handle time's up condition
- Adjust grid size per level

### Deliverable
Leveled gameplay with time pressure.

---

## Phase 4: Help System
**Goal:** Implement hints.

### Tasks
- Create HelpButton component
- Reveal matching pair temporarily
- Track and decrease hints
- Disable button when exhausted

### Deliverable
Fully playable game with hints.

---

## Phase 5: Music & Sound
**Goal:** Add immersive audio.

### Tasks
- Create AudioContext and MusicPlayer
- Add background music loop
- Add sound effects (flip, match, win, lose)
- Create SettingsPanel with volume control

### Deliverable
Immersive game with audio experience.

---

## Timeline
| Phase | Duration | Focus |
|-------|----------|-------|
| 1 | Week 1 | UI Layout |
| 2 | Week 2 | Game Logic |
| 3 | Week 3 | Levels/Timer |
| 4 | Week 4 | Help System |
| 5 | Week 5 | Audio |
