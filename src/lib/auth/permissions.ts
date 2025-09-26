import { EntityRole } from "@/features/config/entities/roles";

type RoutePermissions = {
  [route: string]: EntityRole[];
};

export const routePermissions: RoutePermissions = {
  '/admin/dashboard': [EntityRole.SuperAdmin, EntityRole.ClientAdmin, EntityRole.Manager, EntityRole.Subscriber, EntityRole.Guest],
  '/admin/users': [EntityRole.SuperAdmin],
  '/admin/settings': [EntityRole.SuperAdmin],
  '/admin/cards': [EntityRole.SuperAdmin, EntityRole.ClientAdmin],
  '/admin/billings': [EntityRole.SuperAdmin],
};