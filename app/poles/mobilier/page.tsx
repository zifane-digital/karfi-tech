"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Hammer,
  Home,
  Sofa,
} from "lucide-react";

export default function MobilierPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            KARFI <span className="text-blue-600">HOLDING</span>
          </Link>

          <Link
            href="/poles"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            <ArrowLeft size={16} />
            Tous les pôles
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.30),transparent_40%)]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          {/* TEXTE */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-300">
              <Building2 size={17} />
              Pôle Mobilier
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              KARFI{" "}
              <span className="text-blue-500">
                MOBILIER
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Concevoir, fabriquer et proposer des solutions de mobilier
              adaptées aux besoins des particuliers, des entreprises et des
              institutions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#activites"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Découvrir nos activités
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/poles"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Retour aux pôles
              </Link>
            </div>
          </div>

          {/* VITRINE */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl">
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
                <div className="text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 backdrop-blur">
                    <Sofa
                      size={48}
                      strokeWidth={1.5}
                      className="text-blue-400"
                    />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-white">
                    KARFI MOBILIER
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Design · Fabrication · Aménagement
                  </p>
                </div>
              </div>
            </div>

            {/* PETITS BLOCS */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-600/20 p-3">
                  <Hammer className="text-blue-400" size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Fabrication
                  </p>
                  <p className="text-xs text-slate-400">
                    Solutions sur mesure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Notre activité
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Des espaces pensés pour durer
            </h2>
          </div>

          <div className="space-y-5 text-lg leading-8 text-slate-600">
            <p>
              KARFI MOBILIER développe une activité dédiée à la conception,
              la fabrication et la commercialisation de solutions de mobilier.
            </p>

            <p>
              Notre approche associe fonctionnalité, esthétique, qualité et
              adaptation aux besoins spécifiques de chaque client.
            </p>

            <p>
              Nous souhaitons accompagner les particuliers, entreprises,
              administrations et institutions dans l'aménagement de leurs
              espaces.
            </p>
          </div>
        </div>
      </section>

      {/* ACTIVITES */}
      <section id="activites" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Nos activités
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Des solutions pour différents espaces
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              KARFI MOBILIER propose une approche globale de l'aménagement,
              de la conception à la réalisation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* CARD 1 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Sofa size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Mobilier résidentiel
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Des solutions adaptées aux maisons, appartements et espaces
                résidentiels.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Building2 size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Mobilier professionnel
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Aménagement de bureaux, espaces professionnels et salles de
                travail.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Home size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Aménagement intérieur
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Création d'espaces harmonieux, fonctionnels et adaptés à leur
                utilisation.
              </p>
            </div>

            {/* CARD 4 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Factory size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Fabrication sur mesure
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Conception de meubles répondant aux dimensions et exigences
                spécifiques des clients.
              </p>
            </div>

            {/* CARD 5 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Hammer size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Conception & fabrication
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                De l'idée initiale à la réalisation finale, nous privilégions
                la qualité et la précision.
              </p>
            </div>

            {/* CARD 6 */}
            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <CheckCircle2 size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Qualité & finition
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Une attention particulière portée aux matériaux, aux détails
                et à la finition des réalisations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Notre engagement
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Créer des solutions utiles et durables
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Notre objectif est de développer une activité de mobilier
              capable de répondre aux réalités du marché tout en valorisant
              les compétences, les matériaux et les savoir-faire disponibles.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-950 p-8 sm:p-10">
            <div className="space-y-6">
              {[
                "Concevoir des solutions adaptées aux besoins des clients",
                "Favoriser la qualité et la durabilité des réalisations",
                "Développer les compétences et les savoir-faire locaux",
                "Contribuer à la création de valeur et d'emplois",
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-blue-500"
                    size={22}
                  />

                  <p className="leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                KARFI HOLDING
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Découvrez également nos autres pôles
              </h2>

              <p className="mt-3 max-w-2xl text-blue-100">
                Explorez les différentes activités qui composent l'écosystème
                de KARFI HOLDING.
              </p>
            </div>

            <Link
              href="/poles"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Voir tous les pôles
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} KARFI HOLDING. Tous droits réservés.
          </p>

          <Link
            href="/poles"
            className="font-medium text-slate-700 transition hover:text-blue-600"
          >
            Retour aux pôles
          </Link>
        </div>
      </footer>
    </main>
  );
}