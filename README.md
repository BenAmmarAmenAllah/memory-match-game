# 🎮 Memory Match Game

A beautiful, interactive memory matching card game built with **React** and **Vite**. Test your memory by matching pairs of emoji cards across multiple difficulty levels with immersive sound effects and music!

![Memory Match Game](./docs/preview.png)

## ✨ Features

- 🃏 **Card Flipping Mechanics** - Smooth flip animations with emoji cards
- 🎯 **Multiple Difficulty Levels** - Easy, Medium, and Hard modes
- ⏱️ **Timer System** - Race against the clock to match all pairs
- 💡 **Hint System** - Get help when you're stuck
- 🎵 **Music & Sound Effects** - Immersive audio experience
- 📊 **Progress Tracking** - Visual progress bar for matched pairs
- 🏆 **Win/Lose Screens** - Beautiful result overlays with stats
- 📱 **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/memory-match-game.git

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
│   └── API_DESIGN.md              # Future backend API design
│
├── public/                        # Static assets
│   └── audio/                     # Audio files
│       ├── background-music.mp3
│       ├── flip.mp3
│       ├── match.mp3
│       ├── win.mp3
│       ├── lose.mp3
│       └── hint.mp3
│
├── src/
│   ├── assets/                    # Images and static resources
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/               # React components
│   │   ├── App/                  # Root component
│   │   │   ├── App.jsx
│   │   │   └── App.css
│   │   │
│   │   ├── Header/               # Game header
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   │
│   │   ├── GameBoard/            # Game board container
│   │   │   ├── GameBoard.jsx
│   │   │   └── GameBoard.css
│   │   │
│   │   ├── Card/                 # Individual card
│   │   │   ├── Card.jsx
│   │   │   └── Card.css
│   │   │
│   │   ├── Timer/                # Countdown timer
│   │   │   ├── Timer.jsx
│   │   │   └── Timer.css
│   │   │
│   │   ├── ProgressBar/          # Match progress
│   │   │   ├── ProgressBar.jsx
│   │   │   └── ProgressBar.css
│   │   │
│   │   ├── HelpButton/           # Hint system
│   │   │   ├── HelpButton.jsx
│   │   │   └── HelpButton.css
│   │   │
│   │   ├── WinScreen/            # Victory overlay
│   │   │   ├── WinScreen.jsx
│   │   │   └── WinScreen.css
│   │   │
│   │   ├── LoseScreen/           # Defeat overlay
│   │   │   ├── LoseScreen.jsx
│   │   │   └── LoseScreen.css
│   │   │
│   │   ├── MusicPlayer/          # Audio controls
│   │   │   ├── MusicPlayer.jsx
│   │   │   └── MusicPlayer.css
│   │   │
│   │   ├── SettingsPanel/        # Game settings
│   │   │   ├── SettingsPanel.jsx
│   │   │   └── SettingsPanel.css
│   │   │
│   │   ├── LevelSelector/        # Difficulty selection
│   │   │   ├── LevelSelector.jsx
│   │   │   └── LevelSelector.css
│   │   │
│   │   └── common/               # Reusable UI components
│   │       ├── Button/
│   │       ├── Modal/
│   │       └── Icon/
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useGameLogic.js       # Game state management
│   │   ├── useTimer.js           # Timer functionality
│   │   ├── useAudio.js           # Audio management
│   │   └── useLocalStorage.js    # Persistent storage
│   │
│   ├── context/                  # React Context providers
│   │   ├── GameContext.jsx       # Game state context
│   │   ├── AudioContext.jsx      # Audio state context
│   │   └── SettingsContext.jsx   # Settings context
│   │
│   ├── reducers/                 # Reducer functions
│   │   ├── gameReducer.js        # Game state reducer
│   │   └── audioReducer.js       # Audio state reducer
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cardUtils.js          # Card generation/shuffling
│   │   ├── gameUtils.js          # Game logic helpers
│   │   ├── audioUtils.js         # Audio helpers
│   │   └── constants.js          # App constants
│   │
│   ├── data/                     # Static data
│   │   ├── levels.js             # Level configurations
│   │   └── emojis.js             # Emoji collections
│   │
│   ├── styles/                   # Global styles
│   │   ├── index.css             # Global CSS
│   │   ├── variables.css         # CSS variables
│   │   ├── animations.css        # Keyframe animations
│   │   └── reset.css             # CSS reset
│   │
│   └── main.jsx                  # Application entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Game Levels

| Level  | Cards | Pairs | Timer  | Hints |
|--------|-------|-------|--------|-------|
| Easy   | 32    | 16    | 5 min  | 2     |
| Medium | 64    | 32    | 10 min | 3     |
| Hard   | 128   | 64    | 15 min | 4     |


## 🎨 Tech Stack

- **React 19** - UI Framework
- **Vite** - Build Tool & Dev Server
- **CSS3** - Styling with animations
- **Web Audio API** - Sound effects & music

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Component Diagram](./docs/COMPONENT_DIAGRAM.md)
- [State Management Flow](./docs/STATE_FLOW.md)
- [Development Phases](./docs/DEVELOPMENT_PHASES.md)
- [Data Models](./docs/DATA_MODELS.md)
- [Future API Design](./docs/API_DESIGN.md)

## 🧪 Testing

```bash
# Run linting
npm run lint

# Manual testing checklist in docs/TESTING.md
```

## 🔮 Future Enhancements

- 🌐 Backend integration for high scores
- 👤 User authentication
- 🏅 Leaderboards
- 📅 Daily challenges
- 🎨 Theme customization
- 📊 Statistics tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Emoji designs from Unicode Standard
- Inspired by classic memory card games

---

Made with ❤️ by [Your Name]
