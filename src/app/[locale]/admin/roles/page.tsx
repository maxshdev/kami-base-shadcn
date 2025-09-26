"use client";

import { CrudProvider } from "@maxshdev/kami-engine";
import { ShadcnAdapter } from "@maxshdev/kami-shadcn-ui";
import { rolesConfig } from "@/features/config/entities/roles";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function RolesPage() {

  const currentUser = useCurrentUser();

  // Clonamos la config para no mutar el original
  const configWithUser = { ...rolesConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}