"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// Tipos de acción de fila
type CrudAction<T> = { key: string; label: string; onClick?: (item?: T) => void };

// Intentamos usar los paquetes reales si están instalados
let CrudProvider: React.FC<any>;
let ShadcnAdapter: any;

try {
  CrudProvider = require("@maxshdev/kami-engine").CrudProvider;
  ShadcnAdapter = require("@maxshdev/kami-shadcn-ui").ShadcnAdapter;
} catch (err) {
  console.warn(
    "⚠️ kami-engine y kami-shadcn-ui no están instalados. Usando CRUD demo mock."
  );

  // Componente ColumnActions interno
  function ColumnActions<T>({ actions, item }: { actions?: CrudAction<T>[]; item?: T }) {
    if (!actions?.length) return null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((a) => (
            <DropdownMenuItem key={a.key} onClick={() => a.onClick?.(item)}>
              {a.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  CrudProvider = ({ config }: any) => {
    // Generar datos demo según la entidad
    let demoData: any[] = [];
    switch (config.entityName) {
      case "users":
        demoData = [
          { name: "Alice", email: "alice@demo.com", role: "admin" },
          { name: "Bob", email: "bob@demo.com", role: "user" },
        ];
        break;
      case "roles":
        demoData = [
          { name: "SuperAdmin" },
          { name: "Manager" },
        ];
        break;
      case "permissions":
        demoData = [
          { role: "SuperAdmin", entity: "users", canCreate: true, canRead: true, canUpdate: true, canDelete: true, customActions: "" },
          { role: "Manager", entity: "roles", canCreate: false, canRead: true, canUpdate: false, canDelete: false, customActions: "" },
        ];
        break;
      default:
        demoData = [];
    }

    // Acciones por fila: ver, editar, eliminar + extraRowActions
    const rowActions: CrudAction<any>[] = [
      { key: "view", label: "Ver", onClick: (item) => alert(`Ver: ${item?.name || item?.role || "registro"}`) },
      { key: "edit", label: "Editar", onClick: (item) => alert(`Editar: ${item?.name || item?.role || "registro"}`) },
      { key: "delete", label: "Eliminar", onClick: (item) => alert(`Eliminar: ${item?.name || item?.role || "registro"}`) },
      ...(config.extraRowActions || []),
    ];

    // Columnas con acciones
    const columnsWithActions = [
      ...config.columns,
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }: any) => <ColumnActions item={row} actions={rowActions} />,
      },
    ];

    return (
      <div className="p-4 border rounded-md bg-gray-50">
        <h2 className="font-bold mb-2">CRUD Demo: {config.entityName}</h2>

        <DataTable columns={columnsWithActions} data={demoData} />

        {config.extraPageActions && config.extraPageActions.length > 0 && (
          <div className="mt-4 space-x-2">
            {config.extraPageActions.map((action: any) => (
              <Button
                key={action.key}
                onClick={() => action.onClick?.(demoData[0])}
                variant="default"
                size="default"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        <p className="text-red-500 mt-4">
          ⚠️ Para funcionalidades completas, instala kami-engine y kami-shadcn-ui
        </p>
      </div>
    );
  };

  ShadcnAdapter = {};
}

export { CrudProvider, ShadcnAdapter };
