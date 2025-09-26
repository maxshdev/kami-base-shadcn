import type { EntityFeatureConfig, Action } from "@maxshdev/kami-engine/types/crud.types";

export const adminSettingsConfig: EntityFeatureConfig<any> = {
  entityName: "adminSettings",
  apiPath: "admin-settings",
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  userData: undefined,

  // Columns para representar los campos editables
  columns: [
    { accessorKey: "companyName", header: "Company Name" },
    { accessorKey: "companyWebsite", header: "Website" },
    { accessorKey: "companyEmail", header: "Email" },
    { accessorKey: "companyPhone", header: "Phone" },
    { accessorKey: "logoUrl", header: "Logo", type: "image" },
    { accessorKey: "faviconUrl", header: "Favicon", type: "image" },
    { accessorKey: "primaryColor", header: "Primary Color", type: "color" },
    { accessorKey: "secondaryColor", header: "Secondary Color", type: "color" },
    { accessorKey: "headerTitle", header: "Header Title" },
    { accessorKey: "headerSubtitle", header: "Header Subtitle" },
    { accessorKey: "footerText", header: "Footer Text" },
    { accessorKey: "footerLinks", header: "Footer Links", type: "json" },
    { accessorKey: "defaultLanguage", header: "Default Language" },
    { accessorKey: "enableDarkMode", header: "Enable Dark Mode", type: "boolean" },
  ],

  // Este caso no necesita acciones de fila (es singleton)
  extraRowActions: [],

  // Podés poner un botón de "Edit Settings" en lugar de "Create"
  extraPageActions: [
    {
      key: "editSettings",
      label: "Edit Settings",
      onClick: () => alert("Open settings form"),
      permissionKey: "canEdit",
    },
  ],
};
