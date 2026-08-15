"use client";

import {
  BarChart3,
  Building2,
  ChevronRight,
  FileText,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const mainMenu = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Filiales",
    href: "/dashboard/filiales",
    icon: Building2,
  },
  {
    label: "Utilisateurs",
    href: "/dashboard/utilisateurs",
    icon: Users,
  },
];

const businessMenu = [
  {
    label: "Finance",
    href: "/dashboard/activites",
    icon: Wallet,
  },
  {
    label: "Contrats",
    href: "/dashboard/activites",
    icon: FileText,
  },
  {
    label: "Documents",
    href: "/dashboard/activites",
    icon: FolderOpen,
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const renderItem = (
    item: {
      label: string;
      href: string;
      icon: React.ElementType;
    }
  ) => {
    const Icon = item.icon;

    const active =
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`);

    return (
      <li key={item.href}>
        <a
          href={item.href}
          onClick={onClose}
          className={`
            group flex items-center gap-3 rounded-2xl px-4 py-3
            text-sm font-medium transition-all duration-200
            ${
              active
                ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                : "text-neutral-content/70 hover:bg-neutral-content/10 hover:text-secondary"
            }
          `}
        >
          <Icon
            size={19}
            className={
              active
                ? ""
                : "transition-transform group-hover:scale-110"
            }
          />

          <span className="flex-1">
            {item.label}
          </span>

          {active && (
            <ChevronRight size={16} />
          )}
        </a>
      </li>
    );
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{
          x: open ? 0 : undefined,
        }}
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col overflow-hidden
          bg-neutral text-neutral-content
          shadow-2xl
          transition-transform duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* DECORATION */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />

        {/* LOGO */}
        <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg">
              <ShieldCheck size={23} />
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-secondary">
                KARFI
              </p>

              <p className="text-lg font-black tracking-tight">
                HOLDING
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-square btn-ghost btn-sm lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* USER */}
        <div className="relative mx-4 mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-3">

            <div className="avatar placeholder">
              <div className="w-11 rounded-xl bg-secondary text-neutral">
                <span className="font-black">
                  A
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                Administrateur
              </p>

              <div className="mt-1 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success" />

                <span className="text-[10px] uppercase tracking-wider text-white/40">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="relative flex-1 overflow-y-auto px-3 py-6">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Pilotage
          </p>

          <ul className="menu w-full gap-1">
            {mainMenu.map(renderItem)}
          </ul>

          <div className="my-6 border-t border-white/10" />

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Activités
          </p>

          <ul className="menu w-full gap-1">
            {businessMenu.map(renderItem)}
          </ul>

          <div className="my-6 border-t border-white/10" />

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            Système
          </p>

          <ul className="menu w-full gap-1">

            <li>
              <a
                href="/dashboard/activites"
                onClick={onClose}
                className="rounded-2xl"
              >
                <BarChart3 size={19} />
                Activités
              </a>
            </li>

            <li>
              <a
                href="/poles/formation"
                onClick={onClose}
                className="rounded-2xl"
              >
                <GraduationCap size={19} />
                Formation
              </a>
            </li>

            <li>
              <a
                href="/dashboard/settings"
                onClick={onClose}
                className="rounded-2xl"
              >
                <Settings size={19} />
                Paramètres
              </a>
            </li>
          </ul>
        </nav>

        {/* IA */}
        <div className="relative mx-4 mb-4 rounded-2xl border border-secondary/20 bg-gradient-to-br from-primary/20 to-secondary/10 p-4">

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-neutral">
              <Sparkles size={17} />
            </div>

            <div>
              <p className="text-xs font-bold">
                Assistant KARFI IA
              </p>

              <p className="mt-1 text-[10px] leading-4 text-white/40">
                Analysez vos données et obtenez des recommandations.
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-xs mt-3 w-full rounded-xl">
            Ouvrir l'assistant
          </button>
        </div>

        {/* SECURITY */}
        <div className="relative border-t border-white/10 p-4">

          <div className="rounded-2xl border border-success/20 bg-success/5 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={17}
                className="text-success"
              />

              <span className="text-xs font-semibold">
                Système sécurisé
              </span>
            </div>
          </div>

          <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs text-white/50 transition hover:bg-error/10 hover:text-error">
            <LogOut size={17} />
            Déconnexion
          </button>

          <p className="mt-3 text-center text-[9px] text-white/20">
            © {new Date().getFullYear()} KARFI HOLDING
          </p>
        </div>
      </motion.aside>
    </>
  );
}
