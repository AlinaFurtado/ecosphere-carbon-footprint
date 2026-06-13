# EcoSphere | Carbon Footprint Tracker

EcoSphere is a gamified, interactive, and client-side single-page application (SPA) designed to help individuals understand, track, and reduce their daily and monthly carbon footprints. The application visualizes ecological impact through an interactive isometric digital island that grows and adapts as you make green choices.

---

## 🚀 Chosen Vertical

**Individual Carbon Footprint Tracking, Gamification, and AI Assistance**
- **Core Challenge**: Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights.
- **Eco-Guardian Persona**: Translating daily habits (diet, travel, waste, and energy consumption) into visual, rewarding progress.

---

## 🧠 Approach and Logic

The application is built on a modular, lightweight, client-side architecture:
1. **Fidelity-First Theme Extension**: Rather than raw styling overrides, Tailwind CSS is configured dynamically at runtime using design tokens matching the **Stitch design system specifications** (custom palette, font scales, spacing, border radiuses, and shadow effects).
2. **Unified Navigation & Layout**: Connects four main interactive interfaces (World, Dashboard, Actions, and Community) through a responsive tabbed SPA interface.
3. **State Machine Logic**: All metrics (EcoPoints, daily/monthly emission logs, checklist tasks, and unlocked digital island features) are managed in a centralized JavaScript state machine (`app.js`).
4. **Persistent Serialization**: The application state is synced automatically to the browser's `localStorage` on every user interaction, ensuring progress is saved between browser launches.
5. **AI Eco-Assistant**: A floating panel running a simulated natural language processing (NLP) engine that parses user logs, completes checklist actions, and answers basic climate inquiries.

---

## 🛠️ How the Solution Works

- **Visual Dashboard**: Displays a live circular meter showing the user's monthly footprint against their limit. Category cards (Transport, Food, Home, Shopping) update their breakdown bars automatically as items are checked off or logged.
- **Gamified Digital Island**: Toggle options (Transport, Diet, Energy, Rewild, Waste, Water) to visually place components (like trees, solar panels, and bikes) onto the central isometric floating island. 
- **Checklist Integration**: Checking off "Quick Wins" dynamically subtracts the task's carbon impact from your category footprint, adds it to your saved totals, and updates the AI Eco-Assistant history.
- **Natural Language Parsing (AI)**:
  - *"log 8km bike commute"* -> parses distance, subtracts transport emissions (`3.2kg`), awards points, and visually deploys the bike onto the island.
  - *"log oat milk"* -> parses dietary choice, decreases food footprint, awards points, and deploys the diet plot.
  - *"how to reduce home footprint"* -> returns actionable, customized energy-saving advice.

---

## 📋 Assumptions Made

To build a practical, real-world prototype, the following emission factor guidelines were used:
- **Travel Emissions**: Biking/Walking/Transit saves approx. `0.4kg CO2e` per km/mile compared to taking a medium diesel SUV.
- **Dietary Choices**: Swapping plant-based products (like oat milk or vegan meals) saves approx. `0.4kg CO2e` per occurrence.
- **Standby Power**: Unplugging inactive chargers saves approx. `0.4kg CO2e` in standby currents.
- **Shower Energy**: Shortening warm water usage by 2 minutes saves approx. `1.2kg CO2e` monthly in water-heating gas/electricity.
- **Daily Target**: Assumed a target of `5.0kg CO2e` daily savings to achieve a 100% reach milestone on your floating island.
- **Milestones**: A target score of `500` EcoPoints unlocks the Level 2 milestone reward, signifying high engagement.

---

## 🖥️ Local Verification

1. Clone or download this repository.
2. Open [index.html](index.html) directly in any web browser.
3. Click the tabs, check off tasks, and chat with the AI Assistant to log emission data.
