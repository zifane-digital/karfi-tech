"use client";

import {
  ArrowLeft,
  Play,
  Share2,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { motion } from "framer-motion";

const videos = [
  {
    title: "Découvrez KARFI HOLDING",
    description:
      "Présentation de notre vision, de nos pôles et de notre ambition.",
    thumbnail: "/images/videos/video-1.jpg",
    video: "/videos/karfi-presentation.mp4",
  },
  {
    title: "Nos activités",
    description:
      "Découvrez les différents domaines dans lesquels KARFI intervient.",
    thumbnail: "/images/videos/video-2.jpg",
    video: "/videos/karfi-activites.mp4",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-base-200">

      <section className="bg-base-100 px-5 py-24">

        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="btn btn-ghost mb-10 rounded-xl"
          >
            <ArrowLeft size={17} />
            Retour
          </Link>

          <div className="badge badge-primary gap-2 px-4 py-3">
            <Sparkles size={14} />
            KARFI MEDIA
          </div>

          <h1 className="mt-6 text-5xl font-black sm:text-6xl">
            Nos
            <span className="text-primary">
              {" "}vidéos.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-base-content/55">
            Découvrez nos projets, nos activités et les moments
            importants de KARFI HOLDING.
          </p>

        </div>

      </section>

      <section className="px-5 py-20">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">

          {videos.map((video, index) => (

            <motion.article
              key={video.title}
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
                delay: index * 0.15,
              }}
              className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl"
            >

              <figure className="relative aspect-video">

                <video
                  controls
                  poster={video.thumbnail}
                  className="h-full w-full object-cover"
                >
                  <source
                    src={video.video}
                    type="video/mp4"
                  />
                </video>

              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {video.title}
                </h2>

                <p className="text-sm leading-7 text-base-content/50">
                  {video.description}
                </p>

                <div className="card-actions mt-4">

                  <button className="btn btn-primary rounded-xl">
                    <Play size={16} />
                    Regarder
                  </button>

                  <button className="btn btn-ghost btn-circle">
                    <Share2 size={17} />
                  </button>

                </div>

              </div>

            </motion.article>

          ))}

        </div>

      </section>

    </main>
  );
}