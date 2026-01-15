# 🎮 Memory Match Game

A beautiful, interactive memory matching card game built with **React 19** and **Vite**. Test your memory by matching pairs of emoji cards across multiple difficulty levels with immersive NCS Lofi Hip-Hop music and satisfying sound effects!

![Memory Match Game](./docs/preview.png)

## ✨ Features

### Core Gameplay
- 🃏 **Card Flipping Mechanics** - Smooth 3D flip animations with emoji cards
- 🎯 **Multiple Difficulty Levels** - Easy, Medium, and Hard modes
- ⏱️ **Circular Timer** - Visual countdown with SVG progress ring
- 💡 **Hint System** - Get help when you're stuck (reveals matching pairs)
- � **Combo System** - Track consecutive matches with combo multiplier
- ⏸️ **Pause/Resume** - Pause the game anytime

### Audio System
- 🎵 **NCS Background Music** - Royalty-free Lofi Hip-Hop tracks
- � **Multi-Track Support** - Switch between different music tracks
- 🔊 **Sound Effects** - Card flip, match, wrong match, win/lose sounds
- 🔇 **Mute Controls** - Separate volume for music and SFX
- 🎚️ **Volume Sliders** - Fine-tune audio levels

### UI/UX
- 📊 **Progress Tracking** - Visual progress bar for matched pairs
- 🏆 **Win Screen** - Victory overlay with stats, score, and share button
- 😢 **Lose Screen** - Game over with completion percentage
- ⚙️ **Settings Panel** - Level, audio, and graphics controls
- 📱 **Responsive Design** - Works on desktop and mobile
- 🌟 **Glassmorphism Design** - Modern frosted glass aesthetic

### Game Flow
- ▶️ **Next Level Button** - Advance to harder levels after winning
- 📤 **Share Score** - Share your score via Web Share API or clipboard
- 🔄 **Quick Level Switch** - Mini level selector (1, 2, 3) in UI

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/BenAmmarAmenAllah/memory-match-game.git

# Navigate to project directory
cd memory-match-game

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
memory-match-game/
├── docs/                          # Documentation files
│   ├── ARCHITECTURE.md            # System architecture
│   ├── COMPONENT_DIAGRAM.md       # Component relationships
│   ├── STATE_FLOW.md              # State management flow
│   ├── DEVELOPMENT_PHASES.md      # Development roadmap
│   ├── DATA_MODELS.md             # Data structures
│   ├── API_DESIGN.md              # Future backend API design
│   └── TESTING.md                 # Testing checklist
│
├── public/                        # Static assets
│   └── audio/                     # Audio files
│       ├── Aisake, Dosi - Cruising [NCS Release].mp3  # Background music
│       ├── flip.mp3               # Card flip sound
│       ├── match.mp3              # Successful match sound
│       ├── no-match.mp3           # Wrong match sound
│       ├── combo.mp3              # Combo streak sound
│       ├── win.mp3                # Victory sound
│       ├── lose.mp3               # Game over sound
│       └── hint.mp3               # Hint button sound
│
├── src/
│   ├── assets/                    # Images and static resources
│   │
│   ├── components/                # React components
│   │   ├── App/                   # Root component & game layout
│   │   │   ├── App.jsx
│   │   │   └── App.css
│   │   │
│   │   ├── Card/                  # Individual memory card
│   │   │   ├── Card.jsx
│   │   │   ├── Card.css
│   │   │   └── GameLogo.jsx       # Card back logo
│   │   │
│   │   ├── GameBoard/             # Grid of cards
│   │   │   ├── GameBoard.jsx
│   │   │   └── GameBoard.css
│   │   │
│   │   ├── Timer/                 # Circular countdown timer
│   │   │   ├── Timer.jsx
│   │   │   └── Timer.css
│   │   │
│   │   ├── ProgressBar/           # Match progress indicator
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ProgressBar.css
│   │   │
│   │   ├── HelpButton/            # Hint system button
│   │   │   ├── HelpButton.jsx
│   │   │   └── HelpButton.css
│   │   │
│   │   ├── WinScreen/             # Victory overlay
│   │   │   ├── WinScreen.jsx      # Next level & share score buttons
│   │   │   └── WinScreen.css
│   │   │
│   │   ├── LoseScreen/            # Game over overlay
│   │   │   ├── LoseScreen.jsx
│   │   │   └── LoseScreen.css
│   │   │
│   │   ├── MusicPlayer/           # Quick music toggle button
│   │   │   ├── MusicPlayer.jsx
│   │   │   └── MusicPlayer.css
│   │   │
│   │   ├── SettingsButton/        # Settings panel trigger
│   │   │   ├── SettingsButton.jsx
│   │   │   └── SettingsButton.css
│   │   │
│   │   ├── SettingsPanel/         # Full settings modal
│   │   │   ├── SettingsPanel.jsx  # Level, audio, track selector
│   │   │   └── SettingsPanel.css
│   │   │
│   │   ├── MatchedContainer/      # Matched cards display
│   │   │   ├── MatchedContainer.jsx
│   │   │   └── MatchedContainer.css
│   │   │
│   │   ├── Header/                # Game header (legacy)
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   │
│   │   └── GameLogo.jsx           # SVG game logo
│   │
│   ├── context/                   # React Context providers
│   │   ├── GameContext.jsx        # Game state (cards, score, timer)
│   │   └── AudioContext.jsx       # Audio system (music, SFX, tracks)
│   │
│   ├── reducers/                  # State reducers
│   │   └── gameReducer.js         # Game actions & state logic
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── useTimer.js            # Timer interval logic
│   │
│   ├── utils/                     # Utility functions
│   │   └── cardUtils.js           # Card generation & shuffling
│   │
│   ├── data/                      # Static configuration
│   │   ├── levels.js              # Level configurations
│   │   └── emojis.js              # Emoji card collection
│   │
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Game Levels

| Level  | Cards | Pairs | Timer  | Hints | Grid    |
|--------|-------|-------|--------|-------|---------|
| Easy   | 16    | 8     | 5 min  | 2     | 4×4     |
| Medium | 24    | 12    | 8 min  | 3     | 6×4     |
| Hard   | 32    | 16    | 12 min | 4     | 8×4     |

## 🎵 Audio System

### Background Music (NCS Lofi Hip-Hop)
The game uses royalty-free music from [NCS (NoCopyrightSounds)](https://ncs.io):

| Track | Artist | Mood |
|-------|--------|------|
| Cruising ✅ | Aisake, Dosi | Peaceful, Dreamy, Laid Back |

### Sound Effects

| Sound | Trigger | Description |
|-------|---------|-------------|
| `FLIP` | Card click | Satisfying flip sound |
| `MATCH` | Correct pair | Success chime |
| `NO_MATCH` | Wrong pair | Error buzzer |
| `COMBO` | 3+ streak | Combo bonus sound |
| `WIN` | Game won | Victory celebration |
| `LOSE` | Time up | Game over sound |
| `HINT` | Hint used | Hint activation |

### Adding More Tracks

1. Download tracks from [NCS Lofi Hip-Hop](https://ncs.io/music-search?genre=60)
2. Place MP3 in `public/audio/`
3. Add to `MUSIC_TRACKS` in `src/context/AudioContext.jsx`

## 🎨 Tech Stack

- **React 19** - UI Framework with Hooks
- **Vite 7** - Build Tool & Dev Server
- **CSS3** - Glassmorphism, animations, responsive design
- **Web Audio API** - Sound effects & background music
- **Context API + useReducer** - State management

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Component Diagram](./docs/COMPONENT_DIAGRAM.md)
- [State Management Flow](./docs/STATE_FLOW.md)
- [Development Phases](./docs/DEVELOPMENT_PHASES.md)
- [Data Models](./docs/DATA_MODELS.md)
- [Future API Design](./docs/API_DESIGN.md)
- [Testing Checklist](./docs/TESTING.md)

## 🧪 Testing

```bash
# Run linting
npm run lint

# Manual testing checklist in docs/TESTING.md
```

## 🔮 Future Enhancements

- [ ] 🌐 Backend integration for high scores
- [ ] 👤 User authentication
- [ ] 🏅 Leaderboards
- [ ] 📅 Daily challenges
- [ ] 🎨 Theme customization (dark/light/custom)
- [ ] 📊 Statistics tracking & history
- [ ] 🎵 More NCS tracks (miffy cafe, apart)
- [ ] 🔊 More sound effect variations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- 🎵 Background music by [NCS (NoCopyrightSounds)](https://ncs.io)
- 😀 Emoji designs from Unicode Standard
- 🎮 Inspired by classic memory card games

---

Made with ❤️ by [Nightmare]
