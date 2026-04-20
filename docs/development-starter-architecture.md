# Development Starter Architecture

## 1. Project Definition

**Project name**
AI-Based Disaster Resource Allocation and Community Help System

**Project goal**
Build a college-level MERN application that helps manage disaster-related requests, resources, verification, allocation, and AI-assisted prioritization.

**Primary product outcome**
A working web app with strong presentation value, clean role-based workflows, and scalable architecture for future expansion.

## 2. Recommended Development Approach

Use a two-app structure:

- `client` for the React frontend
- `server` for the Node/Express backend

This is the cleanest structure for a college MERN project and is easier to explain during implementation and viva.

## 3. Monorepo Layout

```txt
aryan-disasters-ai/
  client/
  server/
  docs/
    development-starter-architecture.md
```

## 4. Frontend Starter Architecture

```txt
client/
  public/
  src/
    app/
      router.jsx
      providers.jsx
      store.js
    assets/
    components/
      common/
      layout/
      ui/
      charts/
      forms/
    features/
      auth/
      dashboard/
      disasters/
      requests/
      resources/
      allocations/
      volunteers/
      notifications/
      ai-insights/
      profile/
    hooks/
    lib/
      api.js
      constants.js
      formatters.js
      helpers.js
    pages/
      public/
      admin/
      donor/
      beneficiary/
      volunteer/
    styles/
      globals.css
      theme.css
    main.jsx
```

### Frontend rules

- Keep `pages` for route-level screens
- Keep `features` for domain logic and reusable domain components
- Keep `components/ui` for generic reusable UI pieces
- Keep API calls centralized in feature services or `lib/api.js`
- Use one dashboard shell and swap role-specific navigation/items

## 5. Backend Starter Architecture

```txt
server/
  src/
    config/
      db.js
      env.js
    modules/
      auth/
        auth.controller.js
        auth.service.js
        auth.routes.js
        auth.validation.js
      users/
        user.model.js
        user.controller.js
        user.service.js
        user.routes.js
      disasters/
        disaster.model.js
        disaster.controller.js
        disaster.service.js
        disaster.routes.js
      requests/
        request.model.js
        request.controller.js
        request.service.js
        request.routes.js
        request.validation.js
      resources/
        resource.model.js
        resource.controller.js
        resource.service.js
        resource.routes.js
      allocations/
        allocation.model.js
        allocation.controller.js
        allocation.service.js
        allocation.routes.js
      volunteers/
        volunteer-task.model.js
        volunteer.controller.js
        volunteer.service.js
        volunteer.routes.js
      dashboard/
        dashboard.controller.js
        dashboard.service.js
        dashboard.routes.js
      notifications/
        notification.model.js
        notification.controller.js
        notification.service.js
        notification.routes.js
      ai/
        ai.controller.js
        ai.service.js
        ai.routes.js
      analytics/
        analytics.service.js
    middleware/
      auth.middleware.js
      role.middleware.js
      error.middleware.js
      validate.middleware.js
    utils/
      api-response.js
      priority-score.js
      allocation-engine.js
      logger.js
    app.js
    server.js
```

### Backend rules

- Each domain should own its model, controller, service, and route file
- Keep business logic inside `service` files, not controllers
- Put reusable decision logic like scoring and matching inside `utils`
- Keep AI integrations isolated inside `modules/ai`
- Keep future-ready analytics separate from core CRUD

## 6. Core User Roles

Use these roles from day one:

- `admin`
- `donor`
- `beneficiary`
- `volunteer`

### Role responsibilities

`admin`
- create and manage disaster events
- verify requests and resources
- review AI suggestions
- approve allocations
- monitor dashboard

`beneficiary`
- create help requests
- view request status
- receive updates

`donor`
- create resource offers
- manage available inventory
- track where donated resources are allocated

`volunteer`
- view assigned tasks
- update delivery/progress status

## 7. Core Domain Modules

### 7.1 Auth

Responsibilities:
- register
- login
- token handling
- role-based access

Starter endpoints:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### 7.2 Users

Responsibilities:
- profile management
- admin verification
- user listing for dashboard/admin use

Starter endpoints:
- `GET /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `PATCH /api/users/:id/verify`

### 7.3 Disasters

Responsibilities:
- manage disaster campaigns or incidents
- support event-scoped requests/resources

Starter fields:
- title
- type
- description
- region
- status
- severity
- createdBy

Starter endpoints:
- `POST /api/disasters`
- `GET /api/disasters`
- `GET /api/disasters/:id`
- `PATCH /api/disasters/:id`

### 7.4 Requests

Responsibilities:
- allow beneficiaries to request help
- support admin verification
- store AI priority

Starter fields:
- beneficiaryId
- disasterId
- category
- quantityNeeded
- urgencyLevel
- peopleAffected
- location
- description
- verificationStatus
- priorityScore
- status

Starter endpoints:
- `POST /api/requests`
- `GET /api/requests`
- `GET /api/requests/:id`
- `PATCH /api/requests/:id`
- `PATCH /api/requests/:id/verify`
- `PATCH /api/requests/:id/status`

### 7.5 Resources

Responsibilities:
- allow donors/admin to add available resources
- support inventory-like behavior
- support verification and availability tracking

Starter fields:
- donorId
- disasterId
- category
- quantityAvailable
- unit
- expiryDate
- location
- verificationStatus
- status

Starter endpoints:
- `POST /api/resources`
- `GET /api/resources`
- `GET /api/resources/:id`
- `PATCH /api/resources/:id`
- `PATCH /api/resources/:id/verify`
- `PATCH /api/resources/:id/status`

### 7.6 Allocations

Responsibilities:
- match requests to resources
- store allocation decisions
- store AI explanation

Starter fields:
- requestId
- resourceId
- assignedQuantity
- allocatedBy
- volunteerId
- status
- aiReason

Starter endpoints:
- `GET /api/allocations`
- `POST /api/allocations`
- `POST /api/allocations/suggestions`
- `PATCH /api/allocations/:id/status`

### 7.7 Volunteers

Responsibilities:
- assign delivery tasks
- track task progress

Starter fields:
- allocationId
- volunteerId
- pickupLocation
- dropLocation
- status
- assignedAt
- completedAt

Starter endpoints:
- `GET /api/volunteers/tasks`
- `PATCH /api/volunteers/tasks/:id/status`

### 7.8 Dashboard

Responsibilities:
- provide KPI cards and summary stats
- expose admin analytics

Starter outputs:
- total active disasters
- pending requests
- verified resources
- fulfilled allocations
- category-wise resource demand
- status summaries

Starter endpoints:
- `GET /api/dashboard/overview`
- `GET /api/dashboard/charts`
- `GET /api/dashboard/high-priority-requests`

### 7.9 Notifications

Responsibilities:
- store status updates
- surface in-app alerts

Starter endpoints:
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`

### 7.10 AI

Responsibilities:
- explain priority scores
- summarize disaster demand trends
- support admin insight panels

Starter endpoints:
- `POST /api/ai/explain-priority`
- `POST /api/ai/disaster-summary`
- `POST /api/ai/demand-insights`

## 8. Database Starter Schema

### `users`

```js
{
  name: String,
  email: String,
  passwordHash: String,
  role: "admin" | "donor" | "beneficiary" | "volunteer",
  phone: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  isVerified: Boolean
}
```

### `disasters`

```js
{
  title: String,
  type: String,
  description: String,
  region: String,
  severity: "low" | "medium" | "high" | "critical",
  status: "draft" | "active" | "closed",
  createdBy: ObjectId
}
```

### `requests`

```js
{
  beneficiaryId: ObjectId,
  disasterId: ObjectId,
  category: "food" | "water" | "medicine" | "shelter" | "clothes" | "rescue",
  subcategory: String,
  quantityNeeded: Number,
  urgencyLevel: "low" | "medium" | "high" | "critical",
  peopleAffected: Number,
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  description: String,
  verificationStatus: "pending" | "verified" | "rejected",
  priorityScore: Number,
  status: "pending" | "approved" | "allocated" | "fulfilled" | "rejected"
}
```

### `resources`

```js
{
  donorId: ObjectId,
  disasterId: ObjectId,
  category: "food" | "water" | "medicine" | "shelter" | "clothes" | "rescue",
  quantityAvailable: Number,
  unit: String,
  expiryDate: Date,
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  verificationStatus: "pending" | "verified" | "rejected",
  status: "available" | "reserved" | "distributed" | "inactive"
}
```

### `allocations`

```js
{
  requestId: ObjectId,
  resourceId: ObjectId,
  assignedQuantity: Number,
  allocatedBy: ObjectId,
  volunteerId: ObjectId,
  status: "pending" | "approved" | "in_transit" | "delivered" | "cancelled",
  aiReason: String
}
```

### `volunteerTasks`

```js
{
  allocationId: ObjectId,
  volunteerId: ObjectId,
  pickupLocation: String,
  dropLocation: String,
  status: "assigned" | "picked" | "in_transit" | "completed"
}
```

### `notifications`

```js
{
  userId: ObjectId,
  title: String,
  message: String,
  type: "info" | "success" | "warning" | "urgent",
  isRead: Boolean
}
```

## 9. AI and Allocation Design

The system should use a hybrid approach.

### Deterministic logic

Use local business logic for:
- request priority scoring
- matching resources to requests
- category compatibility
- availability checks
- simple proximity-based ranking

### External AI usage

Use Gemini or another free API for:
- human-readable explanations
- admin summaries
- demand trend summaries
- recommendation text

### Why this is correct for the project

- low-cost and demo friendly
- works even if API usage is limited
- easier to defend in viva
- scalable later into more advanced ML

## 10. Priority Score Starter Formula

Use a simple weighted scoring system in `priority-score.js`.

```txt
priorityScore =
  urgencyWeight +
  peopleAffectedWeight +
  requestAgeWeight +
  categoryCriticalityWeight +
  disasterSeverityWeight +
  verificationBoost
```

Suggested logic:

- `critical urgency` gets highest score
- `medicine`, `water`, `food` get higher criticality
- larger `peopleAffected` increases score
- older pending requests increase score
- verified requests can get a small boost

This is enough for MVP and can later be replaced with ML.

## 11. Allocation Engine Starter Logic

The first version of the allocation engine should:

1. fetch verified pending requests
2. fetch verified available resources
3. filter by matching category
4. rank candidate resources by proximity and quantity
5. generate suggested allocation pairs
6. attach a short AI/system reason

The engine should stay explainable.

Example explanation:

`Matched because category is medicine, stock is available, request urgency is critical, and source location is nearest among verified resources.`

## 12. Frontend Route Plan

### Public routes

- `/`
- `/login`
- `/register`

### Shared authenticated routes

- `/dashboard`
- `/profile`
- `/notifications`

### Admin routes

- `/admin/disasters`
- `/admin/requests`
- `/admin/resources`
- `/admin/allocations`
- `/admin/users`
- `/admin/analytics`

### Beneficiary routes

- `/beneficiary/requests`
- `/beneficiary/requests/new`
- `/beneficiary/requests/:id`

### Donor routes

- `/donor/resources`
- `/donor/resources/new`
- `/donor/resources/:id`

### Volunteer routes

- `/volunteer/tasks`
- `/volunteer/tasks/:id`

## 13. State Management Starter Plan

Use a simple approach first:

- React Context for auth/session
- local component state for forms
- feature hooks for data fetching

If the app grows, add Redux Toolkit or TanStack Query later.

For this project, a clean lightweight setup is better than overengineering early.

## 14. UI Design System Starter Plan

Use these design principles:

- modern emergency-response style dashboard
- strong card layout
- crisp tables with status chips
- charts for demand, allocations, and pending items
- consistent category colors

Suggested status colors:

- `critical` -> red
- `high` -> orange
- `pending` -> amber
- `verified` -> blue
- `fulfilled` -> green

Suggested top-level UI sections:

- hero/landing
- role dashboard
- action cards
- metrics row
- request/resource tables
- insight panel

## 15. Security and Validation Starter Rules

Add these from the start:

- hashed passwords with `bcrypt`
- JWT auth
- route guards
- role checks
- validation for all create/update endpoints
- avoid exposing full internal documents directly

For college level, these are enough to show professional discipline.

## 16. Development Sprints

### Sprint 1: Foundation

- initialize `client` and `server`
- set up routing
- set up database connection
- auth system
- base layout and dashboard shell

### Sprint 2: Core CRUD

- disasters module
- requests module
- resources module
- role-based pages
- admin verification flow

### Sprint 3: Allocation Logic

- priority scoring utility
- allocation engine
- allocation endpoints
- allocation dashboard UI

### Sprint 4: Dashboard and AI

- charts and metrics
- notifications
- AI explanation and summary endpoints
- admin insights panel

### Sprint 5: Polish and Demo Readiness

- better styling
- demo seed data
- error states and loading states
- final testing
- presentation screenshots and flow prep

## 17. Coding Order Recommendation

Build in this exact order:

1. backend auth and user roles
2. frontend auth and protected routes
3. disaster CRUD
4. request CRUD
5. resource CRUD
6. admin verification workflow
7. priority score utility
8. allocation logic
9. dashboard endpoints and charts
10. Gemini/free API insight layer
11. polish and testing

## 18. Best First Code Milestone

The first milestone should be:

**Working auth + role-based dashboard + disaster/request/resource CRUD**

Why:

- gives visible progress quickly
- proves the full stack is connected
- builds the foundation required for allocation and AI

## 19. Decision Summary

Final starter architecture decisions:

- MERN with separate `client` and `server`
- modular backend by domain
- role-based frontend by route and feature
- deterministic allocation core
- optional Gemini/free API for explanation and insights
- scalable enough for future major-project extension

## 20. What We Build Next

Immediate next coding task:

1. scaffold `client` and `server`
2. set up Express app and Mongo connection
3. create auth module
4. create React app shell with routing and role-aware layout

That is the correct starting point for implementation.
