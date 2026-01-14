# 🧪 Testing Plan

## Manual Testing Checklist

### Card Flip Tests
- [ ] Click card → flips to show emoji
- [ ] Click flipped card → no action
- [ ] Click matched card → no action
- [ ] Rapid clicks → max 2 cards flip

### Match Detection Tests
- [ ] Two matching cards → stay revealed
- [ ] Two non-matching → flip back after 1s
- [ ] Match increments progress bar
- [ ] All pairs matched → Win screen

### Timer Tests
- [ ] Timer starts on first card click
- [ ] Timer counts down correctly
- [ ] Timer at 0 → Lose screen
- [ ] Win before timer → stops timer

### Level Tests
- [ ] Easy: 8 cards, 60s, 3 hints
- [ ] Medium: 12 cards, 90s, 2 hints
- [ ] Hard: 16 cards, 120s, 1 hint
- [ ] Level change resets game

### Hint Tests
- [ ] Hint reveals matching pair
- [ ] Revealed cards hide after 2s
- [ ] Hints decrease on use
- [ ] Button disabled at 0 hints

### Audio Tests
- [ ] Music toggle works
- [ ] Sound effects toggle works
- [ ] Flip sound on card click
- [ ] Match sound on pair found
- [ ] Win/Lose sounds play

### Responsive Tests
- [ ] Mobile layout (320px)
- [ ] Tablet layout (768px)
- [ ] Desktop layout (1024px+)
- [ ] Grid adjusts properly

### Edge Cases
- [ ] Page refresh → game resets
- [ ] Rapid level switching
- [ ] Multiple hints in quick succession
- [ ] Win at exact timer = 0
