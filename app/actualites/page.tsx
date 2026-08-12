"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Search,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";

const actualites = [
  {
    id: "karfi-agro",
    category: "KARFI AGRO",
    title: "KARFI développe de nouvelles solutions agricoles",
    date: "12 Août 2026",
    image: "/images/actualites/actualite-1.jpg",
    description:
      "Découvrez les nouvelles initiatives développées par KARFI AGRO pour moderniser la production agricole.",
  },
  {
    id: "karfi-tech",
    category: "KARFI TECH",
    title: "L'innovation numérique au cœur de nos activités",
    date: "08 Août 2026",
    image: "/images/actualites/actualite-2.jpg",
    description:
      "KARFI TECH poursuit son développement autour des solutions numériques et technologiques.",
  },
  {
    id: "partenariats",
    category: "KARFI HOLDING",
    title: "KARFI renforce son écosystème de partenaires",
    date: "02 Août 2026",
    image: "/images/actualites/actualite-3.jpg",
    description:
      "De nouveaux partenariats permettent à KARFI HOLDING d'accélérer son développement.",
  },
];

export default function ActualitesPage() {
  const [search, setSearch] = useState("");

  const filteredActualites = useMemo(() => {
    return actualites.filter((item) =>
      `${item.title} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-base-200">

      {/* HEADER */}

      <section className="relative overflow-hidden bg-base-100 px-5 py-24">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <Link
            href="/"
            className="btn btn-ghost mb-10 rounded-xl"
          >
            <ArrowLeft size={17} />
            Retour à l'accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <div className="badge badge-primary gap-2 px-4 py-3">
              <Sparkles size={14} />
              KARFI ACTUALITÉS
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
              Nos dernières
              <span className="text-primary">
                {" "}actualités.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/55">
              Retrouvez les nouvelles, activités, projets,
              événements et réalisations de KARFI HOLDING.
            </p>

          </motion.div>

        </div>

      </section>

      {/* CONTENU */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-7xl">

          {/* SEARCH */}

          <div className="mb-12 flex justify-end">

            <label className="input input-bordered flex w-full max-w-md items-center gap-3 rounded-2xl">

              <Search size={18} />

              <input
                type="text"
                placeholder="Rechercher une actualité..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </label>

          </div>

          {/* GRID */}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {filteredActualites.map((item, index) => (

              <motion.article
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl"
              >

                <figure className="relative h-64 overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute left-4 top-4">

                    <div className="badge badge-primary">
                      {item.category}
                    </div>

                  </div>

                </figure>

                <div className="card-body">

                  <div className="flex items-center gap-2 text-xs text-base-content/40">

                    <CalendarDays size={14} />

                    {item.date}

                  </div>

                  <h2 className="card-title mt-2 text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-base-content/55">
                    {item.description}
                  </p>

                  <div className="card-actions mt-5">

                    <Link
                      href={`/actualites/${item.id}`}
                      className="btn btn-primary rounded-xl"
                    >
                      Lire l'article
                      <ArrowRight size={16} />
                    </Link>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

          {filteredActualites.length === 0 && (

            <div className="alert mx-auto max-w-xl">
              Aucune actualité trouvée.
            </div>

          )}

        </div>

      </section>

    </main>
  );
}