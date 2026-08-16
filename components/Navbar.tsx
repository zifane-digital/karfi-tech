"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [polesOpen, setPolesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const closeMenus = () => {
    setMobileOpen(false);
    setPolesOpen(false);
    setAboutOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-base-300/60 bg-base-100/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        
        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-black text-primary-content">
            K
          </div>

          <div>
            <div className="text-lg font-black tracking-tight">
              KARFI
            </div>

            <div className="text-[9px] font-bold tracking-[0.3em] opacity-50">
              HOLDING
            </div>
          </div>
        </Link>

        {/* ================= DESKTOP ================= */}

        <nav className="hidden items-center gap-1 lg:flex">

          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            Accueil
          </Link>

          {/* ================= PÔLES ================= */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setPolesOpen((value) => !value);
                setAboutOpen(false);
              }}
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
            >
              Pôles

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  polesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {polesOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">

                <Link
                  href="/poles"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    Tous nos pôles
                  </div>

                  <div className="text-xs opacity-50">
                    Découvrir KARFI HOLDING
                  </div>
                </Link>

                <Link
                  href="/poles/agro"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    🌱 KARFI AGRO
                  </div>

                  <div className="text-xs opacity-50">
                    Agriculture et agro-industrie
                  </div>
                </Link>

                <Link
                  href="/poles/tech"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    💻 KARFI TECH
                  </div>

                  <div className="text-xs opacity-50">
                    Technologie et solutions numériques
                  </div>
                </Link>

                <Link
                  href="/poles/mobilier"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    🏗️ KARFI MOBILIER
                  </div>

                  <div className="text-xs opacity-50">
                    Mobilier et aménagement
                  </div>
                </Link>

                <Link
                  href="/poles/formation"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    🎓 KARFI FORMATION
                  </div>

                  <div className="text-xs opacity-50">
                    Formation et incubation
                  </div>
                </Link>

              </div>
            )}
          </div>

          {/* ================= À PROPOS ================= */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAboutOpen((value) => !value);
                setPolesOpen(false);
              }}
              className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
            >
              À propos

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  aboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {aboutOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">

                <Link
                  href="/a-propos"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    À propos de KARFI
                  </div>
                </Link>

                <Link
                  href="/a-propos/vision"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    Notre vision
                  </div>
                </Link>

                <Link
                  href="/a-propos/mission"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    Notre mission
                  </div>
                </Link>

                <Link
                  href="/a-propos/equipe"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 hover:bg-base-200"
                >
                  <div className="font-semibold">
                    Notre équipe
                  </div>
                </Link>

              </div>
            )}
          </div>

          <Link
            href="/actualites"
            className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            Actualités
          </Link>

          <Link
            href="/partenaires"
            className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            Partenaires
          </Link>

          <Link
            href="/contact"
            className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="btn btn-primary hidden rounded-xl lg:flex"
        >
          Nous contacter
        </Link>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="btn btn-ghost btn-square lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ================= MOBILE ================= */}

      {mobileOpen && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-5 py-4">

            <Link
              href="/"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              Accueil
            </Link>

            {/* MOBILE PÔLES */}

            <button
              type="button"
              onClick={() => {
                setPolesOpen((value) => !value);
                setAboutOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              Pôles

              <ChevronDown
                size={17}
                className={`transition-transform ${
                  polesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {polesOpen && (
              <div className="ml-4 space-y-1 border-l border-base-300 pl-3">

                <Link
                  href="/poles"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  Tous nos pôles
                </Link>

                <Link
                  href="/poles/agro"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  🌱 KARFI AGRO
                </Link>

                <Link
                  href="/poles/tech"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  💻 KARFI TECH
                </Link>

                <Link
                  href="/poles/mobilier"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  🏗️ KARFI MOBILIER
                </Link>

                <Link
                  href="/poles/formation"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  🎓 KARFI FORMATION
                </Link>

              </div>
            )}

            {/* MOBILE À PROPOS */}

            <button
              type="button"
              onClick={() => {
                setAboutOpen((value) => !value);
                setPolesOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              À propos

              <ChevronDown
                size={17}
                className={`transition-transform ${
                  aboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {aboutOpen && (
              <div className="ml-4 space-y-1 border-l border-base-300 pl-3">

                <Link
                  href="/a-propos"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  À propos de KARFI
                </Link>

                <Link
                  href="/a-propos/vision"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  Notre vision
                </Link>

                <Link
                  href="/a-propos/mission"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  Notre mission
                </Link>

                <Link
                  href="/a-propos/equipe"
                  onClick={closeMenus}
                  className="block rounded-lg px-4 py-2 text-sm hover:bg-base-200"
                >
                  Notre équipe
                </Link>

              </div>
            )}

            <Link
              href="/actualites"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              Actualités
            </Link>

            <Link
              href="/partenaires"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              Partenaires
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="block rounded-xl px-4 py-3 font-medium hover:bg-base-200"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="btn btn-primary mt-3 w-full rounded-xl"
            >
              Nous contacter
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}