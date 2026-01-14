# 📊 Component Diagram

## Mermaid Component Diagram

```mermaid
graph TB
    subgraph App["🎮 App (Root)"]
        direction TB
        
        subgraph Header["📌 Header"]
            LS[Level Selector]
            TM[Timer]
            PB[Progress Bar]
        end
        
        subgraph GameArea["🎯 Game Area"]
            GB[Game Board]
            C1[Card 1]
            C2[Card 2]
            C3[Card 3]
            Cn[Card N...]
            GB --> C1
            GB --> C2
            GB --> C3
            GB --> Cn
        end
        
        subgraph Controls["🎛️ Controls"]
            HB[Help Button]
            MP[Music Player]
            SP[Settings Panel]
        end
        
        subgraph Overlays["🪟 Overlays"]
            WS[Win Screen]
            LoS[Lose Screen]
        end
    end
    
    subgraph State["📦 State Management"]
        GC[Game Context]
        AC[Audio Context]
        SC[Settings Context]
    end
    
    subgraph Hooks["🪝 Custom Hooks"]
        UGL[useGameLogic]
        UT[useTimer]
        UA[useAudio]
        ULS[useLocalStorage]
    end
    
    App --> State
    State --> Hooks
    
    GC --> UGL
    GC --> UT
    AC --> UA
    SC --> ULS
    
    style App fill:#1a1a2e,stroke:#16213e,color:#fff
    style Header fill:#0f3460,stroke:#16213e,color:#fff
    style GameArea fill:#0f3460,stroke:#16213e,color:#fff
    style Controls fill:#0f3460,stroke:#16213e,color:#fff
    style Overlays fill:#0f3460,stroke:#16213e,color:#fff
    style State fill:#533483,stroke:#16213e,color:#fff
    style Hooks fill:#e94560,stroke:#16213e,color:#fff
```

---

## Component Responsibility Matrix

| Component | Props | State | Side Effects | Renders |
|-----------|-------|-------|--------------|---------|
| **App** | None | `gameStatus`, `level` | Initialize game | All children |
| **Header** | `level`, `timer`, `progress` | None | None | Title, timer, progress |
| **GameBoard** | `cards`, `onCardClick` | `flippedCards` | Check matches | Grid of cards |
| **Card** | `card`, `onClick`, `isFlipped` | None | Animation | Single card |
| **Timer** | `initialTime`, `onTimeUp` | `timeLeft` | Countdown interval | Time display |
| **ProgressBar** | `matched`, `total` | None | None | Progress indicator |
| **HelpButton** | `hintsLeft`, `onUseHint` | None | Audio | Hint button |
| **WinScreen** | `stats`, `onPlayAgain` | None | Audio | Victory overlay |
| **LoseScreen** | `stats`, `onTryAgain` | None | Audio | Defeat overlay |
| **MusicPlayer** | None | `isPlaying`, `volume` | Audio playback | Audio controls |
| **SettingsPanel** | `settings`, `onChange` | `isOpen` | None | Settings form |
| **LevelSelector** | `currentLevel`, `onSelect` | `isOpen` | None | Level dropdown |

---

## Component Communication Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   APP                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              HEADER                                   │  │
│  │                                                                       │  │
│  │   ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐  │  │
│  │   │   Level     │    │    Timer    │    │      ProgressBar        │  │  │
│  │   │  Selector   │    │             │    │                         │  │  │
│  │   │             │    │  timeLeft   │    │   matched / total       │  │  │
│  │   │ onLevelChange    │  onTimeUp() │    │                         │  │  │
│  │   └─────────────┘    └─────────────┘    └─────────────────────────┘  │  │
│  │         │                   │                       ▲                │  │
│  │         │                   │                       │                │  │
│  └─────────│───────────────────│───────────────────────│────────────────┘  │
│            │                   │                       │                    │
│            ▼                   ▼                       │                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                           GAME CONTEXT                                │  │
│  │                                                                       │  │
│  │   cards[] ─────────────────────────────────────────────┐              │  │
│  │   flippedCards[] ───────────────────────────┐          │              │  │
│  │   matchedPairs ─────────────────────────────│──────────│──────────────│──│
│  │   gameStatus ───────────────────────────────│──────────│──────────────│  │
│  │   hintsLeft ────────────────────────────────│──────────│──────────────│  │
│  │                                             │          │              │  │
│  └─────────────────────────────────────────────│──────────│──────────────┘  │
│                                                │          │                  │
│            ┌───────────────────────────────────┘          │                  │
│            │                                              │                  │
│            ▼                                              ▼                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            GAMEBOARD                                  │  │
│  │                                                                       │  │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │   │  CARD   │ │  CARD   │ │  CARD   │ │  CARD   │ │  CARD   │ ...    │  │
│  │   │         │ │         │ │         │ │         │ │         │        │  │
│  │   │ onClick │ │ onClick │ │ onClick │ │ onClick │ │ onClick │        │  │
│  │   └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │  │
│  │        │           │           │           │           │              │  │
│  │        └───────────┴───────────┴───────────┴───────────┘              │  │
│  │                                │                                      │  │
│  └────────────────────────────────│──────────────────────────────────────┘  │
│                                   │                                          │
│                                   ▼                                          │
│                          ┌───────────────┐                                   │
│                          │  GAME LOGIC   │                                   │
│                          │               │                                   │
│                          │  flipCard()   │                                   │
│                          │  checkMatch() │                                   │
│                          │  updateState()│                                   │
│                          └───────────────┘                                   │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐         ┌──────────────────────────────┐  │
│  │ HELP BUTTON │  │MUSIC PLAYER │         │         OVERLAYS             │  │
│  │             │  │             │         │                              │  │
│  │  hintsLeft  │  │  isPlaying  │         │  ┌──────────┐ ┌──────────┐   │  │
│  │  onUseHint()│  │  volume     │         │  │   WIN    │ │   LOSE   │   │  │
│  │             │  │  toggle()   │         │  │  SCREEN  │ │  SCREEN  │   │  │
│  └─────────────┘  └─────────────┘         │  └──────────┘ └──────────┘   │  │
│                                           └──────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Interfaces (Props)

### Card Component
```javascript
{
  card: {
    id: string,
    emoji: string,
    isFlipped: boolean,
    isMatched: boolean
  },
  onClick: (cardId: string) => void,
  disabled: boolean
}
```

### Timer Component
```javascript
{
  initialTime: number,      // in seconds
  isRunning: boolean,
  onTimeUp: () => void,
  onTick: (timeLeft: number) => void
}
```

### ProgressBar Component
```javascript
{
  matchedPairs: number,
  totalPairs: number,
  showPercentage: boolean
}
```

### WinScreen Component
```javascript
{
  stats: {
    timeElapsed: number,
    hintsUsed: number,
    level: string,
    score: number
  },
  onPlayAgain: () => void,
  onChangeLevel: () => void
}
```

### LoseScreen Component
```javascript
{
  stats: {
    matchedPairs: number,
    totalPairs: number,
    level: string
  },
  onTryAgain: () => void,
  onChangeLevel: () => void
}
```

---

## Event Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Card
    participant GameBoard
    participant GameContext
    participant Timer
    participant Audio

    User->>Card: Click
    Card->>GameBoard: onCardClick(cardId)
    GameBoard->>GameContext: dispatch(FLIP_CARD)
    GameContext->>Audio: playFlipSound()
    
    alt Two cards flipped
        GameContext->>GameContext: checkMatch()
        
        alt Match found
            GameContext->>GameContext: dispatch(MATCH_FOUND)
            GameContext->>Audio: playMatchSound()
        else No match
            GameContext->>GameContext: setTimeout(flipBack, 1000)
        end
    end
    
    alt All pairs matched
        GameContext->>Timer: stop()
        GameContext->>Audio: playWinSound()
        GameContext->>GameContext: dispatch(GAME_WON)
    end
    
    Timer->>GameContext: onTimeUp()
    GameContext->>Audio: playLoseSound()
    GameContext->>GameContext: dispatch(GAME_LOST)
```
