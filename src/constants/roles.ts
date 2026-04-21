export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
  OWNER: 'owner',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: ['*'],
  [ROLES.ADMIN]: ['read', 'write', 'delete', 'manage_users'],
  [ROLES.USER]: ['read', 'write'],
  [ROLES.GUEST]: ['read'],
} as const;
