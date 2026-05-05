# Poondurai Kaadai Admin Portal — Project Documentation

## Overview

**Poondurai Kaadai Admin** is a React-based admin dashboard for managing a temple website. It provides tools for content management, e-services (donations, archanai, abhishekam bookings), gallery, blog, comments moderation, contact messages, and donation configuration.

---

## Application Flows

### 1. App Initialization Flow

```
index.html loads
    → main.jsx mounts React root
    → App.jsx renders (BrowserRouter + AuthProvider)
    → AuthContext uses Firebase onAuthStateChanged
    → If Firebase user + admin doc exists → isAuthenticated=true, user set
    → If no user or not admin → isAuthenticated=false
    → Routes render (Suspense with lazy-loaded pages)
```

### 2. Login Flow

```
User visits /login
    → Login.jsx renders form
    → User enters email + password
    → onSubmit → login(email, password) from AuthContext
    → Firebase signInWithEmailAndPassword
    → If success + admin doc exists at admin/{uid}:
        → setIsAuthenticated(true), setUser({ uid, email, name, role })
        → Navigate to "/" (Dashboard)
    → If invalid or not admin → setFormError('root', { message })
```

### 3. Protected Route Flow

```
User navigates to any route except /login
    → MainLayout wraps route (Outlet)
    → MainLayout checks isAuthenticated
    → If false → <Navigate to="/login" replace />
    → If true → Renders Sidebar + Topbar + <Outlet /> (page content)
```

### 4. Gallery Upload Flow (Image)

```
User clicks "Upload Media" → Modal opens
    → User selects Image type, category, title
    → User picks file (image/*)
    → handleFileChange → ObjectURL created
    → ImageCropper opens (crop/rotate/flip)
    → User clicks "Apply Crop" → toBlob('image/webp')
    → handleCropComplete → convertToWebP() → optimized File
    → onSubmit → new item added to items state
    → Modal closes, DataTable shows new row
```

### 5. E-Service Approval Flow (e.g. Donations)

```
Admin views Donations page
    → DataTable shows pending items
    → Admin clicks "Send Email" (Approve)
    → handleApproval(id, true)
    → Simulated delay (800ms) — placeholder for API call
    → alert() — placeholder for email confirmation
    → setItems updates status to 'Approved'
```

### 6. Data Export Flow

```
User clicks Export on DataTable (Donations, Archanai, Abhishekam, Contact)
    → handleExport() called
    → exportToExcel(processedData, exportFileName)
    → xlsx creates worksheet from JSON
    → File downloaded as {fileName}_{date}.xlsx
```

---

## Purpose of Each File

### Root / Config

| File | Purpose |
|------|---------|
| `index.html` | HTML shell; mounts React via `#root`; loads `main.jsx` |
| `package.json` | Dependencies, scripts (dev, build, preview, lint) |
| `vite.config.js` | Vite config: React plugin, Tailwind plugin |
| `eslint.config.js` | ESLint rules for JSX, React Hooks, React Refresh |

### Entry & Core

| File | Purpose |
|------|---------|
| `src/main.jsx` | React entry: creates root, renders `<App />`, imports `index.css` |
| `src/App.jsx` | Root: BrowserRouter, AuthProvider, Routes; lazy-loads all pages; defines route tree |
| `src/index.css` | Tailwind imports, theme vars (primary, fonts), base styles, scrollbar |
| `src/App.css` | *Unused* — leftover Vite template styles |

### Context

| File | Purpose |
|------|---------|
| `src/context/AuthContext.jsx` | Auth state (isAuthenticated, user, loading); login/logout via Firebase Auth; admin check via Firestore admin/{uid} |

### Layouts

| File | Purpose |
|------|---------|
| `src/layouts/MainLayout.jsx` | Protected layout: Sidebar + Topbar + scrollable main area with `<Outlet />`; redirects to /login if not authenticated |

### Components

| File | Purpose |
|------|---------|
| `src/components/Sidebar.jsx` | Collapsible nav: main nav, E-Services submenu, bottom nav; logo; active state |
| `src/components/Topbar.jsx` | Header: menu toggle (mobile), title, notifications, user info, logout |
| `src/components/DataTable.jsx` | Reusable table: search, filters, sort, pagination, optional Excel export |
| `src/components/Modal.jsx` | Overlay modal with title, close, scrollable body; configurable width |
| `src/components/ImageCropper.jsx` | Crop tool: rotate, flip, zoom, aspect ratios; outputs WebP blob |
| `src/components/MediaPreview.jsx` | Full-screen preview for image, video, or YouTube embed |

### Pages

| File | Purpose |
|------|---------|
| `src/pages/Login.jsx` | Login form; validates credentials via AuthContext; redirects if already logged in |
| `src/pages/Dashboard.jsx` | Overview: stat cards, recent donations, pending tasks (mock data) |
| `src/pages/Gallery.jsx` | Media CRUD: upload (image/video/YouTube), DataTable, ImageCropper, MediaPreview |
| `src/pages/Blog.jsx` | Blog CRUD: post form with SEO, featured image, media links |
| `src/pages/Comments.jsx` | Comment moderation: approve/reject; DataTable with status filter |
| `src/pages/Contact.jsx` | Contact messages: view in modal, mark read, reply/delete (UI) |
| `src/pages/DonationSettings.jsx` | Bank details + UPI + QR code upload form |
| `src/pages/eservices/Donations.jsx` | Donation approvals: approve/reject, send email (mock) |
| `src/pages/eservices/Archanai.jsx` | Archanai bookings: approve/reject, confirm time |
| `src/pages/eservices/Abhishekam.jsx` | Abhishekam bookings: approve/reject, confirm time |

### Utils

| File | Purpose |
|------|---------|
| `src/utils/dateUtils.js` | `formatDate`, `formatDateTime` — dd-mm-yyyy formats |
| `src/utils/imageUtils.js` | `convertToWebP` — Canvas-based image optimization (max 2MB) |
| `src/utils/exportToExcel.js` | `exportToExcel` — JSON → xlsx file download |

### Assets

| File | Purpose |
|------|---------|
| `src/assets/images/index.js` | Exports logo image for Login, Sidebar |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2 |
| **Build Tool** | Vite 7.3 |
| **Routing** | React Router DOM 7.13 |
| **Styling** | Tailwind CSS 4.2 |
| **Forms** | React Hook Form 7.71 |
| **Icons** | Lucide React |
| **Charts** | Recharts *(installed but unused)* |
| **Select** | React Select |
| **Image Cropping** | react-cropper |
| **Excel Export** | xlsx (SheetJS) |

---

## Project Structure

```
Poondurai_kaadai_admin/
├── index.html                 # HTML entry
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── eslint.config.js           # ESLint rules
├── src/
│   ├── main.jsx               # Entry point
│   ├── App.jsx                # Root component & routing
│   ├── index.css              # Global styles & Tailwind theme
│   ├── App.css                # App-specific CSS
│   │
│   ├── assets/
│   │   └── images/
│   │       └── index.js       # Image exports (logo)
│   │
│   ├── context/
│   │   └── AuthContext.jsx    # Auth state & login/logout
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx    # Sidebar + Topbar + Outlet
│   │
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Topbar.jsx         # Header with user & logout
│   │   ├── DataTable.jsx      # Reusable table (search, filter, sort, export)
│   │   ├── Modal.jsx          # Reusable modal dialog
│   │   ├── ImageCropper.jsx   # Image crop/edit tool
│   │   └── MediaPreview.jsx    # Full-screen image/video preview
│   │
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── Dashboard.jsx      # Overview & stats
│   │   ├── Gallery.jsx        # Media management (images, videos, YouTube)
│   │   ├── Blog.jsx           # Blog posts with SEO
│   │   ├── Comments.jsx       # Comment moderation
│   │   ├── Contact.jsx        # Contact messages
│   │   ├── DonationSettings.jsx # Bank & UPI config
│   │   └── eservices/
│   │       ├── Donations.jsx  # Donation approvals
│   │       ├── Archanai.jsx   # Archanai bookings
│   │       └── Abhishekam.jsx # Abhishekam bookings
│   │
│   └── utils/
│       ├── dateUtils.js       # formatDate, formatDateTime
│       ├── imageUtils.js      # convertToWebP (Canvas API)
│       └── exportToExcel.js   # xlsx export helper
│
└── mcps/                      # MCP server configs (Cursor)
```

---

## Routing

| Path | Component | Description |
|------|-----------|-------------|
| `/login` | Login | Public login page |
| `/` | Dashboard | Protected — overview |
| `/gallery` | Gallery | Media management |
| `/blog` | Blog | Blog posts |
| `/comments` | Comments | Comment moderation |
| `/e-services/donation` | Donations | Donation approvals |
| `/e-services/archanai` | Archanai | Archanai bookings |
| `/e-services/abhishekam` | Abhishekam | Abhishekam bookings |
| `/contact` | Contact | Contact messages |
| `/donation-settings` | DonationSettings | Bank & UPI config |

All routes except `/login` are protected and require authentication. Unauthenticated users are redirected to `/login`.

---

## Authentication

- **Provider:** `AuthContext` wraps the app and provides `isAuthenticated`, `user`, `login`, `logout`, `loading`.
- **Backend:** Firebase Auth (signInWithEmailAndPassword, onAuthStateChanged, signOut).
- **Admin check:** Firestore document at `admin/{uid}` must exist for access; otherwise user is signed out.
- **Protected routes:** `MainLayout` checks `isAuthenticated` and redirects to `/login` if not authenticated.

---

## Key Features

### Dashboard
- Stats cards: Total Donations, Gallery Items, New Comments, Pending Approvals
- Recent Donations list
- Pending Tasks (donations, comments)

### Gallery
- Upload images (with crop & WebP conversion), videos, or YouTube links
- Categories: Architecture, Festivals, Rituals
- Media types: Image, Video Upload, YouTube Video
- DataTable with search, filter, sort
- ImageCropper for crop/rotate/flip before upload

### Blog
- Create posts with title, author, content
- Featured image (WebP conversion)
- Video link, external link
- SEO: SEO title, keywords, meta description
- Status: Published / Draft

### Comments
- Approve / Reject comments
- Filter by status (Approved, Pending, Rejected)

### E-Services
- **Donations:** Approve/Reject, send confirmation email (mock)
- **Archanai:** Approve/Reject bookings, confirm time
- **Abhishekam:** Approve/Reject bookings, confirm time
- All use DataTable with export to Excel

### Contact
- View messages (modal)
- Mark as Read on view
- Reply, Delete actions (UI only)

### Donation Settings
- Bank details: Bank name, account holder, account number, IFSC, branch
- UPI ID
- QR code image upload (WebP optimization)

---

## Components

### DataTable
Reusable table with:
- Search
- Multi-column filters (dropdown)
- Sortable columns
- Pagination
- Optional Excel export

### Modal
Reusable modal with title, close button, configurable `maxWidth`.

### ImageCropper
- Rotate, flip, zoom
- Aspect ratios: Free, 1:1, 16:9, 4:3
- Output: WebP blob

### MediaPreview
Full-screen preview for images, uploaded videos, and YouTube embeds.

---

## Utilities

### dateUtils.js
- `formatDate(dateStr)` → `dd-mm-yyyy`
- `formatDateTime(dateStr)` → `dd-mm-yyyy hh:mm`

### imageUtils.js
- `convertToWebP(file, maxSizeBytes)` — Converts images to WebP (max 2MB default) using Canvas API

### exportToExcel.js
- `exportToExcel(data, fileName)` — Exports JSON data to `.xlsx` with date suffix

---

## Styling & Theme

- **Primary:** `#800000` (maroon)
- **Primary Light:** `#A52A2A`
- **Secondary:** `#D4AF37` (gold)
- **Background:** `#FAF5EE` (cream)
- **Fonts:** Inter (sans), Cinzel (serif for headings)
- Custom scrollbar (gold accent)

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Data & Backend

Currently all data is **mock/local state** (useState). There is no API integration. Pages are structured so backend endpoints can be added later for:
- Gallery CRUD
- Blog CRUD
- Comments moderation
- Donations/Archanai/Abhishekam approvals
- Contact messages
- Donation settings

---

## Improvement Suggestions

### High Priority

| # | Suggestion | Reason | Status |
|---|------------|--------|--------|
| 1 | **Remove unused dependencies** | `recharts` removed; `react-hot-toast` added. | Done |
| 2 | **Remove or use App.css** | `App.css` is not imported anywhere; contains default Vite template styles. Delete or integrate. | Pending |
| 3 | **Replace mock auth with real API** | Replace hardcoded credentials with JWT from backend; validate token on refresh. | Pending |
| 4 | **Add API layer** | Create `src/services/api.js` or `src/api/` folder with fetch/axios calls for CRUD. | Pending |

### Medium Priority

| # | Suggestion | Reason | Status |
|---|------------|--------|--------|
| 5 | **Add loading & error states** | `LoadingState` and `ErrorState` components added for future API use. | Done |
| 6 | **Centralize constants** | `src/constants/index.js` created with all shared options. | Done |
| 7 | **Add toast notifications** | `react-hot-toast` integrated; alerts replaced across app. | Done |
| 8 | **Implement Blog edit** | Edit flow wired: Edit opens modal with prefilled data, Update saves. | Done |
| 9 | **Implement Contact reply** | Reply button exists but no email/mailto integration. | Pending |

### Low Priority / Nice to Have

| # | Suggestion | Reason | Status |
|---|------------|--------|--------|
| 10 | **Add environment variables** | `.env.example` created; `.env` added to `.gitignore`. | Done |
| 11 | **Add TypeScript** | Add types for props, API responses, state shapes. | Pending |
| 12 | **Add unit tests** | Test utils (dateUtils, imageUtils, exportToExcel), AuthContext. | Pending |
| 13 | **Use Recharts or remove** | recharts removed from dependencies. | Done |
| 14 | **Add 404 page** | `NotFound` page with "Go to Dashboard" (auth) / "Go to Login" (not auth). | Done |
| 15 | **Add confirmation dialogs** | `ConfirmDialog` component; `window.confirm` replaced in Gallery, Blog, Contact. | Done |

### Code Quality

| # | Suggestion | Reason |
|---|------------|--------|
| 16 | **Extract E-Service shared logic** | Donations, Archanai, Abhishekam share similar structure; create `EServiceTable` or reuse. |
| 17 | **Add PropTypes or TypeScript** | Document component props for DataTable, Modal, etc. |
| 18 | **Add error boundaries** | Wrap route groups in ErrorBoundary to catch crashes gracefully. |

---

## File Count Summary

| Type | Count |
|------|-------|
| Pages | 10 |
| Components | 6 |
| Layouts | 1 |
| Utils | 3 |
| Context | 1 |

---

## Quick Reference: Data Flow Between Components

```
AuthContext (global)
    ├── Login → sets token, user
    ├── MainLayout → reads isAuthenticated
    └── Topbar → reads user, calls logout

MainLayout
    ├── Sidebar → NavLinks, no shared state
    ├── Topbar → user, logout
    └── Outlet → renders current page (Dashboard, Gallery, etc.)

Pages using DataTable
    ├── Pass: data, columns, filterOptions, searchPlaceholder
    ├── DataTable: filters/sorts locally, calls exportToExcel
    └── No parent-child state lift for table data

Gallery / Blog
    ├── Modal → form state (react-hook-form)
    ├── ImageCropper → receives src, returns blob via onCrop
    └── MediaPreview → receives media object, displays full-screen
```

---

*Generated from project codebase analysis — Poondurai Kaadai Admin Portal*
