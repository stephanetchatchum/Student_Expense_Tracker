# Student Finance Tracker

## Overview
A responsive, accessible single-page web app that helps students track daily expenses, categorize spending, and stay within a personal budget. Built with vanilla HTML, CSS, and JavaScript — no frameworks.

## Live Demo
🌐 https://stephanetchatchum.github.io/Student_Expense_Tracker/

## Demo Video
🎥 https://youtu.be/jvh13eeg-Pk

## Repository
📁 https://github.com/stephanetchatchum/Student_Expense_Tracker

## Theme
Student Finance Tracker

## Features
- Add, edit, and delete transactions with full regex validation
- Live regex search with match highlighting using `<mark>`
- Sort records by date, description, or amount
- Dashboard with total expenditure, transaction count, top category, budget cap indicator, and 7-day spending chart
- Import/Export JSON data with validation
- localStorage persistence across sessions
- Currency conversion settings (RWF base, USD, XAF)
- Mobile-first responsive design (360px, 768px, 1024px breakpoints)
- Full keyboard navigation and ARIA live regions
- Confirm before delete

## Regex Catalog
| Pattern | Purpose | Valid Example | Invalid Example |
|---|---|---|---|
| `/^\S(?:.*\S)?$/` | No leading/trailing spaces | "Lunch at cafeteria" | " Lunch" |
| `/^(0|[1-9]\d*)(\.\d{1,2})?$/` | Valid amount format | "12.50" | "007" |
| `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | Date YYYY-MM-DD | "2026-06-19" | "2026-13-40" |
| `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Category letters/hyphens | "Self-Care" | "Food123" |
| `/\b(\w+)\s+\1\b/i` | Duplicate word (back-reference) | — | "coffee coffee" |

## Keyboard Map
| Key | Action |
|---|---|
| Tab | Move forward between focusable elements |
| Shift + Tab | Move backwards |
| Enter | Submit form / activate button / follow link |
| First Tab on page | Activates skip-to-content link |

## Accessibility Notes
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- All inputs have properly bound `<label>` elements
- ARIA live regions: search results count, budget status, form success/error messages
- `role="status"` on status messages
- Visible focus indicators on all interactive elements (blue outline)
- Skip-to-content link as first focusable element
- Heading hierarchy: h1 → h2 → h3

## How to Run Tests
Open `tests.html` in your browser. Green checkmarks = pass, red = fail. Tests cover all 5 regex patterns with valid and invalid inputs.

## Setup
1. Clone the repo: `git clone https://github.com/stephanetchatchum/Student_Expense_Tracker`
2. Open `index.html` in any modern browser
3. No build tools or dependencies required

## Academic Integrity
This project was built individually by Stephane Tchatchum Chassem. All UI logic is original work.