"use client";

import { CrudProvider, ShadcnAdapter } from "@/features/crud-adapter";
import { rolesConfig } from "@/features/config/entities/roles";

const useCurrentUser = () => ({ id: 1, name: "Demo User", role: "admin" });

export default function RolesPage() {
  const currentUser = useCurrentUser();

  const configWithUser = { ...rolesConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}
