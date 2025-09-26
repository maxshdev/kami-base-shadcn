"use client"

import * as React from "react";
import {
  BookOpen,
  CircleHelp,
  Combine,
  Command,
  FileSpreadsheet,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Receipt,
  ScrollText,
  Send,
  Users,
  UserCog,
  ShieldUser
} from "lucide-react";
import { usePathname } from "next/navigation";
import { NavMain } from "@/components/shared/nav-main";
import { NavProjects } from "@/components/shared/nav-projects";
import { NavSecondary } from "@/components/shared/nav-secondary";
import { NavUser } from "@/components/shared/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { hasAccess } from "@/lib/auth/hasAccess";
import { EntityRole } from "@/features/config/entities/roles";

type UserData = {
  name: string;
  email: string;
  avatar?: string;
  role?: EntityRole;
};

function getNavItems(t: ReturnType<typeof useTranslations>) {
  return [
    {
      title: t("dashboard"),
      url: "/admin/dashboard",
      icon: BookOpen,
      isActive: true,
    },
    {
      title: "Roles",
      url: "/admin/roles",
      icon: UserCog,
      items: [{ title: t("index"), url: "/admin/roles" }],
    },
    {
      title: "Permisos",
      url: "/admin/permissions",
      icon: ShieldUser,
      items: [{ title: t("index"), url: "/admin/permissions" }],
    },
    {
      title: t("users_management.title"),
      url: "/admin/users",
      icon: Users,
      items: [{ title: t("index"), url: "/admin/users" }],
    },
  ];
}

function getNavSecondary(t: ReturnType<typeof useTranslations>) {
  return [
    { title: t("support"), url: "#", icon: LifeBuoy },
    { title: t("feedback"), url: "#", icon: Send },
    { title: t("faq"), url: "#", icon: CircleHelp },
  ];
}

const projects = [
  { name: "Design Engineering", url: "#", icon: Frame },
  { name: "Sales & Marketing", url: "#", icon: PieChart },
  { name: "Travel", url: "#", icon: Map },
];

function normalizePath(p: string) {
  return p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<UserData>({
    name: "",
    email: "",
    avatar: "",
    role: EntityRole.Guest,
  });

  const pathname = usePathname();

  const t = useTranslations("Admin.Sidebar");
  const rawNavMain = getNavItems(t);
  const navSecondary = getNavSecondary(t);

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name || "Usuario",
          email: parsedUser.email || "",
          // avatar: parsedUser.avatar || "",
          role: parsedUser.role || EntityRole.Guest,
        });
      }
    } catch (error) {
      console.error("Error cargando usuario desde localStorage", error);
    }
  }, []);

  // Extraer locale del pathname (ej: "es")
  const locale = pathname?.split("/")[1] ?? "";
  // Quitar locale del path para comparar
  const pathWithoutLocale = "/" + pathname?.split("/").slice(2).join("/");

  const normalizedPathname = normalizePath(pathWithoutLocale);

  // Filtrar rutas según rol
  const filteredNavMain = rawNavMain.filter((item) =>
    hasAccess(item.url, user.role || EntityRole.Guest)
  );

  const navMain = filteredNavMain.map((item) => {
    const normalizedItemUrl = normalizePath(item.url);

    const isMainActive =
      normalizedPathname === normalizedItemUrl ||
      normalizedPathname.startsWith(normalizedItemUrl + "/") ||
      item.items?.some((sub) => {
        const normSubUrl = normalizePath(sub.url);
        return (
          normalizedPathname === normSubUrl ||
          normalizedPathname.startsWith(normSubUrl + "/")
        );
      });

    const itemsWithIsActive = item.items?.map((sub) => {
      const normSubUrl = normalizePath(sub.url);
      return {
        ...sub,
        isActive:
          normalizedPathname === normSubUrl ||
          normalizedPathname.startsWith(normSubUrl + "/"),
      };
    });

    return {
      ...item,
      isActive: isMainActive,
      items: itemsWithIsActive,
    };
  });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Kami Engine</span>
                  <span className="truncate text-xs">Backoffice</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={projects} /> */}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}