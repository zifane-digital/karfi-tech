"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sprout,
  Cpu,
  Armchair,
  GraduationCap,
} from "lucide-react";

const poles = [
  {
    title: "KARFI AGRO",
    description:
      "Un pôle dédié à l'agriculture, à la production et au développement de solutions adaptées aux besoins du secteur agroalimentaire.",
    href: "/poles/agro",
    icon: Sprout,
  },
  {
    title: "KARFI TECH",
    description:
      "Un pôle orienté vers la technologie, le numérique, les solutions digitales et l'innovation.",
    href: "/poles/tech",
    icon: Cpu,
  },
  {
    title: "KARFI MOBILIER",
    description:
      "Un pôle spécialisé dans la conception, la fabrication et la commercialisation de solutions de mobilier.",
    href: "/poles/mobilier",
    icon: Armchair,
  },
  {
    title: "KARFI FORMATION & INCUBATION",
    description:
      "Un pôle consacré à la formation, au développement des compétences, à l'accompagnement et à l'incubation.",
    href: "/poles/formation",
    icon: GraduationCap,
  },
];

export default function PolesPage() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">

            <div className="badge badge-primary mb-6 px-4 py-4">
              KARFI HOLDING
            </div>

            <h1 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl">
              Nos{" "}
              <span className="text-blue-500">
                pôles d'activités
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Découvrez les différents pôles qui composent KARFI HOLDING
              et contribuent à notre vision de développement, d'innovation
              et de création de valeur.
            </p>

          </div>
        </div>
      </section>

      {/* POLES */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Nos expertises
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            Quatre pôles pour construire l'avenir
          </h2>

          <p className="mt-5 leading-7 text-base-content/60">
            Chaque pôle possède ses propres domaines d'expertise tout en
            participant à la stratégie globale de KARFI HOLDING.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {poles.map((pole) => {
            const Icon = pole.icon;

            return (
              <Link
                key={pole.href}
                href={pole.href}
                className="group"
              >
                <article className="card h-full border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                  <div className="card-body">

                    <div className="flex items-start justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon size={28} />
                      </div>

                      <ArrowRight
                        className="transition-transform duration-300 group-hover:translate-x-2"
                        size={22}
                      />

                    </div>

                    <h3 className="mt-6 text-2xl font-black">
                      {pole.title}
                    </h3>

                    <p className="mt-3 leading-7 text-base-content/60">
                      {pole.description}
                    </p>

                    <div className="card-actions mt-6">
                      <span className="font-semibold text-primary">
                        Découvrir le pôle →
                      </span>
                    </div>

                  </div>

                </article>
              </Link>
            );
          })}

        </div>

      </section>

    </main>
  );
}