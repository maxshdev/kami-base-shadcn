import { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">{children}</main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MaxShDev. Todos los derechos reservados.
        </div>
      </footer>
    </>
  )
}