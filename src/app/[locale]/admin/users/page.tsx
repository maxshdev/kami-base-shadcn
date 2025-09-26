"use client";

import { CrudProvider } from "@maxshdev/kami-engine";
import { ShadcnAdapter } from "@maxshdev/kami-shadcn-ui";
import { usersConfig } from "@/features/config/entities/users";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function UsersPage() {

  const currentUser = useCurrentUser();

  // Clonamos la config para no mutar el original
  const configWithUser = { ...usersConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}