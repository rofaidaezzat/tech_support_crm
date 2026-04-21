export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface TenantMember {
  id: string;
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
}
