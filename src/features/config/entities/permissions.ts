export const EntityRole = {
  SuperAdmin: "SuperAdmin",
  ClientAdmin: "ClientAdmin",
  Manager: "Manager",
  Subscriber: "Subscriber",
  Guest: "Guest",
};

export const permissionsConfig = {
  entityName: "permissions",
  apiPath: "permissions",
  baseUrl: "", // Sin API
  userData: undefined,
  columns: [
    { accessorKey: "role", header: "Rol", type: "select", options: Object.values(EntityRole) },
    { accessorKey: "entity", header: "Entidad" },
    { accessorKey: "canCreate", header: "Puede Crear?", type: "checkbox" },
    { accessorKey: "canRead", header: "Puede Leer?", type: "checkbox" },
    { accessorKey: "canUpdate", header: "Puede Actualizar?", type: "checkbox" },
    { accessorKey: "canDelete", header: "Puede Eliminar?", type: "checkbox" },
    { accessorKey: "customActions", header: "Acciones Personalizadas", type: "custom-actions" },
  ],
};
