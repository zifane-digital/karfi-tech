"use client";

import Link from "next/link";
import {
  Landmark,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const navigation = [
    {
      href: "/",
      label: "Accueil",
    },
    {
      href: "/a-propos",
      label: "À propos",
    },
    {
      href: "/actualites",
      label: "Actualités",
    },
    {
      href: "/a-propos/equipe",
      label: "Notre équipe",
    },
    {
      href: "/partenaires",
      label: "Partenaires",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  const poles = [
    {
      href: "/poles/agro",
      label: "🌱 KARFI AGRO",
    },
    {
      href: "/poles/tech",
      label: "💻 KARFI TECH",
    },
    {
      href: "/poles/mobilier",
      label: "🏗️ KARFI MOBILIER",
    },
    {
      href: "/poles/formation",
      label: "🎓 KARFI FORMATION",
    },
  ];

  return (
    <footer className="border-t border-base-300 bg-neutral text-neutral-content">
      <div className="mx-auto max-w-7xl px-5 py-16">
        {/* =====================================================
            CONTENU PRINCIPAL
        ====================================================== */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* =====================================================
              IDENTITÉ
          ====================================================== */}

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content">
                <Landmark size={24} />
              </div>

              <div>
                <p className="text-lg font-black">
                  KARFI
                </p>

                <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-content/40">
                  HOLDING
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-content/60">
              Un groupe diversifié qui développe des
              solutions dans l'agriculture, la technologie,
              le mobilier et la formation.
            </p>

            {/* =================================================
                RÉSEAUX SOCIAUX
            ================================================== */}

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-content/40">
                Suivez-nous
              </p>

              <div className="flex gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="Instagram"
                >
                  <FaInstagram size={17} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="YouTube"
                >
                  <FaYoutube size={17} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm btn-ghost"
                  aria-label="TikTok"
                >
                  <FaTiktok size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}

          <div>
            <h3 className="footer-title text-neutral-content">
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="link link-hover text-neutral-content/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================================
              PÔLES
          ====================================================== */}

          <div>
            <h3 className="footer-title text-neutral-content">
              Nos pôles
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {poles.map((pole) => (
                <Link
                  key={pole.href}
                  href={pole.href}
                  className="link link-hover text-left text-neutral-content/70"
                >
                  {pole.label}
                </Link>
              ))}
            </div>
          </div>

          {/* =====================================================
              CONTACT
          ====================================================== */}

          <div>
            <h3 className="footer-title text-neutral-content">
              Contact
            </h3>

            <div className="mt-4 flex flex-col gap-4 text-sm">
              {/* Adresse */}
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <span className="text-neutral-content/60">
                  Niger
                </span>
              </div>

              {/* Téléphone */}
              <a
                href="tel:+22796913944"
                className="flex gap-3 transition hover:text-primary"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-primary"
                />

                <span className="text-neutral-content/60">
                  +227 96 91 39 44
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:contact@karfi.com"
                className="flex gap-3 transition hover:text-primary"
              >
                <Mail
                  size={18}
                  className="shrink-0 text-primary"
                />

                <span className="text-neutral-content/60">
                  contact@karfi.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="divider opacity-20" />

        {/* =====================================================
            NEWSLETTER
        ====================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-bold">
              Restez informé de nos activités
            </h3>

            <p className="mt-1 text-sm text-neutral-content/50">
              Recevez nos actualités et annonces importantes.
            </p>
          </div>

          <form
            className="join w-full max-w-md"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <input
              type="email"
              required
              placeholder="Votre adresse email"
              aria-label="Votre adresse email"
              className="input input-bordered join-item w-full bg-base-100 text-base-content"
            />

            <button
              type="submit"
              className="btn btn-primary join-item"
            >
              S'abonner
            </button>
          </form>
        </div>

        <div className="divider opacity-20" />

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <div className="flex flex-col gap-3 text-xs text-neutral-content/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} KARFI HOLDING.
            Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/politique-confidentialite"
              className="link link-hover"
            >
              Politique de confidentialité
            </Link>

            <Link
              href="/mentions-legales"
              className="link link-hover"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}