import type { EntityFeatureConfig, Action } from "@maxshdev/kami-engine/types/crud.types";
import { enumToOptions } from "@maxshdev/kami-engine/helpers/crud.utils";
import { EntityRole } from "./roles";

// Ejemplo de acciones extra por fila
const userExtraRowActions: Action<any>[] = [
  { key: "other", label: "Otro", onClick: (user) => alert(`Ver usuario: ${user.name}`), permissionKey: "canPay" },
];

// Ejemplo de acciones de extra página (botones encima de la tabla)
const userExtraPageActions: Action<any>[] = [
  { key: "createUser", label: "Crear usuario", onClick: () => alert("Crear usuario"), permissionKey: "canCreate" },
  { key: "setPay", label: "Establecer pago", onClick: () => alert("Establecer pago"), permissionKey: "canPay" },
];

export const usersConfig: EntityFeatureConfig<any> = {
  entityName: "users", // TODO: chequear porque creo que está duplicado el uso con apiPath es lo mismo para usar rutas a menos que lo piense para otra cosa.
  apiPath: "users",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  userData: undefined,
  columns: [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Rol", type: "select", options: enumToOptions(EntityRole) },
  ],
  // si quieres puedes sobreescribir acciones por defecto con rowActions y pageActions
  extraRowActions: userExtraRowActions,
  extraPageActions: userExtraPageActions,
};