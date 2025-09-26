"use client";

import { CrudProvider } from "@maxshdev/kami-engine";
import { ShadcnAdapter } from "@maxshdev/kami-shadcn-ui";
import { permissionsConfig } from "@/features/config/entities/permissions";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function PermissionsPage() {

  const currentUser = useCurrentUser();

  // Clonamos la config para no mutar el original
  const configWithUser = { ...permissionsConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}