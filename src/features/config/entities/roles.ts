import type { EntityFeatureConfig } from "@maxshdev/kami-engine/types/crud.types";

export enum EntityRole {
  SuperAdmin = 'SuperAdmin',
  ClientAdmin = 'ClientAdmin',
  Manager = 'Manager',
  Subscriber = 'Subscriber',
  Guest = 'Guest',
}

export const rolesConfig: EntityFeatureConfig<any> = {
  entityName: "roles", // TODO: chequear porque creo que está duplicado el uso con apiPath es lo mismo para usar rutas a menos que lo piense para otra cosa.
  apiPath: "roles",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  userData: undefined,
  columns: [
    { accessorKey: "name", header: "Nombre" },
  ],
};