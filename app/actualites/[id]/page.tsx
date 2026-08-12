"use client";

import {
  ArrowLeft,
  CalendarDays,
  Share2,
} from "lucide-react";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const actualites = [
  {
    id: "karfi-agro",
    category: "KARFI AGRO",
    title: "KARFI développe de nouvelles solutions agricoles",
    date: "12 Août 2026",
    image: "/images/actualites/actualite-1.jpg",
    content: `
      KARFI AGRO poursuit son développement avec de nouvelles
      initiatives destinées à moderniser la production agricole.

      Notre ambition est de contribuer à une agriculture plus
      productive, durable et adaptée aux besoins de notre environnement.

      Ces initiatives s'inscrivent dans la vision globale de
      KARFI HOLDING : transformer les ressources et les talents
      en véritables opportunités économiques.
    `,
  },
  {
    id: "karfi-tech",
    category: "KARFI TECH",
    title: "L'innovation numérique au cœur de nos activités",
    date: "08 Août 2026",
    image: "/images/actualites/actualite-2.jpg",
    content: `
      KARFI TECH développe des solutions numériques destinées
      à accompagner les entreprises et les organisations.

      La technologie constitue aujourd'hui un élément essentiel
      de notre stratégie de développement.
    `,
  },
  {
    id: "partenariats",
    category: "KARFI HOLDING",
    title: "KARFI renforce son écosystème de partenaires",
    date: "02 Août 2026",
    image: "/images/actualites/actualite-3.jpg",
    content: `
      KARFI HOLDING travaille avec différents partenaires afin
      de développer de nouvelles opportunités.

      Ces collaborations permettent de renforcer notre expertise
      et d'accélérer nos différents projets.
    `,
  },
];

export default function ActualiteDetails() {
  const params = useParams();

  const article = actualites.find(
    (item) => item.id === params.id
  );

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-200 px-5">

        <div className="text-center">

          <h1 className="text-5xl font-black">
            404
          </h1>

          <p className="mt-3 text-base-content/50">
            Cette actualité n'existe pas.
          </p>

          <Link
            href="/actualites"
            className="btn btn-primary mt-6 rounded-xl"
          >
            Retour aux actualités
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200">

      <article>

        {/* IMAGE */}

        <div className="relative h-[55vh] min-h-[400px]">

          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full">

            <div className="mx-auto max-w-5xl px-5 pb-12">

              <div className="badge badge-primary mb-5">
                {article.category}
              </div>

              <h1 className="max-w-4xl text-4xl font-black text-white sm:text-6xl">
                {article.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-sm text-white/70">

                <CalendarDays size={16} />

                {article.date}

              </div>

            </div>

          </div>

        </div>

        {/* ARTICLE */}

        <div className="mx-auto max-w-4xl px-5 py-14">

          <div className="mb-10 flex flex-wrap gap-3">

            <Link
              href="/actualites"
              className="btn btn-outline rounded-xl"
            >
              <ArrowLeft size={16} />
              Toutes les actualités
            </Link>

            <button
              className="btn btn-primary rounded-xl"
              onClick={() => {
                navigator.share?.({
                  title: article.title,
                  text: article.title,
                  url: window.location.href,
                });
              }}
            >
              <Share2 size={16} />
              Partager
            </button>

          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="card border border-base-300 bg-base-100 shadow-xl"
          >

            <div className="card-body p-7 sm:p-12">

              <div className="space-y-6">

                {article.content
                  .trim()
                  .split("\n\n")
                  .map((paragraph, index) => (

                    <p
                      key={index}
                      className="text-base leading-8 text-base-content/70 sm:text-lg"
                    >
                      {paragraph.trim()}
                    </p>

                  ))}

              </div>

            </div>

          </motion.div>

        </div>

      </article>

    </main>
  );
}