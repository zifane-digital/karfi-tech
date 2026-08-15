"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Sprout,
  Cpu,
  Armchair,
  GraduationCap,
  CheckCircle2,
  Target,
  Users,
  Lightbulb,
} from "lucide-react";

export default function PolesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Building2 size={20} />
            </div>

            <div>
              <div className="text-lg font-extrabold tracking-tight">
                KARFI <span className="text-blue-600">HOLDING</span>
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Produire · Innover · Construire
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Retour
          </Link>

        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">

          <div>

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300">
              <Building2 size={17} />
              Nos pôles d'activités
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Des pôles complémentaires pour{" "}
              <span className="text-blue-500">
                construire l'avenir.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              KARFI HOLDING développe plusieurs pôles stratégiques
              complémentaires afin de créer de la valeur, stimuler
              l'innovation et contribuer durablement au développement
              économique.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="#poles"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
              >
                Découvrir nos pôles
                <ArrowRight size={18} />
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Accueil
              </Link>

            </div>
          </div>

          {/* IMAGE VITRINE */}
          <div className="relative">

            <div className="absolute -inset-4 rounded-[2rem] bg-blue-600/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">

              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">

                <img
                  src="/images/karfi-poles.jpg"
                  alt="KARFI HOLDING"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                    KARFI HOLDING
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    Produire · Innover · Construire
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          <div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Notre organisation
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Un groupe,
              <br />
              plusieurs expertises.
            </h2>

          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-600">

            <p>
              KARFI HOLDING structure ses activités autour de plusieurs
              pôles spécialisés permettant à chaque filiale de développer
              son expertise.
            </p>

            <p>
              Cette organisation permet de créer des synergies entre les
              différents métiers et de développer des projets à fort impact.
            </p>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Target className="text-blue-600" size={24} />

                <p className="mt-3 font-bold">
                  Vision
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Une ambition commune
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Users className="text-blue-600" size={24} />

                <p className="mt-3 font-bold">
                  Synergie
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Des expertises complémentaires
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Lightbulb className="text-blue-600" size={24} />

                <p className="mt-3 font-bold">
                  Innovation
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Des solutions adaptées
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          NOS POLES
      ===================================================== */}
      <section id="poles" className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">

          <div className="mb-14 max-w-3xl">

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Nos filiales
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Quatre pôles,
              <br />
              une même ambition.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Découvrez les différents domaines dans lesquels KARFI
              HOLDING développe ses activités.
            </p>

          </div>

          {/* =================================================
              CARTES DES POLES
          ================================================= */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* AGRO */}
            <Link
              href="#agro"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <Sprout size={27} />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Agriculture & production
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                KARFI AGRO
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Agriculture, production, transformation et valorisation
                des ressources agricoles.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                Découvrir
                <ArrowRight size={18} />
              </div>

            </Link>

            {/* TECH */}
            <Link
              href="#tech"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Cpu size={27} />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Technologie & innovation
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                KARFI TECH
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Solutions digitales, développement informatique et
                innovation technologique.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                Découvrir
                <ArrowRight size={18} />
              </div>

            </Link>

            {/* MOBILIER */}
            <Link
              href="#mobilier"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Armchair size={27} />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Mobilier & aménagement
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                KARFI MOBILIER
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Mobilier professionnel, aménagement d'espaces et
                solutions sur mesure.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                Découvrir
                <ArrowRight size={18} />
              </div>

            </Link>

            {/* FORMATION */}
            <Link
              href="#formation"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <GraduationCap size={27} />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Formation & entrepreneuriat
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                KARFI FORMATION & INCUBATION
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Formation professionnelle, incubation et accompagnement
                des entrepreneurs.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">
                Découvrir
                <ArrowRight size={18} />
              </div>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">

          <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 sm:p-12 lg:p-16">

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                  KARFI HOLDING
                </p>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Construisons ensemble
                  <br />
                  les solutions de demain.
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                  Découvrez nos expertises et contactez KARFI HOLDING
                  pour discuter de votre prochain projet.
                </p>

              </div>

              <div className="flex lg:justify-end">

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-500"
                >
                  Nous contacter
                  <ArrowRight size={19} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-slate-200 bg-slate-50">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <div>
            <p className="font-bold">
              KARFI <span className="text-blue-600">HOLDING</span>
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Produire · Innover · Construire
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} KARFI HOLDING. Tous droits réservés.
          </p>

        </div>

      </footer>
    </main>
  );
}
