"use client";

import { CrudProvider, ShadcnAdapter } from "@/features/crud-adapter";
import { permissionsConfig } from "@/features/config/entities/permissions";

const useCurrentUser = () => ({ id: 1, name: "Demo User", role: "admin" });

export default function PermissionsPage() {
  const currentUser = useCurrentUser();

  const configWithUser = { ...permissionsConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}
