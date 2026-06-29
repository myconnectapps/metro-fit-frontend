# Metro Fit — Frontend

Vite + React frontend for the Metro Fit wellness application.

## Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:3001`

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

App runs on `http://localhost:5173`.
API calls are proxied to `http://localhost:3001` via Vite.

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/wellness-profile` | WellnessProfilePage | Wellness Profile Configuration Setup |
| `*` | → Redirects to `/wellness-profile` | |

## Running Tests

```bash
npm test
```

## Features (MF-11: STORY-102)

- Dark slate card form (`#1E293B` background, `#334155` border)
- Real-time per-field validation (positive numbers only)
- Emerald green (`#10B981`) checkmarks on valid fields
- Indigo (`#6366F1`) Save button activates only when all 4 fields are valid
- Responsive 2-column grid → single-column on mobile
- Accessible: `aria-label`, `aria-invalid`, `role="alert"`, keyboard focus indicators
- Success toast notification after save
