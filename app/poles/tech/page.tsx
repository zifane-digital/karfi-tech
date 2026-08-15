"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sprout,
  Cpu,
  Sofa,
  GraduationCap,
  Building2,
} from "lucide-react";

const poles = [
  {
    name: "KARFI AGRO",
    slug: "agro",
    description:
      "Développement d'activités agricoles, agroalimentaires et solutions adaptées aux besoins du secteur.",
    icon: Sprout,
    image: "/images/poles/agro.jpg",
  },
  {
    name: "KARFI TECH",
    slug: "tech",
    description:
      "Solutions technologiques, numériques et innovantes pour accompagner la transformation des entreprises.",
    icon: Cpu,
    image: "/images/poles/tech.jpg",
  },
  {
    name: "KARFI MOBILIER",
    slug: "mobilier",
    description:
      "Conception, fabrication et commercialisation de solutions de mobilier adaptées aux particuliers et professionnels.",
    icon: Sofa,
    image: "/images/poles/mobilier.jpg",
  },
  {
    name: "KARFI FORMATION & INCUBATION",
    slug: "formation",
    description:
      "Formation, accompagnement des talents, entrepreneuriat et incubation de projets innovants.",
    icon: GraduationCap,
    image: "/images/poles/formation.jpg",
  },
];

export default function PolesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link href="/" className="group">
            <div className="text-xl font-extrabold tracking-tight">
              KARFI{" "}
              <span className="text-blue-600 transition group-hover:text-blue-500">
                HOLDING
              </span>
            </div>

            <p className="text-[9px] font-medium tracking-[0.25em] text-slate-400">
              PRODUIRE · INNOVER · CONSTRUIRE
            </p>
          </Link>

          <Link
            href="/"
            className="btn btn-sm rounded-full border-slate-200 bg-white px-5 shadow-sm transition hover:border-blue-600 hover:bg-blue-50"
          >
            Retour
          </Link>

        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-slate-950">

        {/* Lumières décoratives */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >

            {/* Badge */}
            <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300">
              <Building2 size={17} />
              KARFI HOLDING
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Nos{" "}
              <span className="text-blue-500">
                pôles d'activités
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Découvrez les différents pôles de KARFI HOLDING et les
              expertises qui contribuent à notre ambition de produire,
              innover et construire le développement de demain.
            </p>

          </motion.div>

        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Nos expertises
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Des activités complémentaires
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Chaque pôle possède son domaine d'expertise tout en participant
            à la vision globale de KARFI HOLDING.
          </p>

        </motion.div>

      </section>

      {/* =========================================================
          POLES
      ========================================================= */}
      <section className="pb-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-2">

            {poles.map((pole, index) => {

              const Icon = pole.icon;

              return (
                <motion.article
                  key={pole.slug}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  className="group overflow-hidden bg-white"
                >

                  {/* =================================================
                      IMAGE VITRINE
                  ================================================= */}
                  <div className="relative h-[360px] w-full overflow-hidden sm:h-[420px]">

                    <Image
                      src={pole.image}
                      alt={pole.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* Petit effet lumineux */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />

                    {/* Icône */}
                    <div className="absolute left-7 top-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:bg-blue-600">
                      <Icon size={26} />
                    </div>

                    {/* Numéro */}
                    <div className="absolute right-7 top-7 text-5xl font-black text-white/20">
                      0{index + 1}
                    </div>

                    {/* Nom directement sur l'image */}
                    <div className="absolute bottom-0 left-0 right-0 p-7">

                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                        Pôle {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                        {pole.name}
                      </h3>

                    </div>

                  </div>

                  {/* =================================================
                      CONTENU
                  ================================================= */}
                  <div className="px-1 pt-7">

                    <p className="max-w-xl text-base leading-8 text-slate-600">
                      {pole.description}
                    </p>

                    {/* Lien */}
                    <Link
                      href={`/poles/${pole.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-bold text-blue-600 transition-all duration-300 hover:gap-4 hover:text-blue-700"
                    >
                      Découvrir le pôle
                      <ArrowRight
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                  </div>

                </motion.article>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          BLOC VISION
      ========================================================= */}
      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Notre identité
            </p>

            <h2 className="mt-5 text-3xl font-extrabold sm:text-5xl">
              Produire · Innover · Construire
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              À travers ses différents pôles, KARFI HOLDING œuvre pour
              développer des activités créatrices de valeur et participer
              durablement au développement économique.
            </p>

          </motion.div>

        </div>

      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-14 sm:px-14"
        >

          {/* Décor */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                KARFI HOLDING
              </p>

              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                Découvrez notre groupe et ses expertises
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Explorez nos différents pôles et découvrez les projets,
                solutions et services développés par KARFI HOLDING.
              </p>

            </div>

            <Link
              href="/"
              className="btn rounded-full border-0 bg-blue-600 px-7 text-white hover:bg-blue-500"
            >
              Retour à l'accueil
              <ArrowRight size={18} />
            </Link>

          </div>

        </motion.div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} KARFI HOLDING. Tous droits réservés.
          </p>

          <p>
            PRODUIRE · INNOVER · CONSTRUIRE
          </p>

        </div>

      </footer>

    </main>
  );
}