"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Wallet,
  FileText,
  Settings,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Bell,
} from "lucide-react";
import Link from "next/link";

const menu = [
  {
    label: "Dashboard",
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
  {
    label: "Finances",
    href: "/dashboard/activites",
    icon: Wallet,
  },
  {
    label: "Documents",
    href: "/dashboard/activites",
    icon: FileText,
  },
  {
    label: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1110] text-base-content">
      {/* BACKGROUND SUPABASE STYLE */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-[#3ecf8e]/10 blur-[120px]" />

        <div className="absolute right-[-10%] top-[20%] h-[450px] w-[450px] rounded-full bg-emerald-500/5 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[30%] h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[130px]" />
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          border-r border-white/10
          bg-[#0d1513]/95 backdrop-blur-xl
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* LOGO */}
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <Link
              href="/dashboard"
              className="flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ecf8e] shadow-lg shadow-[#3ecf8e]/20">
                <span className="text-lg font-black text-[#0b1110]">
                  K
                </span>
              </div>

              <div>
                <p className="font-bold tracking-wide text-white">
                  KARFI
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#3ecf8e]">
                  Holding
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="btn btn-circle btn-ghost btn-sm text-white lg:hidden"
            >
              <X size={19} />
            </button>
          </div>

          {/* SYSTEM */}
          <div className="px-4 pt-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Administration
            </p>

            <nav className="space-y-1">
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                      group flex items-center gap-3 rounded-xl
                      px-3 py-3 text-sm text-white/60
                      transition-all duration-200
                      hover:bg-[#3ecf8e]/10
                      hover:text-[#3ecf8e]
                    "
                  >
                    <Icon
                      size={19}
                      className="transition-transform group-hover:scale-110"
                    />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* SECURITY CARD */}
          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-[#3ecf8e]/20 bg-[#3ecf8e]/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3ecf8e]/10">
                  <ShieldCheck
                    size={18}
                    className="text-[#3ecf8e]"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Système sécurisé
                  </p>

                  <p className="text-[10px] text-white/40">
                    SIIKH · KARFI
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[10px] text-[#3ecf8e]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#3ecf8e]" />
                Services opérationnels
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await fetch("/api/auth/logout", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  if (response.ok) {
                    window.location.replace("/login");
                    return;
                  }

                  const data = await response.json().catch(() => ({}));
                  console.error("Logout failed:", data);
                  window.location.replace("/login");
                } catch (error) {
                  console.error("Logout error:", error);
                  window.location.replace("/login");
                }
              }}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/40 transition hover:bg-error/10 hover:text-error"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-64">
        {/* NAVBAR */}
        <header className="sticky top-0 z-30 h-20 border-b border-white/10 bg-[#0b1110]/80 backdrop-blur-xl">
          <div className="flex h-full items-center justify-between px-4 md:px-6">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="btn btn-circle btn-ghost text-white lg:hidden"
              >
                <Menu size={21} />
              </button>

              <div className="hidden md:block">
                <p className="text-xs text-white/30">
                  Système d'information
                </p>

                <p className="text-sm font-semibold text-white">
                  KARFI Holding
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              {/* STATUS */}
              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#3ecf8e]" />

                <span className="text-xs text-white/50">
                  En ligne
                </span>
              </div>

              {/* NOTIFICATION */}
              <button className="btn btn-circle btn-ghost relative text-white/60 hover:text-[#3ecf8e]">
                <Bell size={19} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#3ecf8e]" />
              </button>

              {/* PROFILE */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-2 transition hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3ecf8e] text-sm font-bold text-[#0b1110]">
                    K
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-xs font-semibold text-white">
                      Administrateur
                    </p>

                    <p className="text-[10px] text-white/40">
                      Super Admin
                    </p>
                  </div>

                  <ChevronDown
                    size={15}
                    className="text-white/30"
                  />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-[1] mt-3 w-52 rounded-2xl border border-white/10 bg-[#101917] p-2 shadow-2xl"
                >
                  <li>
                    <Link href="/dashboard/settings">
                      <Settings size={16} />
                      Paramètres
                    </Link>
                  </li>

                  <li>
                    <button className="text-error">
                      <LogOut size={16} />
                      Déconnexion
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="min-h-[calc(100vh-5rem)] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
