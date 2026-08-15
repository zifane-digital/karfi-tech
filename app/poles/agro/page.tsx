"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Sprout,
  Wheat,
  Leaf,
  Tractor,
  Factory,
} from "lucide-react";

export default function KarfiAgroPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            KARFI <span className="text-blue-500">HOLDING</span>
          </Link>

          <Link
            href="/poles"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Nos pôles
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl items-center px-6 py-24 lg:min-h-[620px]">
          <div className="grid w-full gap-16 lg:grid-cols-2 lg:items-center">
            {/* Texte */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300">
                <Sprout size={17} />
                Pôle Agriculture
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                KARFI{" "}
                <span className="text-green-400">
                  AGRO
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-8 text-slate-300">
                Développer une agriculture productive, moderne et
                durable au service du développement économique.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#presentation"
                  className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
                >
                  Découvrir KARFI AGRO
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  KARFI HOLDING
                </Link>
              </div>
            </div>

            {/* Vitrine */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
                <div className="flex min-h-[400px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-green-900 via-green-800 to-slate-900">
                  <div className="text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-green-400/20 text-green-300">
                      <Sprout size={55} />
                    </div>

                    <p className="mt-6 text-2xl font-bold text-white">
                      KARFI AGRO
                    </p>

                    <p className="mt-2 text-sm text-green-200">
                      Agriculture · Production · Innovation
                    </p>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-white p-5 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    <Leaf size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Agriculture
                    </p>

                    <p className="text-xs text-slate-500">
                      Production durable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTATION */}
      <section
        id="presentation"
        className="mx-auto max-w-7xl px-6 py-24"
      >
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Présentation
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Une agriculture tournée vers l'avenir
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              KARFI AGRO constitue le pôle agricole de KARFI HOLDING.
              Il a pour ambition de participer au développement de
              solutions agricoles adaptées aux réalités locales.
            </p>

            <p>
              Le pôle s'inscrit dans une démarche de production,
              d'innovation et de valorisation des ressources agricoles.
            </p>

            <p>
              Notre objectif est de contribuer à une agriculture plus
              productive, organisée et durable tout en créant de la
              valeur pour les producteurs et les communautés.
            </p>
          </div>
        </div>
      </section>

      {/* DOMAINES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Nos domaines
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Les activités de KARFI AGRO
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Des activités pensées pour accompagner la transformation
              du secteur agricole.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Production */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Wheat size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Production agricole
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Développer des activités de production agricole
                répondant aux besoins du marché.
              </p>
            </div>

            {/* Technologie */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Tractor size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Modernisation
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Encourager l'utilisation de méthodes et de solutions
                modernes pour améliorer la productivité.
              </p>
            </div>

            {/* Transformation */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Factory size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Transformation
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Valoriser les productions agricoles à travers la
                transformation et la création de valeur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-[2rem] bg-slate-950">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 sm:p-14 lg:p-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Notre ambition
              </p>

              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Construire une agriculture plus forte
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                KARFI AGRO ambitionne de participer à la construction
                d'un secteur agricole plus performant, plus innovant
                et capable de générer davantage de valeur.
              </p>

              <div className="mt-8">
                <Link
                  href="/poles"
                  className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
                >
                  Voir les autres pôles
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="flex min-h-[350px] items-center justify-center bg-gradient-to-br from-green-800 to-green-950">
              <div className="text-center">
                <Sprout
                  size={90}
                  className="mx-auto text-green-300"
                />

                <p className="mt-6 text-2xl font-bold text-white">
                  PRODUIRE
                </p>

                <p className="mt-2 text-green-200">
                  INNOVER · CONSTRUIRE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} KARFI HOLDING. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}