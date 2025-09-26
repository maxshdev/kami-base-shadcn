export const EntityRole = {
  SuperAdmin: "SuperAdmin",
  ClientAdmin: "ClientAdmin",
  Manager: "Manager",
  Subscriber: "Subscriber",
  Guest: "Guest",
};

export const rolesConfig = {
  entityName: "roles",
  apiPath: "roles",
  baseUrl: "", // Sin API
  userData: undefined,
  columns: [
    { accessorKey: "name", header: "Nombre" },
  ],
};
