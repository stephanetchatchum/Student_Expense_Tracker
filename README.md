# Student Finance Tracker

## Overview
A responsive, accessible single-page web app that helps students track daily expenses, categorize spending, and stay within a personal budget.

## Live Demo
https://stephanetchatchum.github.io/Student_Expense_Tracker/

## Theme
Student Finance Tracker

## Features
- Add, edit, and delete transactions with full validation
- Live regex search with match highlighting
- Sort by date, description, or amount
- Dashboard with total expenditure, transaction count, top category, budget cap indicator, and 7-day spending chart
- Import/Export JSON data
- localStorage persistence across sessions
- Currency conversion settings (RWF, USD, XAF)
- Mobile-first responsive design (360px, 768px, 1024px breakpoints)
- Full keyboard navigation and ARIA live regions

## Regex Catalog
| Pattern | Purpose | Example Match |
|---|---|---|
| `/^\S(?:.*\S)?$/` | No leading/trailing spaces | "Lunch" ✓, " Lunch" ✗ |
| `/^(0|[1-9]\d*)(\.\d{1,2})?$/` | Valid amount | "12.50" ✓, "007" ✗ |
| `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | Date format | "2026-06-19" ✓ |
| `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Category format | "Self-Care" ✓, "Food123" ✗ |
| `/\b(\w+)\s+\1\b/i` | Duplicate word (back-reference) | "coffee coffee" ✗ |

## Keyboard Map
| Key | Action |
|---|---|
| Tab | Move between focusable elements |
| Enter | Submit form / activate button |
| Shift+Tab | Move backwards |
| Skip link (first Tab) | Jump to main content |

## Accessibility Notes
- Semantic HTML: header, nav, main, section, footer
- All inputs have bound labels
- ARIA live regions announce search results and budget status
- Visible focus indicators on all interactive elements
- Skip-to-content link

## How to Run Tests
Open `tests.html` in your browser to see regex validation test results.

## Setup
Clone the repo and open `index.html` in a browser. No build tools needed.