export const EntityRole = {
  ADMIN: "admin",
  USER: "user",
};

// Acciones extra fila
const userExtraRowActions = [
  { key: "other", label: "Otro", onClick: (user: any) => alert(`Otras Opciones: ${user.name}`), permissionKey: "canCustom" },
];

// Acciones extra página
const userExtraPageActions = [
  { key: "createUser", label: "Crear usuario", onClick: () => alert("Crear usuario"), permissionKey: "canCreate" },
  { key: "setCustom", label: "Otras opciones", onClick: () => alert("Otras Opciones"), permissionKey: "canCustom" },
];

export const usersConfig = {
  entityName: "users",
  apiPath: "users",
  baseUrl: "", // No hay API
  userData: undefined,
  columns: [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Rol", type: "select", options: Object.values(EntityRole) },
  ],
  extraRowActions: userExtraRowActions,
  extraPageActions: userExtraPageActions,
};
