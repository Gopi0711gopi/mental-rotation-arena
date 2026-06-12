# Mental Rotation Arena

A 3D interactive mental rotation game built with Three.js that challenges players to visualize and rotate 3D objects in their minds. Perfect for cognitive training and spatial reasoning improvement.

## 🎮 Overview

Mental Rotation Arena is an engaging 3D game that helps improve spatial visualization and mental rotation skills. Players must identify rotated versions of 3D objects against distractors, with varying difficulty levels and game modes.

## ✨ Key Features

### Game Features
- **3D Object Visualization** - Interactive 3D models that can be rotated
- **Multiple Game Modes**:
  - Classification - Identify matching rotations
  - Time Challenge - Race against the clock
  - Unlimited Mode - Practice at your own pace
  - Multiplayer - Compete with friends
- **Difficulty Levels** - Easy, Medium, Hard, Expert
- **Progressive Learning** - Difficulty increases with correct answers
- **Scoring System** - Points, multipliers, and achievements
- **Leaderboards** - Global and local rankings
- **Statistics** - Detailed performance metrics
- **Sound Effects** - Immersive audio feedback

### Visual Features
- **3D Graphics** - High-quality Three.js rendering
- **Smooth Animations** - Fluid 3D rotations and transitions
- **Lighting Effects** - Professional lighting setup
- **Materials & Textures** - Realistic object appearance
- **Responsive Design** - Works on desktop and tablets
- **Theme Options** - Light and dark modes

## 🛠 Tech Stack

**Frontend:**
- **Three.js** - 3D graphics library
- **JavaScript/TypeScript** - Programming language
- **HTML5 Canvas** - Rendering surface
- **WebGL** - Graphics API
- **Babel** - JavaScript transpiler
- **Webpack** - Module bundler

**Styling:**
- **CSS3** - Styling and animations
- **Tailwind CSS** - Utility-first CSS
- **SCSS** - CSS preprocessor

**Development:**
- **Vite** - Build tool and dev server
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

**Backend (Optional):**
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database for scores

## 📋 Prerequisites

- Node.js 16.x or higher
- npm 7.x or yarn 1.22.x
- Modern browser with WebGL support
- Minimum 4GB RAM recommended

## 🚀 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/Gopi0711gopi/mental-rotation-arena.git
cd mental-rotation-arena

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Configuration

`.env.local`:
```env
VITE_APP_NAME=Mental Rotation Arena
VITE_API_URL=http://localhost:3000
VITE_DEBUG=false
```

### Development

```bash
# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
mental-rotation-arena/
├── src/
│   ├── index.html              # HTML entry point
│   ├── main.js                 # Application entry
│   ├── game/
│   │   ├── Game.js            # Main game class
│   │   ├── scenes/            # Game scenes
│   │   │   ├── MainMenu.js
│   │   │   ├── GameScene.js
│   │   │   └── ResultsScene.js
│   │   ├── objects/           # 3D objects
│   │   │   ├── Cube.js
│   │   │   ├── Pyramid.js
│   │   │   └── Complex.js
│   │   ├── ui/                # UI components
│   │   │   ├── HUD.js
│   │   │   ├── Menu.js
│   │   │   └── Leaderboard.js
│   │   └── managers/          # Game managers
│   │       ├── SceneManager.js
│   │       ├── InputManager.js
│   │       └── ScoreManager.js
│   ├── graphics/
│   │   ├── renderer.js        # Three.js setup
│   │   ├── lighting.js        # Lighting setup
│   │   ├── camera.js          # Camera configuration
│   │   └── materials.js       # Material definitions
│   ├── utils/
│   │   ├── math.js            # Math utilities
│   │   ├── geometry.js        # Geometry utilities
│   │   └── helpers.js         # Helper functions
│   ├── styles/
│   │   ├── main.css
│   │   ├── menu.css
│   │   └── game.css
│   └── models/                # 3D model files
│       └── objects/
├── tests/
├── dist/                       # Build output
├── vite.config.js             # Vite configuration
├── package.json
└── README.md
```

## 🎮 Game Modes

### Classification Mode
- View a reference 3D object
- Choose from 4 rotated options
- Identify the correct match
- Score points for accuracy and speed

### Time Challenge Mode
- Complete as many puzzles as possible in 60 seconds
- Increasing difficulty with each correct answer
- Bonus points for streak multiplier

### Unlimited Mode
- No time limits or scoring pressure
- Perfect for practice and learning
- Adjustable difficulty

### Multiplayer Mode
- Compete with up to 4 players
- Real-time scoring
- Chat functionality
- Leaderboard rankings

## 🎯 Difficulty Levels

| Level | Rotation Angle | Time Limit | Objects |
|-------|----------------|------------|----------|
| Easy | 90°, 180° | 10s | Basic shapes |
| Medium | 0-180° | 8s | Complex shapes |
| Hard | 0-360° | 6s | Very complex |
| Expert | Multiple axes | 4s | Extreme complexity |

## 🕹️ Controls

### Keyboard
- **Arrow Keys** - Rotate object
- **Space** - Select option
- **1-4** - Quick select answer
- **ESC** - Pause/Menu
- **R** - Restart

### Mouse
- **Click & Drag** - Rotate object
- **Click Button** - Select option
- **Scroll** - Zoom in/out

### Gamepad
- **Analog Stick** - Rotate
- **Buttons** - Select option
- **Triggers** - Zoom

## 📊 Scoring System

```
Base Points = 10

Multipliers:
- Speed Bonus = 1 + (remaining_time / total_time)
- Accuracy Streak = 1 + (consecutive_correct / 10)
- Difficulty Multiplier = difficulty_level * 0.5

Final Score = Base Points * Speed * Accuracy * Difficulty
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📈 Performance Optimization

- **WebGL Optimization** - Efficient GPU usage
- **Geometry Caching** - Reuse geometries
- **Texture Optimization** - Compressed textures
- **Draw Call Minimization** - Batch rendering
- **Memory Management** - Proper cleanup

## 🔐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers with WebGL

## 🐛 Troubleshooting

### WebGL not supported
- Update your browser
- Check WebGL support at: https://webglreport.com/

### Low FPS/Performance
- Lower quality settings in options
- Close other browser tabs
- Update graphics drivers
- Try different browser

### Objects not rendering
- Clear browser cache
- Reload page (Ctrl+Shift+R)
- Check browser console for errors

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

### Self-hosted
```bash
npm run build
# Upload dist/ folder to web server
```

## 📚 3D Resources

- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Documentation](https://threejs.org/docs/)
- [WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [3D Model Libraries](https://sketchfab.com/)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📝 License

MIT License

## 👨‍💻 Author

**Gopi Parachuri** - [GitHub Profile](https://github.com/Gopi0711gopi)

---

**Last Updated:** June 2026
