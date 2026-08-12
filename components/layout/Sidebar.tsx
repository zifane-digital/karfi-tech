"use client";

import {
  LayoutDashboard,
  Building2,
  Users,
  Wallet,
  FileText,
  FolderOpen,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Filiales",
    href: "/filiales",
    icon: Building2,
  },
  {
    label: "Utilisateurs",
    href: "/utilisateurs",
    icon: Users,
  },
  {
    label: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    label: "Contrats",
    href: "/contrats",
    icon: FileText,
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FolderOpen,
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 z-40 cursor-default bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col",
          "bg-neutral text-neutral-content",
          "transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <Building2 size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wide text-secondary">
                KARFI HOLDING
              </p>

              <h1 className="text-lg font-bold">
                SIIKH
              </h1>
            </div>
          </div>

          {/* Bouton fermer mobile */}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm lg:hidden"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-white/40">
            Administration
          </p>

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className={[
                      "flex items-center gap-3 rounded-xl px-4 py-3",
                      "text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-content shadow-sm"
                        : "text-white/80 hover:bg-white/10 hover:text-secondary",
                    ].join(" ")}
                  >
                    <Icon size={20} />

                    <span>
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Séparateur */}
          <div className="my-6 border-t border-white/10" />

          {/* Système */}
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-white/40">
            Système
          </p>

          <a
            href="/parametres"
            onClick={onClose}
            className={[
              "flex items-center gap-3 rounded-xl px-4 py-3",
              "text-sm font-medium text-white/80",
              "transition-colors",
              "hover:bg-white/10 hover:text-secondary",
            ].join(" ")}
          >
            <Settings size={20} />

            <span>
              Paramètres
            </span>
          </a>
        </nav>

        {/* Déconnexion */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            type="button"
            className={[
              "flex w-full items-center gap-3 rounded-xl px-4 py-3",
              "text-sm font-medium text-white/70",
              "transition-colors",
              "hover:bg-error/20 hover:text-white",
            ].join(" ")}
          >
            <LogOut size={20} />

            <span>
              Déconnexion
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}