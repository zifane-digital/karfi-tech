import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

const news = [
  {
    id: 1,
    title: "KARFI HOLDING poursuit son développement",
    description:
      "Découvrez les dernières initiatives et projets développés par KARFI HOLDING.",
    date: "12 Août 2026",
    image: "/images/actualites/actualite-1.jpeg",
  },
  {
    id: 2,
    title: "Innovation et transformation numérique",
    description:
      "KARFI TECH développe des solutions numériques adaptées aux entreprises et aux communautés.",
    date: "08 Août 2026",
    image: "/images/actualites/actualite-2.jpeg",
  },
  {
    id: 3,
    title: "Vers une agriculture plus moderne",
    description:
      "Nos initiatives agricoles visent à améliorer la production et la valorisation des ressources.",
    date: "02 Août 2026",
    image: "/images/actualites/actualite-3.jpeg",
  },
];

export default function ActualitesPage() {
  return (
    <main className="min-h-screen bg-base-100 pt-[73px]">

      <section className="bg-base-200 px-5 py-24">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="btn btn-ghost mb-8 rounded-xl"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>

          <div className="mb-14 text-center">

            <div className="badge badge-primary mb-5 gap-2 px-4 py-3">
              <Sparkles size={14} />
              ACTUALITÉS
            </div>

            <h1 className="text-4xl font-black sm:text-6xl">
              Les nouvelles de{" "}
              <span className="text-primary">
                KARFI.
              </span>
            </h1>

          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {news.map((item) => (
              <article
                key={item.id}
                className="card overflow-hidden border border-base-300 bg-base-100 shadow-lg"
              >

                <figure className="h-60">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </figure>

                <div className="card-body">

                  <p className="text-xs text-base-content/40">
                    {item.date}
                  </p>

                  <h2 className="card-title">
                    {item.title}
                  </h2>

                  <p className="text-sm leading-7 text-base-content/60">
                    {item.description}
                  </p>

                  <div className="card-actions mt-4">
                    <button className="btn btn-primary btn-sm rounded-xl">
                      Lire l'article
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}