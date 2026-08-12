"use client";

import { ReactNode } from "react";
import {
Bell,
Building2,
LayoutDashboard,
LogOut,
Menu,
Settings,
ShieldCheck,
Users,
X,
} from "lucide-react";

export default function DashboardLayout({
children,
}: {
children: ReactNode;
}) {
async function handleLogout() {
try {
await fetch("/api/auth/logout", {
method: "POST",
credentials: "include",
});
} catch (error) {
console.error("Erreur déconnexion :", error);
} finally {
window.location.href = "/login";
}
}

return ( <div className="drawer lg:drawer-open"> <input
     id="dashboard-drawer"
     type="checkbox"
     className="drawer-toggle"
   />

```
  {/* =====================================================
      CONTENU PRINCIPAL
  ===================================================== */}

  <div className="drawer-content min-h-screen bg-base-200">

    {/* =====================================================
        HEADER
    ===================================================== */}

    <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur">

      <div className="navbar min-h-16 px-4 lg:px-6">

        {/* MENU MOBILE */}

        <div className="flex-none lg:hidden">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
            aria-label="Ouvrir le menu"
          >
            <Menu size={21} />
          </label>
        </div>

        {/* TITRE */}

        <div className="flex-1">

          <div className="ml-2 lg:ml-0">

            <p className="text-xs font-medium uppercase tracking-wider text-base-content/40">
              Administration
            </p>

            <h1 className="text-lg font-bold">
              KARFI HOLDING
            </h1>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-2">

          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="btn btn-circle btn-ghost"
            aria-label="Notifications"
          >
            <div className="indicator">

              <span className="indicator-item badge badge-primary badge-xs" />

              <Bell size={20} />

            </div>
          </button>

          {/* PROFIL */}

          <div className="dropdown dropdown-end">

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost h-auto min-h-0 gap-3 px-2 py-2"
            >

              <div className="avatar placeholder">

                <div className="w-9 rounded-xl bg-primary text-primary-content">

                  <span className="text-sm font-bold">
                    A
                  </span>

                </div>

              </div>

              <div className="hidden text-left sm:block">

                <p className="text-sm font-semibold">
                  Administrateur
                </p>

                <p className="text-xs text-base-content/40">
                  SUPER ADMIN
                </p>

              </div>

            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-3 w-60 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
            >

              <li>
                <a href="/dashboard">
                  <LayoutDashboard size={17} />
                  Tableau de bord
                </a>
              </li>

              <li>
                <a href="/dashboard/settings">
                  <Settings size={17} />
                  Paramètres
                </a>
              </li>

              <div className="divider my-1" />

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-error"
                >
                  <LogOut size={17} />
                  Déconnexion
                </button>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </header>

    {/* =====================================================
        CONTENU DU DASHBOARD
    ===================================================== */}

    <main className="p-4 sm:p-6 lg:p-8">
      {children}
    </main>

  </div>

  {/* =====================================================
      SIDEBAR
  ===================================================== */}

  <div className="drawer-side z-40">

    <label
      htmlFor="dashboard-drawer"
      aria-label="Fermer le menu"
      className="drawer-overlay"
    />

    <aside className="flex min-h-full w-72 flex-col border-r border-base-300 bg-base-100">

      {/* LOGO */}

      <div className="flex h-16 items-center justify-between border-b border-base-300 px-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20">

            <ShieldCheck size={22} />

          </div>

          <div>

            <p className="font-bold tracking-tight">
              KARFI
            </p>

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-base-content/40">
              HOLDING
            </p>

          </div>

        </div>

        {/* FERMER MOBILE */}

        <label
          htmlFor="dashboard-drawer"
          className="btn btn-square btn-ghost btn-sm lg:hidden"
          aria-label="Fermer le menu"
        >
          <X size={18} />
        </label>

      </div>

      {/* UTILISATEUR */}

      <div className="mx-4 mt-5 rounded-2xl bg-base-200 p-4">

        <div className="flex items-center gap-3">

          <div className="avatar placeholder">

            <div className="w-10 rounded-xl bg-primary text-primary-content">

              <span className="font-bold">
                A
              </span>

            </div>

          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold">
              Administrateur
            </p>

            <p className="truncate text-xs text-base-content/40">
              SUPER ADMIN
            </p>

          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto px-3 py-6">

        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/35">
          Principal
        </p>

        <ul className="menu w-full gap-1">

          <li>
            <a
              href="/dashboard"
              className="active rounded-xl font-semibold"
            >
              <LayoutDashboard size={19} />
              Tableau de bord
            </a>
          </li>

          <li>
            <a
              href="/dashboard/filiales"
              className="rounded-xl"
            >
              <Building2 size={19} />
              Filiales
            </a>
          </li>

          <li>
            <a
              href="/dashboard/utilisateurs"
              className="rounded-xl"
            >
              <Users size={19} />
              Utilisateurs
            </a>
          </li>

        </ul>

        <p className="px-3 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/35">
          Système
        </p>

        <ul className="menu w-full gap-1">

          <li>
            <a
              href="/dashboard/activites"
              className="rounded-xl"
            >
              <Bell size={19} />
              Activités
            </a>
          </li>

          <li>
            <a
              href="/dashboard/settings"
              className="rounded-xl"
            >
              <Settings size={19} />
              Paramètres
            </a>
          </li>

        </ul>

      </div>

      {/* SÉCURITÉ */}

      <div className="p-4">

        <div className="rounded-2xl border border-success/10 bg-success/5 p-4">

          <div className="flex gap-3">

            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-success"
            />

            <div>

              <p className="text-xs font-semibold">
                Système sécurisé
              </p>

              <p className="mt-1 text-[11px] leading-4 text-base-content/40">
                Votre session est protégée.
              </p>

            </div>

          </div>

        </div>

        <p className="mt-4 text-center text-[10px] text-base-content/30">
          © {new Date().getFullYear()} KARFI HOLDING
        </p>

      </div>

    </aside>

  </div>

</div>
);
}
