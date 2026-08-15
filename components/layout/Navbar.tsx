"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

type CurrentUser = {
  prenom: string;
  nom: string;
  email: string;
  role: string;
};

export default function Navbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();
      const userData = data?.user ?? null;

      if (userData || data?.authenticated === true) {
        setUser(userData ?? {
          prenom: "Administrateur",
          nom: "",
          email: "",
          role: "ADMIN",
        });
        setNotifications(data.notifications ?? 0);
      }
    } catch (error) {
      console.error("Erreur utilisateur :", error);
    }
  }

  async function handleLogout() {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Erreur pendant la déconnexion."
        );
      }

      window.location.replace("/login");
    } catch (error) {
      console.error("Logout :", error);

      alert(
        error instanceof Error
          ? error.message
          : "Impossible de se déconnecter."
      );

      setLoggingOut(false);
    }
  }

  const initials = user
    ? `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`
    : "KA";

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
      <div className="navbar min-h-16 px-3 md:px-5">

        {/* MENU MOBILE */}
        <div className="flex-none lg:hidden">
          <button
            onClick={onMenuClick}
            className="btn btn-square btn-ghost"
            aria-label="Ouvrir le menu"
          >
            <Menu size={21} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex-1 lg:flex-none">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-black text-primary-content shadow-lg">
              K
            </div>

            <div className="hidden sm:block">
              <p className="font-black tracking-tight">
                KARFI
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-base-content/40">
                SIIKH
              </p>
            </div>

          </div>
        </div>

        {/* ESPACE CENTRAL */}
        <div className="hidden flex-1 lg:flex">
          <div className="ml-8">
            <p className="text-sm font-semibold">
              Système d'information intégré
            </p>

            <p className="text-xs text-base-content/40">
              Karfi Holding
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex-none">

          <div className="flex items-center gap-1">

            {/* NOTIFICATIONS */}
            <button
              className="btn btn-circle btn-ghost"
              title="Notifications"
            >
              <div className="indicator">
                <Bell size={19} />

                {notifications > 0 && (
                  <span className="badge badge-xs badge-primary indicator-item">
                    {notifications > 9
                      ? "9+"
                      : notifications}
                  </span>
                )}
              </div>
            </button>

            {/* PROFILE */}
            <div className="dropdown dropdown-end">

              <button
                tabIndex={0}
                className="btn btn-ghost gap-2 rounded-2xl"
              >

                <div className="avatar placeholder">
                  <div className="w-9 rounded-xl bg-primary text-primary-content">
                    <span className="text-xs font-bold">
                      {initials}
                    </span>
                  </div>
                </div>

                <div className="hidden text-left md:block">
                  <p className="max-w-32 truncate text-sm font-bold">
                    {user
                      ? `${user.prenom} ${user.nom}`
                      : "Administrateur"}
                  </p>

                  <p className="max-w-32 truncate text-[10px] uppercase text-base-content/40">
                    {user
                      ? user.role.replaceAll("_", " ")
                      : "ADMIN"}
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className="hidden opacity-40 md:block"
                />
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[50] mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
              >

                {/* USER */}
                <li className="menu-title px-3 py-2">
                  <span>Compte</span>
                </li>

                <li>
                  <a href="/dashboard/settings">
                    <User size={17} />
                    Mon profil
                  </a>
                </li>

                <li>
                  <a href="/dashboard/settings">
                    <Settings size={17} />
                    Paramètres
                  </a>
                </li>

                <li>
                  <a href="/dashboard/security">
                    <ShieldCheck size={17} />
                    Sécurité
                  </a>
                </li>

                <div className="divider my-1" />

                {/* LOGOUT */}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="text-error"
                  >
                    {loggingOut ? (
                      <>
                        <span className="loading loading-spinner loading-xs" />
                        Déconnexion...
                      </>
                    ) : (
                      <>
                        <LogOut size={17} />
                        Déconnexion
                      </>
                    )}
                  </button>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}