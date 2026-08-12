"use client";

import {
  Menu,
  Bell,
  Search,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    const isDark = currentTheme === "karfi-dark";

    setDarkMode(isDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = darkMode
      ? "karfi"
      : "karfi-dark";

    document.documentElement.setAttribute(
      "data-theme",
      nextTheme
    );

    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-base-300 bg-base-100/95 px-4 shadow-sm backdrop-blur lg:px-8">

      {/* Partie gauche */}
      <div className="flex items-center gap-4">

        <button
          type="button"
          onClick={onMenuClick}
          className="btn btn-ghost btn-square lg:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-neutral">
            Tableau de bord
          </h2>

          <p className="hidden text-xs text-base-content/50 sm:block">
            Vue générale du SIIKH
          </p>
        </div>

      </div>

      {/* Recherche */}
      <div className="hidden max-w-md flex-1 px-8 lg:block">
        <label className="input input-bordered flex w-full items-center gap-2">

          <Search
            size={18}
            className="text-base-content/40"
          />

          <input
            type="search"
            placeholder="Rechercher..."
            className="grow"
          />

        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2">

        {/* Dark Mode */}
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Changer le thème"
        >
          {mounted && darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="btn btn-ghost btn-circle relative"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-error" />
        </button>

        {/* Séparateur */}
        <div className="mx-1 hidden h-8 w-px bg-base-300 sm:block" />

        {/* Profil */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-base-200"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content">
            <User size={19} />
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold">
              Administrateur
            </p>

            <p className="text-xs text-base-content/50">
              Super Admin
            </p>
          </div>
        </button>

      </div>

    </header>
  );
}