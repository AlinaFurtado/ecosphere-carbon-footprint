# Code Quality & Styling Standards
## EcoSphere Carbon Footprint tracker

---

## 1. Codebase Architecture & Javascript Guidelines

### Style & Linting
* **Target Version**: ECMAScript 2022+ (Modern Client-Side Javascript)
* **Code Conventions**: Strict variables declaration (`const`/`let`, no `var`). Clean camelCase naming for variables and functions. UPPER_SNAKE_CASE for constant parameters.
* **Line Width**: Maximum 100 characters per line.

### Modular & Pure Functions
* **Pure Logic**: Core computation logic (like `calculateLocalFallback` and `getLocalFallbackInsights`) contains zero side effects (no DOM manipulation, no network calls, fully deterministic).
* **Deterministic Input mapping**: Inputs must default gracefully (`inputs.household_size || 1`) to ensure runtime stability and prevent divide-by-zero errors.
* **Dependency Direction**: UI events trigger state updates which in turn invoke rendering (`Event -> State change -> Render`).

### State Machine Integrity
* Central state structure (`DEFAULT_STATE` and `state` objects) are defined clearly.
* All state mutations are backed up to the persistent client storage (`localStorage`) in standard JSON string formats.
* Read operations from the persistent storage must catch exception broad categories (`try-catch`) to fallback onto default states safely without crashing the startup sequence.

---

## 2. Frontend Layout & Styling Guidelines

### CSS Conventions
* Vanilla CSS rules structured clearly.
* Clear modular animations (`fadeIn`, `popIn`) leveraging hardware-accelerated CSS properties (`transform`, `opacity`, `transition`) to ensure smooth 60fps frame rates.

### DOM Updates & Efficiency
* Access selectors caching and minimized repaint cycles.
* Direct property injection (e.g. `textContent`) is strictly preferred over `innerHTML` when inserting user or external text inputs to safeguard against Cross-Site Scripting (XSS).
* Layout structures follow fluid grids and flexible boxes (`flex`, `grid`) ensuring reflow compatibility down to `320px` viewports.
