"use client";

import { CrudProvider, ShadcnAdapter } from "@/features/crud-adapter";
import { usersConfig } from "@/features/config/entities/users";

// Hook demo para el usuario actual
const useCurrentUser = () => ({ id: 1, name: "Demo User", role: "admin" });

export default function UsersPage() {
  const currentUser = useCurrentUser();

  const configWithUser = { ...usersConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}
