# GeoAuth Frontend Implementation Plan

**Technology Choice:** React (Vite)  
**Backend:** Existing GeoAuth API (Node.js + Express)   

This document hard-bounds the **frontend scope, requirements, and delivery pipeline** for the GeoAuth sample web app, aligned with the provided assessment instructions.

---

## 1. Assumptions (Scope Locks)

- Frontend will be **React Web (Vite)**, not React Native or Flutter.
- Frontend **must not call ipinfo.io directly**.  
  All geolocation requests go through the backend API.
- Authentication is **JWT-based**, token stored client-side.
- Backend already exposes:
  - `/api/login`
  - `/api/me`
  - `/api/geo/self`
  - `/api/geo/:ip`
  - `/api/history/search`
  - `/api/history`
  - `DELETE /api/history`
- Styling is free-form but must be **clean and presentable**, not raw HTML.

---

## 2. Application Flow (Frontend Perspective)

### App Initialization
1. App loads
2. Check for stored JWT token
3. If no token → redirect to `/login`
4. If token exists:
   - Call `GET /api/me`
   - Success → `/home`
   - Failure → clear token → `/login`

---

## 3. Routing & Pages

### Required Routes
- `/login`
- `/home`

### Route Guards
- `/login`
  - If already authenticated → redirect `/home`
- `/home`
  - If unauthenticated or token invalid → redirect `/login`

---

## 4. Authentication Requirements

### Login Screen
**UI**
- Email input
- Password input
- Submit button
- Error feedback area

**Validation**
- Required fields
- Valid email format
- Display backend errors (401, 400)

**Behavior**
- `POST /api/login`
- On success:
  - Store token in `localStorage`
  - Redirect to `/home`

### Logout (Required)
- Clear token
- Reset app state
- Redirect to `/login`

---

## 5. Home Screen Requirements

### A. Logged-in User Geolocation (Auto-load)
On entering `/home`:
- Call `GET /api/geo/self`
- Display:
  - IP address
  - City, region, country
  - Organization
  - Timezone
  - Latitude / longitude (if available)
- If `geo: null`:
  - Show graceful fallback message

---

### B. IP Search
**UI**
- IP address input
- Search button

**Validation**
- Frontend IP format check
- Handle backend `INVALID_IP` error

**Behavior**
- Call `POST /api/history/search` with `{ ip }`
- Display returned geo snapshot
- Automatically persist search in history

---

### C. Clear Search
- Button: “Clear”
- Revert display back to **logged-in user geo**
- No refetch required (reuse stored self snapshot)

---

### D. Search History (Required)
- Load on home screen mount:
  - `GET /api/history?limit=100`
- Display list:
  - IP address
  - Timestamp
  - Optional: city/country subtitle

---

## 6. Optional Features 

### O1. Click History → Redisplay Geo
- Clicking a history row:
  - Instantly display stored `geo` snapshot
  - No API call required

---

### O2. Bulk Delete History
- Checkbox per history item
- Toolbar appears when ≥1 selected
- Action:
  - `DELETE /api/history` with `{ ids: string[] }`
- UI updates immediately after success

---

### O3. Map + Pin (Big Plus)
- Display map when coordinates exist
- Use **Leaflet + OpenStreetMap**
- Single pin only
- Update pin when active geo changes
- Hide map if `lat/lng` is null

---

## 7. State Management (Hard-Bounded)

### Required Client State
- `auth.token`
- `auth.user`
- `geo.self`
- `geo.active`
- `history.items`
- `history.selectedIds` (optional feature)

### Data Fetching Options
- Option A: TanStack React Query (recommended)
- Option B: Native `fetch` / `axios` + `useEffect`

No Redux required.

---

## 8. API Contract (Frontend Must Follow)

### Base URL
- Configured via `.env`
```env
VITE_API_BASE_URL=https://geoauth-backend.onrender.com
