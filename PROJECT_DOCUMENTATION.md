# GeoAuth Frontend - Comprehensive Project Documentation

**Project Name:** GeoAuth Frontend  
**Version:** 0.0.0  
**Type:** React Web Application  
**Build Tool:** Vite  
**Deployment:** Vercel  
**Last Updated:** February 6, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Architecture & Design](#architecture--design)
6. [API Integration](#api-integration)
7. [State Management](#state-management)
8. [File Structure Breakdown](#file-structure-breakdown)
9. [Key Components & Hooks](#key-components--hooks)
10. [Routing & Navigation](#routing--navigation)
11. [Authentication Flow](#authentication-flow)
12. [Styling & UI](#styling--ui)
13. [Development Setup](#development-setup)
14. [Build & Deployment](#build--deployment)
15. [Configuration Files](#configuration-files)
16. [Security Considerations](#security-considerations)
17. [Data Models](#data-models)
18. [API Endpoints Reference](#api-endpoints-reference)

---

## Project Overview

GeoAuth is a full-stack web application designed to provide **IP-based geolocation** with **user authentication**. The frontend is a React application built with Vite, styled with Tailwind CSS, and communicates with a Node.js/Express backend API.

### Purpose
- Allow users to log in securely using JWT authentication
- Display geolocation data for the logged-in user's IP address
- Enable users to search for geolocation data for arbitrary IP addresses
- Maintain a searchable history of IP lookups
- Display network information (ASN, AS Name, AS Domain) for IPs

### Key Objectives
- Provide a clean, intuitive user interface
- Ensure secure authentication and data handling
- Deliver fast, responsive performance using React Query
- Display comprehensive IP and network information
- Maintain comprehensive form validation and error handling

---

## Technology Stack

### Core Framework
- **React 19.2.0** - UI library for building interactive components
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **TypeScript 5.9.3** - Static typing for JavaScript

### Routing & State
- **React Router DOM 7.13.0** - Client-side routing and navigation
- **TanStack React Query 5.90.20** - Server state management and data fetching
- **React Hook Form 7.71.1** - Efficient form handling with validation

### UI & Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.18** - Vite plugin for Tailwind CSS
- **clsx 2.1.1** - Utility for conditional className strings

### HTTP & Data
- **Axios 1.13.4** - HTTP client for API requests
- **Validator 13.15.26** - String validation utilities

### Development Tools
- **ESLint 9.39.1** - Code linting and quality
- **TypeScript ESLint 8.46.4** - TypeScript support for ESLint
- **React Refresh Plugin 5.1.1** - Fast refresh during development
- **React Hooks ESLint Plugin 7.0.1** - Hook best practices linting

---

## Project Structure

```
geoauth-frontend/
├── public/                          # Static assets
├── src/
│   ├── api/                         # API layer
│   │   ├── auth.api.ts             # Authentication endpoints
│   │   ├── geo.api.ts              # Geolocation endpoints
│   │   ├── history.api.ts          # History endpoints
│   │   └── http.ts                 # HTTP client configuration
│   │
│   ├── app/                         # Application root
│   │   ├── App.tsx                 # Main app component
│   │   ├── App.css                 # App styles
│   │   ├── index.css               # Root styles
│   │   ├── main.tsx                # React DOM render entry
│   │   └── providers/              # Context providers
│   │       ├── AppProviders.tsx    # Main provider wrapper
│   │       ├── AuthProvider.tsx    # Authentication context
│   │       └── QueryProvider.tsx   # React Query provider
│   │
│   ├── routes/                      # Page/route components
│   │   ├── HomeRoute.tsx           # Home/dashboard page
│   │   ├── LoginRoute.tsx          # Login page
│   │   ├── HistoryRoute.tsx        # Search history page
│   │   └── RequireAuth.tsx         # Protected route wrapper
│   │
│   ├── components/                  # Reusable components
│   │   ├── layout/
│   │   │   ├── AppShell.tsx        # Main layout wrapper
│   │   │   └── Page.tsx            # Page container
│   │   └── ui/                     # UI primitives
│   │       ├── Button.tsx          # Button component
│   │       ├── Card.tsx            # Card component
│   │       ├── Input.tsx           # Input component
│   │       └── Spinner.tsx         # Loading spinner
│   │
│   ├── features/                    # Feature-specific modules
│   │   ├── auth/                   # Authentication feature
│   │   │   ├── auth.keys.ts       # React Query keys for auth
│   │   │   ├── auth.storage.ts    # Token storage utilities
│   │   │   ├── auth.types.ts      # Auth TypeScript types
│   │   │   ├── components/
│   │   │   │   └── loginForm.tsx  # Login form component
│   │   │   └── hooks/
│   │   │       ├── useLogin.ts    # Login mutation hook
│   │   │       ├── useLogout.ts   # Logout mutation hook
│   │   │       └── useMe.ts       # Current user query hook
│   │   │
│   │   ├── geo/                    # Geolocation feature
│   │   │   ├── geo.keys.ts        # React Query keys for geo
│   │   │   ├── geo.types.ts       # Geo TypeScript types
│   │   │   ├── components/
│   │   │   │   ├── GeoCard.tsx    # Geo data display card
│   │   │   │   └── GeoMap.tsx     # Geo status placeholder component
│   │   │   └── hooks/
│   │   │       ├── useGeoByIp.ts  # IP-based geolocation query hook
│   │   │       └── useSelfGeo.ts  # Self geolocation query hook
│   │   │
│   │   └── history/               # Search history feature
│   │       ├── history.keys.ts    # React Query keys for history
│   │       ├── history.types.ts   # History TypeScript types
│   │       ├── components/
│   │       │   ├── HistoryItem.tsx    # Single history item
│   │       │   ├── HistoryList.tsx    # History list component
│   │       │   └── IpSearchBar.tsx    # IP search input
│   │       └── hooks/
│   │           ├── useDeleteHistory.ts    # Delete history mutation
│   │           ├── useHistoryList.ts      # History query hook
│   │           └── useSearchIp.ts         # IP search mutation
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── env.ts                  # Environment variable helpers
│   │   ├── errors.ts               # Error handling utilities
│   │   ├── formatters.ts           # Data formatting utilities
│   │   └── validators.ts           # Input validation utilities
│   │
│   ├── types/                       # Global TypeScript types
│   │   └── api.ts                  # API response types
│   │
│   └── styles/                      # Global styles
│       └── index.css               # Tailwind imports
│
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json               # App TypeScript config
├── tsconfig.node.json              # Node TypeScript config
├── eslint.config.js                # ESLint configuration
├── README.md                        # Project README
├── FRONTEND-PLAN.md                # Implementation plan
└── PROJECT_DOCUMENTATION.md        # This file

```

---

## Core Features

### 1. User Authentication
- **Login Screen**: Email and password-based authentication
- **JWT Token Management**: Secure token storage and retrieval
- **Auto-redirect**: Automatic routing based on authentication state
- **Session Persistence**: Token persisted in localStorage
- **Logout Functionality**: Complete session cleanup

### 2. Geolocation Display
- **Self Geolocation**: Display current logged-in user's IP geolocation
- **IP Search**: Search geolocation for any IP address
- **Data Display**: Show IP, ASN, AS Name, AS Domain, country, continent, and country/continent codes
- **Clean Data**: Uses ipinfo API for reliable geolocation data
- **Fallback Handling**: Graceful degradation when geo data unavailable

### 3. Search History
- **Auto-save**: Searches automatically saved to history
- **History List**: View all previous IP searches with timestamps
- **Quick Re-display**: Click history item to redisplay geo data
- **Bulk Delete**: Delete multiple history records at once
- **Persistence**: History stored server-side, fetched on page load

### 4. Form Validation
- **Email Validation**: RFC-compliant email format checking
- **Required Fields**: Mandatory input validation
- **IP Format Validation**: Valid IPv4/IPv6 address format
- **Error Display**: Clear error messages for validation failures
- **Real-time Feedback**: Instant validation as user types
- **Example Credentials**: Login form displays test credentials for development

### 5. Responsive Design
- **Mobile Responsive**: Works on desktop, tablet, mobile
- **Tailwind CSS**: Utility-first responsive design
- **Touch-friendly**: Appropriate button/input sizing for touch devices
- **Accessible**: Semantic HTML, ARIA attributes where needed

---

## Architecture & Design

### Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Routes & Pages                            │ │
│  │  ┌──────────────┐          ┌──────────────┐           │ │
│  │  │ LoginRoute   │          │ HomeRoute    │           │ │
│  │  └──────────────┘          └──────────────┘           │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Components Layer                          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │ │
│  │  │LoginForm │  │ GeoCard  │  │ HistoryList        │ │ │
│  │  └──────────┘  │ GeoMap   │  │ IpSearchBar        │ │ │
│  │                │ Button   │  └──────────────────────┘ │ │
│  │                │ Card     │                           │ │
│  │                │ Input    │                           │ │
│  │                └──────────┘                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Hooks & State Management                  │ │
│  │  ┌──────────────┐  ┌──────────────┐                  │ │
│  │  │ useLogin     │  │ useSelfGeo   │                  │ │
│  │  │ useMe        │  │ useHistory   │                  │ │
│  │  │ useSearchIp  │  │useDeleteHist │                  │ │
│  │  └──────────────┘  └──────────────┘                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Layer (HTTP Client)                   │ │
│  │  ┌────────────────────────────────────────────────────┤ │
│  │  │ auth.api.ts  │  geo.api.ts  │  history.api.ts    │ │
│  │  └────────────────────────────────────────────────────┤ │
│  │                                                        │ │
│  │  Base: Axios HTTP Client with JWT Authorization      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
            │
            │ HTTPS (JWT Bearer Token)
            │
┌─────────────────────────────────────────────────────────────┐
│            GeoAuth Backend API (Node.js/Express)            │
│                                                               │
│  POST   /api/login          - Authenticate user            │
│  GET    /api/me             - Get current user              │
│  GET    /api/geo/self       - Get user's geolocation      │
│  GET    /api/geo/:ip        - Get geolocation for IP      │
│  POST   /api/history/search - Search IP & save to history │
│  GET    /api/history        - Fetch user's search history │
│  DELETE /api/history        - Delete history records       │
└─────────────────────────────────────────────────────────────┘
            │
            │
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database (Supabase)                  │
│                                                               │
│  ├── users table                                             │
│  ├── search_history table                                    │
│  └── session/cache tables                                    │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

1. **Provider Pattern**: AuthProvider and QueryProvider wrap application
2. **Custom Hooks**: Encapsulate data fetching and business logic
3. **Feature-Based Organization**: Code organized by business features
4. **Separation of Concerns**: UI, hooks, and API layers are separate
5. **Component Composition**: Reusable UI components built from primitives
6. **Error Boundaries**: Graceful error handling throughout

---

## API Integration

### Base Configuration

The frontend communicates with the backend via HTTP(S) using Axios. Configuration is centralized in `src/api/http.ts`:

```typescript
// Typical HTTP client setup with:
// - Base URL from environment variables
// - JWT Bearer token in Authorization header
// - Default request/response handling
// - Error interceptors for token expiration
```

### API Endpoints Consumed

#### Authentication
- `POST /api/login` - User login
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, user: User }`
  
- `GET /api/me` - Get current user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ id, email, createdAt }`

#### Geolocation
- `GET /api/geo/self` - Get user's geolocation
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ geo: { ip, asn, as_name, as_domain, country, country_code, continent, continent_code } }`
  
- `GET /api/geo/:ip` - Get geolocation for IP
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ geo: { ip, asn, as_name, as_domain, country, country_code, continent, continent_code } }`

#### History
- `GET /api/history?limit=100` - Fetch search history
  - Headers: `Authorization: Bearer <token>`
  - Response: `[{ id, ip, geo, createdAt }, ...]`
  
- `POST /api/history/search` - Search IP and save
  - Headers: `Authorization: Bearer <token>`
  - Request: `{ ip: string }`
  - Response: `{ id, ip, geo, createdAt }`
  
- `DELETE /api/history` - Delete history records
  - Headers: `Authorization: Bearer <token>`
  - Request: `{ ids: string[] }`
  - Response: `{ success: boolean }`

---

## State Management

### Authentication State
- **Stored In**: AuthProvider context
- **Persistence**: localStorage (JWT token)
- **State Variables**:
  - `token`: JWT authentication token
  - `user`: Current user object
  - `isLoading`: Auth check in progress
  - `error`: Authentication errors

### Geolocation State
- **Managed By**: React Query hooks
- **Query Keys**:
  - `['geo', 'self']` - User's self geolocation
  - `['geo', 'search', ipAddress]` - Searched IP geolocation
- **State Variables**:
  - `selfGeo`: Current logged-in user's geo data
  - `activeGeo`: Currently displayed geo (self or searched)

### History State
- **Managed By**: React Query hooks
- **Query Keys**:
  - `['history']` - User's search history
  - `['history', 'selected']` - Selected for deletion
- **State Variables**:
  - `historyItems`: Array of search records
  - `selectedIds`: Selected items for bulk delete

### Server State Management
- **Tool**: TanStack React Query (React Query)
- **Advantages**:
  - Automatic caching and deduplication
  - Built-in request deduplication
  - Automatic background refetching
  - Optimistic updates
  - Pagination/infinite query support
  - Loading and error states built-in

---

## File Structure Breakdown

### `/src/api/` - API Layer

**Purpose**: All HTTP requests and API communication

- **http.ts**: Axios client initialization
  - Base URL configuration
  - Authorization header injection
  - Error handling and interceptors
  - Request/response transformers

- **auth.api.ts**: Authentication endpoints
  - `loginUser(email, password)` - POST /api/login
  - `getCurrentUser()` - GET /api/me

- **geo.api.ts**: Geolocation endpoints
  - `getSelfGeo()` - GET /api/geo/self
  - `getGeoForIp(ip)` - GET /api/geo/:ip

- **history.api.ts**: Search history endpoints
  - `getHistory(limit)` - GET /api/history
  - `searchIp(ip)` - POST /api/history/search
  - `deleteHistory(ids)` - DELETE /api/history

### `/src/app/` - Application Root

**Purpose**: Root component and providers

- **main.tsx**: React DOM entry point
  - Renders App component into #root element
  - Wraps with StrictMode for development checks

- **App.tsx**: Main application component
  - Router setup and route definitions
  - Provider wrapping (Auth, Query)
  - App-level error boundaries

- **providers/AppProviders.tsx**: Combined provider wrapper
  - Wraps QueryProvider and AuthProvider
  - Provides unified provider composition
  - Simplifies App.tsx structure

- **providers/AuthProvider.tsx**: Authentication context
  - `AuthContext` definition
  - `useAuth()` hook
  - Token management logic
  - Auto-login from localStorage

- **providers/QueryProvider.tsx**: React Query setup
  - QueryClientProvider configuration
  - Query client defaults
  - Retry policies
  - Cache invalidation strategies

### `/src/routes/` - Page Components

**Purpose**: Full page components for each route

- **RequireAuth.tsx**: Route protection component
  - Wrapper for protecting routes requiring authentication
  - Checks auth status via `useAuth()` context
  - Redirects to /login if not authenticated
  - Shows loading state during auth check

- **LoginRoute.tsx**: /login page
  - Login form integration
  - Redirect logic if already authenticated
  - Error display and handling

- **HomeRoute.tsx**: /home page
  - Geo card display
  - Map component
  - Search bar integration
  - History list display
  - Logout button

- **HistoryRoute.tsx**: /history page
  - Protected route using RequireAuth wrapper
  - Full search history display
  - IP search integration
  - Bulk delete functionality
  - User navigation and logout

- **RequireAuth.tsx**: Route protection component
  - Wrapper for protected routes
  - Checks authentication status
  - Redirects unauthenticated users to /login
  - Displays loading state during auth check

### `/src/components/` - Reusable Components

#### `/components/layout/`
- **AppShell.tsx**: Main layout wrapper
  - Header/navigation bar
  - Sidebar (if applicable)
  - Footer
  - Grid/flex layout structure

- **Page.tsx**: Page container
  - Max-width constraint
  - Padding and spacing
  - Section organization

#### `/components/ui/`
- **Button.tsx**: Reusable button component
  - Variants: primary, secondary, danger
  - Sizes: sm, md, lg
  - States: disabled, loading
  - Tailwind-based styling

- **Card.tsx**: Card container component
  - Shadow and border styling
  - Padding and spacing
  - Responsive design

- **Input.tsx**: Form input component
  - Text, email, password types
  - Validation styling
  - Error display
  - Label support

- **Spinner.tsx**: Loading indicator
  - Animated spinner animation
  - Size variants
  - Overlay support

### `/src/features/` - Feature Modules

Each feature is self-contained with its own types, components, and hooks.

#### `/features/auth/` - Authentication Feature
- **auth.keys.ts**: React Query keys
  - Query key factory for auth queries
  - Enables proper cache invalidation

- **auth.storage.ts**: Token persistence
  - `getToken()` - Retrieve from localStorage
  - `setToken(token)` - Store token
  - `clearToken()` - Remove token

- **auth.types.ts**: TypeScript types
  - `User` interface
  - `LoginRequest` interface
  - `LoginResponse` interface
  - `AuthContextType` interface

- **components/loginForm.tsx**: Login form component
  - Email input
  - Password input
  - Submit button
  - Error messages
  - Form validation

- **hooks/useLogin.ts**: Login mutation hook
  - Wraps `auth.api.loginUser()`
  - Handles token storage
  - Handles navigation
  - Error handling

- **hooks/useLogout.ts**: Logout mutation hook
  - Clears token from storage
  - Resets auth context
  - Handles navigation to login
  - State cleanup

- **hooks/useMe.ts**: Current user query hook
  - Queries `GET /api/me`
  - Validates token validity
  - Enables auto-logout on 401

#### `/features/geo/` - Geolocation Feature
- **geo.keys.ts**: React Query keys
  - Query key factory for geo queries
  - Enables proper cache invalidation

- **geo.types.ts**: TypeScript types
  - `GeoSnapshot` interface with ASN and continental data
  - `GeoSource` enum
  - `GeoResponse` interface

- **components/GeoCard.tsx**: Geo data display
  - IP address display
  - Country and continent
  - ASN, AS Name, AS Domain
  - Country Code and Continent Code
  - Loading and error states
  - Responsive grid layout

- **components/GeoMap.tsx**: Geo placeholder
  - Simplified placeholder component
  - No longer renders interactive map
  - Displays status message for location data
  - Loading and error state handling

- **hooks/useSelfGeo.ts**: Self geolocation query
  - Auto-fetch on component mount
  - Caching by React Query
  - Error handling

- **hooks/useGeoByIp.ts**: IP-based geolocation query
  - Query geolocation for any IP address
  - Accepts IP parameter
  - Used by search functionality
  - Caching and error handling

- **pages/HomePage.tsx**: Home/dashboard page
  - Displays user's self geolocation
  - IP search bar integration
  - Geo data card and map display
  - Search history list preview
  - Logout button and user info

- **pages/HistoryPage.tsx**: Search history/dedicated history page
  - Full search history display
  - IP search bar integration
  - Click items to redisplay geo data
  - Bulk delete functionality
  - Logout button

#### `/features/history/` - Search History Feature
- **history.keys.ts**: React Query keys
  - Query key factory for history queries
  - Enables proper cache invalidation

- **history.types.ts**: TypeScript types
  - `HistoryItem` interface
  - `HistoryResponse` interface
  - `DeleteHistoryRequest` interface

- **components/IpSearchBar.tsx**: Search input
  - IP input field
  - Search button
  - IP format validation
  - Error feedback
  - Loading state

- **components/HistoryItem.tsx**: Single history entry
  - IP display
  - Timestamp
  - Country and continent subtitle
  - Delete button
  - Responsive layout
  - Accessible aria-labels

- **components/HistoryList.tsx**: History list container
  - Maps history items
  - Scroll/pagination
  - Empty state
  - Loading state
  - Toolbar for bulk delete

- **hooks/useHistoryList.ts**: History query hook
  - `GET /api/history` query
  - Caching and refetching
  - Pagination support

- **hooks/useSearchIp.ts**: IP search mutation
  - `POST /api/history/search` mutation
  - Automatic history invalidation
  - Error handling
  - Loading state

- **hooks/useDeleteHistory.ts**: Delete mutation
  - `DELETE /api/history` mutation
  - Optimistic updates
  - History refetch after delete
  - Bulk delete support

### `/src/lib/` - Utilities

**Purpose**: Shared utility functions

- **env.ts**: Environment variable helpers
  - `getApiBaseUrl()` - Returns backend API URL
  - Environment variable parsing
  - Fallback defaults

- **errors.ts**: Error handling utilities
  - Custom error classes
  - Error message extraction
  - HTTP error mapping
  - User-friendly error messages

- **formatters.ts**: Data formatting utilities
  - `formatDate(date)` - Format timestamp
  - `formatIp(ip)` - IP formatting
  - `formatLocation(city, region, country)` - Location string
  - `formatTimezone(tz)` - Timezone display

- **validators.ts**: Input validation utilities
  - `isValidEmail(email)` - Email validation
  - `isValidIp(ip)` - IP validation (IPv4/IPv6)
  - `isRequiredField(value)` - Required field check

### `/src/types/` - Global Types

- **api.ts**: API response/request types
  - `ApiResponse<T>` - Generic response wrapper
  - `ApiError` - Error response type
  - `PaginatedResponse<T>` - Pagination wrapper
  - All feature-specific types (imported from features)

### `/src/styles/` - Global Styles

- **index.css**: Global stylesheet
  - Tailwind CSS imports
  - Global utility classes
  - CSS custom properties
  - Font definitions
  - Root styling

---

## Key Components & Hooks

### Core Components

#### AppShell Component
**Location**: `/src/components/layout/AppShell.tsx`  
**Props**: `{ children: ReactNode }`  
**Responsibility**: Main layout wrapper for all pages

```typescript
// Provides:
// - Header with logo and user info
// - Navigation menu
// - Logout button
// - Main content area
// - Footer (optional)
// - Responsive layout (sidebar on desktop, hamburger on mobile)
```

#### LoginForm Component
**Location**: `/src/features/auth/components/loginForm.tsx`  
**Props**: None (uses hook)  
**Responsibility**: User authentication UI

```typescript
// Features:
// - Email input with validation
// - Password input with show/hide toggle
// - Submit button with loading state
// - Error message display
// - Link to signup (if applicable)
// - Form validation on submit
```

#### GeoCard Component
**Location**: `/src/features/geo/components/GeoCard.tsx`  
**Props**: `{ geo: GeoSnapshot | null, title?: string, loading?: boolean, errorMessage?: string | null, className?: string }`  
**Responsibility**: Display geolocation information

```typescript
// Displays:
// - IP Address
// - Country and Continent
// - ASN (Autonomous System Number)
// - AS Name and AS Domain
// - Country Code and Continent Code
// - Loading, error, and empty states
// - Responsive grid layout
```

#### GeoMap Component
**Location**: `/src/features/geo/components/GeoMap.tsx`  
**Props**: `{ geo: GeoSnapshot | null, title?: string, loading?: boolean, errorMessage?: string | null, heightClassName?: string, className?: string }`  
**Responsibility**: Geolocation status display

```typescript
// Features:
// - Displays placeholder message
// - Loading state handling
// - Error state display
// - Empty state for unavailable locations
// - Responsive sizing with configurable height
```

#### HomePage Component
**Location**: `/src/features/geo/pages/HomePage.tsx`  
**Props**: None (uses hooks and context)  
**Responsibility**: Home/dashboard page for authenticated users

```typescript
// Features:
// - Displays user's self geolocation
// - Interactive map with location pin
// - IP search bar integration
// - Geo data card display (self or searched)
// - Search history list
// - Click history items to redisplay geo
// - Bulk delete history functionality
// - User info and logout button
// - Responsive layout for all screen sizes
```

#### HistoryList Component
**Location**: `/src/features/history/components/HistoryList.tsx`  
**Props**: None (uses hooks)  
**Responsibility**: Display search history

```typescript
// Features:
// - List of history items
// - Click to redisplay geo
// - Checkbox for bulk delete
// - Toolbar for delete action
// - Loading and empty states
// - Timestamp display
```

### Custom Hooks

#### useAuth Hook
**Location**: `AuthProvider.tsx`  
**Returns**: `{ token, user, isLoading, error, logout }`  
**Purpose**: Access authentication state

```typescript
// Usage:
const { token, user, logout } = useAuth();

// Provides authentication context to any component
// Used to protect routes and display user info
```

#### useLogin Hook
**Location**: `/src/features/auth/hooks/useLogin.ts`  
**Returns**: `{ mutate, isLoading, error }`  
**Purpose**: Handle login mutation

```typescript
// Usage:
const { mutate: login, isLoading, error } = useLogin();
login({ email, password });

// Handles API call, token storage, and navigation
```

#### useMe Hook
**Location**: `/src/features/auth/hooks/useMe.ts`  
**Returns**: `{ data: User, isLoading, error }`  
**Purpose**: Query current user

```typescript
// Usage:
const { data: user, isLoading } = useMe();

// Auto-fetch on mount
// Used in AuthProvider for token validation
// Refetch on window focus
```

#### useSelfGeo Hook
**Location**: `/src/features/geo/hooks/useSelfGeo.ts`  
**Returns**: `{ data: GeoData, isLoading, error }`  
**Purpose**: Query user's own geolocation

```typescript
// Usage:
const { data: selfGeo, isLoading } = useSelfGeo();

// Auto-fetch on component mount
// Automatic caching by React Query
// Refetch on request
```

#### useGeoByIp Hook
**Location**: `/src/features/geo/hooks/useGeoByIp.ts`  
**Returns**: `{ data: GeoData, isLoading, error }`  
**Purpose**: Query geolocation for a specific IP address

```typescript
// Usage:
const { data: geoData, isLoading } = useGeoByIp(ipAddress);

// Queries /api/geo/:ip endpoint
// Accepts IP parameter
// Automatic caching by React Query
// Error handling for invalid IPs
// Used by IP search functionality
```

#### useHistoryList Hook
**Location**: `/src/features/history/hooks/useHistoryList.ts`  
**Returns**: `{ data: HistoryItem[], isLoading, error }`  
**Purpose**: Query search history

```typescript
// Usage:
const { data: history, isLoading } = useHistoryList({ limit: 100 });

// Fetches on mount
// Supports pagination
// Auto-invalidation after search
```

#### useSearchIp Hook
**Location**: `/src/features/history/hooks/useSearchIp.ts`  
**Returns**: `{ mutate, isLoading, error, data }`  
**Purpose**: Search IP and save to history

```typescript
// Usage:
const { mutate: search, isLoading } = useSearchIp();
search(ipAddress);

// Validates IP format
// Makes API request
// Invalidates history query on success
// Returns geo data
```

#### useDeleteHistory Hook
**Location**: `/src/features/history/hooks/useDeleteHistory.ts`  
**Returns**: `{ mutate, isLoading, error }`  
**Purpose**: Delete history records

```typescript
// Usage:
const { mutate: deleteRecords } = useDeleteHistory();
deleteRecords([id1, id2]);

// Bulk delete support
// Optimistic updates possible
// Auto-refetch history after success
```

---

## Routing & Navigation

### Route Structure

```
/
├── /login              (Public route)
│   ├── Redirects to /home if authenticated
│   └── Contains login form
│
├── /home               (Protected route)
│   ├── Route renders HomePage component
│   ├── Requires valid JWT token
│   ├── Redirects to /login if not authenticated
│   └── Contains:
│       ├── Geo data display (self)
│       ├── Search bar for IP lookup
│       ├── Active geo display (self or searched)
│       ├── Map visualization
│       ├── Search history list
│       └── Logout button
│
└── /history            (Protected route)
    ├── Route renders HistoryPage component
    ├── Requires valid JWT token
    ├── Redirects to /login if not authenticated
    └── Contains:
        ├── Search history list
        ├── IP search bar for lookup
        ├── Click history to view geo data
        ├── Bulk delete functionality
        └── Logout button
```

### Route Guards

**Protected Routes**: Routes that require authentication
- Implemented using `RequireAuth` component wrapper
- Checks `useAuth()` context for valid token
- Redirects to `/login` if no valid token
- Applied to: `/home`, `/history`

**Public Routes**: Routes accessible without authentication
- `/login` - redirects to `/home` if already authenticated

### Navigation Flow

```
App Load
  ↓
Check localStorage for JWT token
  ├─→ Token found
  │    ↓
  │    Call GET /api/me to validate
  │    ├─→ Valid (200)
  │    │    ↓
  │    │    Set auth context
  │    │    ↓
  │    │    Redirect to /home
  │    │
  │    └─→ Invalid (401)
  │         ↓
  │         Clear token from localStorage
  │         ↓
  │         Redirect to /login
  │
  └─→ No token found
       ↓
       Redirect to /login
```

---

## Authentication Flow

### Login Process

1. **User enters credentials**
   - Email and password on LoginRoute
   - Form validation checks required fields and email format

2. **Submit login**
   - `useLogin()` mutation triggered
   - Makes `POST /api/login` request with credentials

3. **Backend response**
   - Success: Returns JWT token and user object
   - Failure: Returns 401/400 error with message

4. **Token storage**
   - Token stored in localStorage via `auth.storage.setToken()`
   - Token added to HTTP Authorization header

5. **Navigation**
   - Redirect to `/home` route
   - Home component loads and fetches geo/history data

### Token Validation

- **On App Load**: `useMe()` hook validates token
- **On Each Request**: Token included in `Authorization: Bearer <token>` header
- **On 401 Response**: Token cleared, user redirected to `/login`

### Logout Process

1. **User clicks logout button**
2. **Clear token**: `auth.storage.clearToken()`
3. **Clear state**: Auth context reset
4. **Clear queries**: React Query cache cleared
5. **Redirect**: Navigate to `/login`

---

## Styling & UI

### Design System

#### Colors
- **Primary**: Tailwind blue (`bg-blue-600`)
- **Secondary**: Tailwind gray (`bg-gray-100`)
- **Success**: Tailwind green (`bg-green-600`)
- **Error**: Tailwind red (`bg-red-600`)
- **Warning**: Tailwind yellow (`bg-yellow-600`)

#### Typography
- **Font Family**: System font stack (Arial, Helvetica, etc.)
- **Headings**: 
  - `h1`: 32px (text-3xl), bold
  - `h2`: 24px (text-2xl), bold
  - `h3`: 20px (text-xl), semibold
- **Body**: 16px (text-base), regular
- **Small**: 14px (text-sm), regular

#### Spacing
- Uses Tailwind spacing scale (4px, 8px, 12px, 16px, etc.)
- Consistent padding: p-4 (16px)
- Consistent margins: m-4 (16px)

#### Components
- **Buttons**: Rounded corners (rounded-lg), padding, hover effects
- **Cards**: White background, subtle shadow, border-radius
- **Inputs**: Border on all sides, focus ring, placeholder text
- **Spinners**: Animated rotation, centered

### Responsive Design

- **Mobile First**: Base styles for mobile, desktop enhancements
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

- **Layout Strategies**:
  - Single column on mobile
  - Two columns on tablet (md)
  - Three+ columns on desktop (lg)

### Tailwind CSS Integration

- **Configured via**: `@tailwindcss/vite` plugin
- **Imports**: Global imports in `src/styles/index.css`
- **Usage**: Utility classes throughout components
- **Benefits**:
  - No CSS-in-JS overhead
  - Type-safe with TypeScript
  - Fast builds with Vite

---

## Development Setup

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 3+
- Git

### Initial Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/geoauth-frontend.git
   cd geoauth-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **Start dev server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Visit `http://localhost:5173`

### Development Commands

- **`npm run dev`** - Start Vite dev server with hot reload
- **`npm run build`** - Build for production (TypeScript + Vite)
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview production build locally

### Environment Variables

**Frontend (.env.local)**
```env
# API Base URL (backend server)
VITE_API_BASE_URL=http://localhost:3000

# Optional: Feature flags
VITE_ENABLE_MAP=true
VITE_ENABLE_HISTORY_DELETE=true
```

---

## Build & Deployment

### Production Build

1. **Build process**
   ```bash
   npm run build
   ```
   - Runs TypeScript compiler check: `tsc -b`
   - Bundles with Vite optimizer
   - Output in `dist/` directory

2. **Build output**
   ```
   dist/
   ├── index.html
   ├── assets/
   │   ├── main-HASH.js
   │   ├── main-HASH.css
   │   └── chunk-HASH.js
   └── vite.svg
   ```

3. **Build optimizations**
   - Code splitting for lazy-loaded routes
   - CSS minification
   - JavaScript minification and obfuscation
   - Asset hashing for cache busting

### Deployment to Vercel

1. **Connect repository**
   - Push code to GitHub
   - Connect Vercel to GitHub repo

2. **Configure build settings**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: Add `VITE_API_BASE_URL`

3. **Deploy**
   - Vercel auto-deploys on push to main branch
   - Automatic SSL/TLS certificate
   - CDN distribution
   - Automatic rollbacks available

### Alternative Deployments

- **Netlify**: Similar to Vercel, drag-and-drop or Git integration
- **AWS Amplify**: AWS-native deployment with CI/CD
- **Self-hosted**: Any web server (nginx, Apache) serving `dist/` directory

---

## Configuration Files

### vite.config.ts
**Purpose**: Vite build and dev server configuration

```typescript
- React plugin for JSX/TSX support
- Tailwind CSS plugin for utility styling
- Dev server port: 5173 (default)
- HMR (Hot Module Replacement) enabled by default
```

### tsconfig.json
**Purpose**: References TypeScript configurations

```json
- Composite project setup
- References: tsconfig.app.json, tsconfig.node.json
- Enables incremental builds
```

### tsconfig.app.json
**Purpose**: Application TypeScript compiler options

```json
- Target: ES2022 (modern JavaScript features)
- Module: ESNext (tree-shaking friendly)
- JSX: react-jsx (automatic JSX runtime)
- Strict mode: All strict checks enabled
- Bundler module resolution
```

### tsconfig.node.json
**Purpose**: Build tool TypeScript options

```json
- Used by Vite and build scripts
- Target: ES2023
- Same strict rules as app config
```

### eslint.config.js
**Purpose**: Code linting and quality checking

```javascript
- Extends ESLint recommended configs
- TypeScript ESLint support
- React Hooks specific rules
- Ignores: dist/ directory
```

### package.json
**Purpose**: Project metadata and dependencies

```json
- Name: geoauth-frontend
- Version: 0.0.0 (Semantic versioning)
- Type: module (ES modules)
- Scripts: dev, build, lint, preview
- Dependencies: React, Vite, Tailwind, etc.
- DevDependencies: ESLint, TypeScript, etc.
```

---

## Security Considerations

### Authentication Security

1. **JWT Token Storage**
   - Stored in localStorage (client-side)
   - Not in HTTP-only cookies (for CSRF protection trade-off)
   - Alternative: Use HTTP-only cookies if backend supports

2. **Token Transmission**
   - Always sent via HTTPS
   - Included in `Authorization: Bearer <token>` header
   - Never exposed in URL parameters

3. **Token Expiration**
   - Backend should set token expiration (e.g., 1 hour)
   - Implement refresh tokens for long-lived sessions
   - Auto-logout on 401 responses

### Form Validation

1. **Client-side Validation**
   - Prevents unnecessary API calls
   - Improves user experience
   - Email format validation
   - Required field checks
   - IP address format validation

2. **Server-side Validation** (Responsibility of backend)
   - Always validate all inputs
   - Enforce stricter rules
   - Rate limiting on login endpoint
   - Password strength requirements

### CORS & Headers

1. **CORS Configuration**
   - Backend should specify allowed origins
   - Credentials included in requests with `withCredentials: true`
   - Only necessary methods allowed (GET, POST, DELETE)

2. **Security Headers**
   - Content-Security-Policy (CSP)
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - Referrer-Policy: no-referrer

### API Security

1. **Rate Limiting**
   - Backend implements rate limiting
   - Prevents brute-force attacks
   - Especially on `/api/login` endpoint

2. **Input Sanitization**
   - All user inputs validated
   - No arbitrary code execution
   - SQL injection prevention (server-side)
   - XSS prevention with React's built-in escaping

### Environment Variables

1. **Sensitive Data**
   - API keys never hardcoded
   - API endpoints in environment variables
   - Backend URL configurable
   - Never commit `.env` files

2. **Public vs. Secret**
   - VITE_ prefix = public (visible in client code)
   - No secrets should be prefixed with VITE_

---

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  createdAt: string;
  // passwordHash not sent to frontend
}
```

### GeoSnapshot Model
```typescript
interface GeoSnapshot {
  ip: string;                    // IP address (e.g., "8.8.8.8")
  
  asn: string | null;            // Autonomous System Number (e.g., "AS15169")
  as_name: string | null;        // AS Name (e.g., "Google LLC")
  as_domain: string | null;      // AS Domain (e.g., "google.com")
  
  country: string | null;        // Country name (e.g., "United States")
  country_code: string | null;   // ISO 2-letter code (e.g., "US")
  
  continent: string | null;      // Continent name (e.g., "North America")
  continent_code: string | null; // Continent code (e.g., "NA")
}
```

### SearchHistory Model
```typescript
interface SearchHistory {
  id: string;
  userId: string;
  ip: string;
  geo: GeoSnapshot;              // Snapshot of geo data at search time
  createdAt: string;
}
```

### Authentication Response Model
```typescript
interface LoginResponse {
  token: string;                 // JWT token
  user: User;                    // Current user object
}
```

### Error Response Model
```typescript
interface ApiError {
  message: string;
  code: string;                  // Error code (e.g., "INVALID_CREDENTIALS")
  statusCode: number;            // HTTP status code
  details?: Record<string, any>; // Additional error details
}
```

---

## API Endpoints Reference

### Authentication Endpoints

#### POST /api/login
Authenticates user with email/password

**Request**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response** (200 OK)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error** (401)
```json
{
  "message": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

#### GET /api/me
Retrieves current authenticated user

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response** (200 OK)
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error** (401)
```json
{
  "message": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

### Geolocation Endpoints

#### GET /api/geo/self
Gets geolocation data for authenticated user's IP

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response** (200 OK)
```json
{
  "geo": {
    "ip": "203.0.113.42",
    "asn": "AS12345",
    "as_name": "ISP Name",
    "as_domain": "isp.com",
    "country": "United States",
    "country_code": "US",
    "continent": "North America",
    "continent_code": "NA"
  }
}
```

#### GET /api/geo/:ip
Gets geolocation data for specified IP address

**Parameters**
- `ip` (path): IP address to lookup (IPv4 or IPv6)

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response** (200 OK)
```json
{
  "geo": {
    "ip": "8.8.8.8",
    "asn": "AS15169",
    "as_name": "Google LLC",
    "as_domain": "google.com",
    "country": "United States",
    "country_code": "US",
    "continent": "North America",
    "continent_code": "NA"
  }
}
```

**Error** (400)
```json
{
  "message": "Invalid IP address",
  "code": "INVALID_IP"
}
```

### History Endpoints

#### POST /api/history/search
Searches IP and saves to user's history

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request**
```json
{
  "ip": "8.8.8.8"
}
```

**Response** (201 Created)
```json
{
  "id": "history-456",
  "userId": "user-123",
  "ip": "8.8.8.8",
  "geo": {
    "ip": "8.8.8.8",
    "asn": "AS15169",
    "as_name": "Google LLC",
    "as_domain": "google.com",
    "country": "United States",
    "country_code": "US",
    "continent": "North America",
    "continent_code": "NA"
  },
  "createdAt": "2024-02-05T15:30:00Z"
}
```

#### GET /api/history
Retrieves user's search history

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters**
- `limit` (optional): Maximum number of records (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response** (200 OK)
```json
[
  {
    "id": "history-456",
    "userId": "user-123",
    "ip": "8.8.8.8",
    "geo": {
      "ip": "8.8.8.8",
      "asn": "AS15169",
      "as_name": "Google LLC",
      "as_domain": "google.com",
      "country": "United States",
      "country_code": "US",
      "continent": "North America",
      "continent_code": "NA"
    },
    "createdAt": "2024-02-05T15:30:00Z"
  },
  ...
]
```

#### DELETE /api/history
Deletes specified history records

**Headers**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request**
```json
{
  "ids": ["history-456", "history-789"]
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "deletedCount": 2
}
```

**Error** (400)
```json
{
  "message": "Invalid request",
  "code": "INVALID_REQUEST"
}
```

---

## Summary

This GeoAuth frontend application is a modern, feature-rich React web app that provides:

✅ Secure user authentication with JWT tokens  
✅ IP-based geolocation lookup and display  
✅ Network information (ASN, AS Name, AS Domain) visualization  
✅ Search history management with bulk delete  
✅ Responsive, accessible UI with Tailwind CSS  
✅ Type-safe TypeScript throughout  
✅ Efficient data fetching with React Query  
✅ Form validation with React Hook Form  
✅ ESLint code quality checks  
✅ Production-ready Vite build setup  

**Key Technologies**: React 19, Vite 7, TypeScript 5.9, Tailwind CSS 4, React Query 5, Axios, React Router 7

**Deployment**: Vercel (recommended), Netlify, AWS Amplify, or any static host

The project follows modern React best practices, maintains separation of concerns, and provides a solid foundation for future enhancements and feature additions.
