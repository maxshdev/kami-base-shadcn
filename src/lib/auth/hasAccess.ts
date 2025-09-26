
import { EntityRole } from '@/features/config/entities/roles';
import { routePermissions } from './permissions';

export function hasAccess(path: string, role: EntityRole): boolean {
  const matchedRoute = Object.keys(routePermissions).find((route) =>
    path.startsWith(route)
  );

  if (!matchedRoute) return true; // si no está definido, se permite por defecto

  return routePermissions[matchedRoute].includes(role);
}