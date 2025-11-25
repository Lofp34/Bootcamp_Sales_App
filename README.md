# Sales Flow App 🚀

A mobile-first "Copilote" application designed for sales professionals to streamline their daily workflow: **Prospection** (Hunting) and **Vente** (Closing).

> **Note**: This is NOT a CRM. It is an action-oriented tool focused on the "here and now", with local history tracking.

## ✨ Key Features

### 🎯 Module 1: Prospection Hub
Designed for high-intensity prospecting sessions.
- **Cold Call (Power Dialer)**:
  - Simulated dialer with one-click calling.
  - Instant qualification (RDV / Pas intéressé / Suivant).
  - Auto-saves call outcomes to history.
- **Réseautage (Networking)**:
  - Quick-add form for new contacts met in the field.
  - Voice note simulation.
- **LinkedIn**:
  - Daily checklist for social selling tasks.

### 🤝 Module 2: Sales Guide (Vente)
A structured digital playbook for sales meetings.
- **Start Modal**: Captures Client Name and Date context.
- **Interactive Stepper**: Guides you through 5 key steps:
  1.  **Prise de Contact**: Ice breakers & timing.
  2.  **Découverte**: Qualification questions & notes.
  3.  **Argumentation**: Key selling points.
  4.  **Objection**: Battlecards for common pushbacks.
  5.  **Closing**: Final status (Signé / RDV / Perdu).
- **Auto-Archiving**: Generates a meeting summary and saves it to history.

### 📊 Module 3: Suivi Hub (History)
Your personal activity log.
- **Centralized History**: View all Calls, Networking contacts, and Sales meetings in one place.
- **Smart Filters**: Filter by `[Tout]`, `[Appels]`, `[Ventes]`, or `[Réseau]`.
- **Data Persistence**: All data is saved locally in your browser (`localStorage`).

## 🛠️ Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules + Global CSS Variables (Theming)
- **Icons**: Native Emojis (for performance and simplicity)
- **Storage**: Browser LocalStorage (No backend required)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lofp34/Bootcamp_Sales_App.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Bootcamp_Sales_App
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173` (or the URL shown in your terminal).

## 📱 Mobile-First Design
This app is optimized for mobile usage:
- Large touch targets (44px+).
- Bottom-friendly navigation in sub-modules.
- `100dvh` layout to prevent scrolling issues on mobile browsers.

## 🔮 Roadmap (V3 Ideas)
- [ ] **Gamification**: Daily score based on actions.
- [ ] **Data Export**: Export history to CSV.
- [ ] **Edit History**: Ability to modify notes after saving.
- [ ] **Custom Scripts**: Allow users to edit their own cold call scripts.

---
*Built with ❤️ for the Sales Bootcamp.*
