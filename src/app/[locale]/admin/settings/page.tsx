"use client";

import { CrudProvider } from "@maxshdev/kami-engine";
import { ShadcnAdapter } from "@maxshdev/kami-shadcn-ui";
import { adminSettingsConfig } from "@/features/config/entities/settings";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function SettingsPage() {

  const currentUser = useCurrentUser();

  // Clonamos la config para no mutar el original
  const configWithUser = { ...adminSettingsConfig, userData: currentUser };

  return <CrudProvider config={configWithUser} adapter={ShadcnAdapter} />;
}