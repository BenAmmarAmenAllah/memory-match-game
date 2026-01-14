# 🌐 Future API Design

## Overview
Future backend integration for persistent features.

## Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
POST /api/auth/logout    - Logout user
GET  /api/auth/me        - Get current user
```

### High Scores
```
GET  /api/scores              - Get leaderboard
GET  /api/scores/:userId      - Get user scores
POST /api/scores              - Submit score
```

### Levels
```
GET  /api/levels              - Get all levels
GET  /api/levels/daily        - Get daily challenge
```

### User Stats
```
GET  /api/stats/:userId       - Get user statistics
PUT  /api/stats/:userId       - Update statistics
```

## Request/Response Examples

### Submit Score
```javascript
// Request
POST /api/scores
{
  "level": "medium",
  "timeElapsed": 45,
  "hintsUsed": 1,
  "score": 850
}

// Response
{
  "id": "score-123",
  "rank": 15,
  "isPersonalBest": true
}
```

### Get Leaderboard
```javascript
// Response
{
  "leaderboard": [
    { "rank": 1, "username": "player1", "score": 1200 },
    { "rank": 2, "username": "player2", "score": 1150 }
  ]
}
```

## Tech Stack Options
- **Node.js/Express** - JavaScript ecosystem
- **Python/FastAPI** - Fast, modern API
- **Database**: MongoDB or PostgreSQL
- **Auth**: Firebase or JWT
