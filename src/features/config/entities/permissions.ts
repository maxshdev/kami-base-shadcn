import type { EntityFeatureConfig } from "@maxshdev/kami-engine/types/crud.types";
import { enumToOptions } from "@maxshdev/kami-engine/helpers/crud.utils";
import { EntityRole } from "./roles";

export const permissionsConfig: EntityFeatureConfig<any> = {
  entityName: "permissions",
  apiPath: "permissions",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  userData: undefined,
  columns: [
    { accessorKey: "role", header: "Rol", type: "select", options: enumToOptions(EntityRole) },
    { accessorKey: "entity", header: "Entidad" },
    { accessorKey: "canCreate", header: "Puede Crear?", type: "checkbox" },
    { accessorKey: "canRead", header: "Puede Leer?", type: "checkbox" },
    { accessorKey: "canUpdate", header: "Puede Actualizar?", type: "checkbox" },
    { accessorKey: "canDelete", header: "Puede Eliminar?", type: "checkbox" },
    { accessorKey: "customActions", header: "Acciones Personalizadas", type: "custom-actions" },
  ],
};