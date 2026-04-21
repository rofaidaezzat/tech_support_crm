# Feature-Sliced Architecture Folder Structure

This project follows a Feature-Sliced Design architecture pattern for optimal scalability and maintainability.

```
src/
├── app/                    # Store root only — imports feature slices
│   ├── components/         # (existing UI components)
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks (useAppDispatch, useAppSelector)
│   ├── routes.tsx         # React Router configuration
│   └── App.tsx            # Main App component with providers
│
├── pages/                  # Route entry points (thin, delegate to features)
│   ├── DashboardPage.tsx
│   └── BillingPage.tsx
│
├── features/               # Co-located everything per feature
│   └── billing/
│       ├── components/     # Billing-specific components
│       │   ├── BillingContainer.tsx
│       │   └── BillingCard.tsx
│       ├── hooks/          # Billing-specific hooks
│       │   └── useBillingData.ts
│       ├── api/            # Billing API calls
│       │   └── billingApi.ts
│       ├── store/          # Billing Redux slice
│       │   └── billingSlice.ts
│       ├── types/          # Billing TypeScript types
│       │   └── index.ts
│       └── index.ts        # Public API exports
│
├── tenants/                # Tenant management
│   ├── types.ts
│   ├── context.tsx
│   └── index.ts
│
├── auth/                   # Authentication
│   ├── types.ts
│   ├── context.tsx
│   └── index.ts
│
├── api/                    # Only shared/global API config
│   ├── client.ts           # API client with fetch wrapper
│   ├── interceptors.ts     # Request/response interceptors
│   └── index.ts
│
├── components/             # Truly shared UI only
│   ├── ui/                 # (existing shadcn components)
│   └── README.md
│
├── theme/                  # Theme configuration
│   ├── colors.ts
│   └── typography.ts
│
├── hooks/                  # Only truly cross-feature hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── types/                  # Shared TypeScript types
│   ├── common.ts
│   ├── routes.ts
│   └── index.ts
│
├── constants/              # Plans, roles, route paths
│   ├── plans.ts
│   ├── roles.ts
│   └── index.ts
│
├── lib/                    # Third-party wrappers
│   ├── date.ts             # date-fns wrapper
│   ├── logger.ts
│   └── index.ts
│
└── utils/                  # Pure functions (cn, planUtils)
    ├── cn.ts               # Tailwind class merger
    ├── planUtils.ts
    ├── validation.ts
    └── index.ts
```

## Key Principles

### 1. Feature-First Organization
- Each feature (like `billing/`) is self-contained with all its dependencies
- Features export a public API through their `index.ts`
- Features can import from shared layers (api, hooks, utils) but not from other features

### 2. Layered Architecture
- **App Layer**: Global store, routing, and app-wide providers
- **Pages Layer**: Thin route handlers that compose features
- **Features Layer**: Business logic organized by domain
- **Shared Layer**: Cross-cutting concerns (api, components, hooks, utils)

### 3. Import Rules
- Pages import from Features
- Features import from Shared layers
- Shared layers should not import from Features
- Features should not import from other Features

## Adding New Features

To add a new feature (e.g., `projects`):

```bash
src/features/projects/
├── components/
├── hooks/
├── api/
├── store/
│   └── projectsSlice.ts
├── types/
└── index.ts
```

Then register the slice in `/src/app/store.ts`:
```typescript
import projectsReducer from '../features/projects/store/projectsSlice';

export const store = configureStore({
  reducer: {
    billing: billingReducer,
    projects: projectsReducer, // Add here
  },
});
```

## Technology Stack

- **State Management**: Redux Toolkit
- **Routing**: React Router v7 (Data Mode)
- **API Client**: Custom fetch wrapper with interceptors
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript
