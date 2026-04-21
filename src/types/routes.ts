export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  BILLING: '/billing',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
