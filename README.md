# HoopStats: Higher or Lower Trivia Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

An addictive, high-fidelity sports-trivia web app that tests a user's knowledge of NBA player statistics. Built entirely with vanilla web standards, the app displays two players side-by-side using a dynamic split-screen view, challenging the user to guess who holds the superior metric across multiple shifting dimensions (Points, Rebounds, and Assists).

---

## Performance & Architectural Highlights
**Zero-Dependency Engine:** Engineered entirely in native HTML5 / CSS3 / ES6+ JavaScript. Zero bloated frameworks, zero third-party package runtime overhead, and zero pre-compilers—proving performance optimization using core web APIs.

**Encapsulated OOP State Machine:** Designed around a robust, unified HigherOrLowerGame class instance that isolates application parameters, controls the game loop, mutates local tracking metrics, and drives structural layout mutations.

**Hardware-Accelerated 3D Transforms:** Utilizes CSS3 3D spatial properties (perspective, preserve-3d, and backface-visibility) to process fluid 60fps card flips. This keeps all structural elements light and layout-shift free during animations.

**Event Asynchronous Processing Lock:** Implemented an exact input-isolation guard variable (isProcessing) to programmatically discard structural click tracking during active keyframe transitions, mitigating double-guess calculation exploits.

**Session Telemetry Persistence:** Leverages the Web Storage API (localStorage) to serialize, store, and seamlessly fetch high-score data values across distinct user sessions.

## File Structure
The project utilizes a clean layout separation layout model:
- '/app.js/ - Encapsulated state matrix, array pointer handlers, and browser storage adapters
- '/index.html/ - Semantic DOM scaffolding, scoreboard structures, and modal windows
- '/style.css/' - Hardware-accelerated 3D transition layers, typography metrics, and theme matrices

## Technology Capabilities Matrix
**Semantic Interface** - HTML5 Document Structure, Dynamic Viewport Scaling, Layout Roles
**Animation UI/UX**	- CSS3 Grid & Flexbox, Perspective Transitions, State Feedback Fills
**Engine Mechanics** - Object-Oriented ES6 JavaScript Classes, Async Microtask Handlers, Mutating Arrays
**Local Memory** - Browser Storage API (localStorage), JSON Key Serialization

## License
Distibuted under the **MIT** License. See **License** for more information.

## 🕹️ Live Architecture Blueprint

```text
    +-------------------------------------------------------------+
    |                    [ CURRENT STREAK: 5 ]                    |
    |                 Who has a higher PPG?                       |
    +------------------------------+------------------------------+
    |                              |                              |
    |         LEBRON JAMES         |         LUKA DONCIC          |
    |            Lakers            |          Mavericks           |
    |                              |                              |
    |            [25.7]            |        [ HIGHER ▲ ]          |
    |                              |        [ LOWER  ▼ ]          |
    |                              |                              |
    +------------------------------+------------------------------+