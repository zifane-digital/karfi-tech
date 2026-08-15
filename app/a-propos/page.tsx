"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  Sparkles,
  Users,
} from "lucide-react";

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-base-100 pt-[73px]">

      <section className="bg-base-200 px-5 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12">
            <div className="badge badge-primary mb-5 gap-2 px-4 py-3">
              <Landmark size={15} />
              À PROPOS
            </div>

            <h1 className="text-4xl font-black sm:text-6xl">
              KARFI HOLDING
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-base-content/60">
              KARFI HOLDING développe un écosystème entrepreneurial
              regroupant plusieurs domaines complémentaires autour
              d'une même ambition.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <Link
              href="/a-propos/vision"
              className="card border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="card-body">
                <Sparkles className="text-primary" size={28} />

                <h2 className="card-title">
                  Notre vision
                </h2>

                <p className="text-sm leading-7 text-base-content/60">
                  Découvrez la vision qui guide KARFI HOLDING.
                </p>

                <div className="card-actions mt-4">
                  <span className="btn btn-primary btn-sm rounded-xl">
                    Découvrir
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/a-propos/mission"
              className="card border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="card-body">
                <CheckCircle2 className="text-primary" size={28} />

                <h2 className="card-title">
                  Notre mission
                </h2>

                <p className="text-sm leading-7 text-base-content/60">
                  Découvrez la mission de KARFI HOLDING.
                </p>

                <div className="card-actions mt-4">
                  <span className="btn btn-primary btn-sm rounded-xl">
                    Découvrir
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/a-propos/parcours"
              className="card border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="card-body">
                <ArrowRight className="text-primary" size={28} />

                <h2 className="card-title">
                  Notre parcours
                </h2>

                <p className="text-sm leading-7 text-base-content/60">
                  Découvrez les grandes étapes de notre parcours.
                </p>

                <div className="card-actions mt-4">
                  <span className="btn btn-primary btn-sm rounded-xl">
                    Découvrir
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="/a-propos/equipe"
              className="card border border-base-300 bg-base-100 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="card-body">
                <Users className="text-primary" size={28} />

                <h2 className="card-title">
                  Notre équipe
                </h2>

                <p className="text-sm leading-7 text-base-content/60">
                  Découvrez l'équipe de KARFI HOLDING.
                </p>

                <div className="card-actions mt-4">
                  <span className="btn btn-primary btn-sm rounded-xl">
                    Découvrir
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}