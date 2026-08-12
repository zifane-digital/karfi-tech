"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Factory,
  GraduationCap,
  Landmark,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  Quote,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

/* =========================================================
   PÔLES
========================================================= */

const poles = [
  {
    id: "agro",
    name: "KARFI AGRO",
    category: "Agriculture & Production",
    description:
      "Développer une agriculture moderne, productive et durable à travers la production, la transformation et la valorisation des ressources.",
    icon: Leaf,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    image: "/images/poles/karfi-agro.jpeg",
    logo: "/images/logos/logo agro.jpeg",
  },
  {
    id: "tech",
    name: "KARFI TECH",
    category: "Technologie & Innovation",
    description:
      "Créer des solutions numériques et technologiques permettant aux entreprises et aux communautés d'accélérer leur transformation.",
    icon: Cpu,
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/20",
    image: "/images/poles/karfi-tech.jpeg",
    logo: "/images/logos/karfi-tech.jpeg",
  },
  {
    id: "mobilier",
    name: "KARFI MOBILIER",
    category: "Mobilier & Fabrication",
    description:
      "Concevoir et fabriquer des solutions de mobilier modernes, fonctionnelles et adaptées aux espaces professionnels et résidentiels.",
    icon: Factory,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    image: "/images/poles/karfi-mobilier.jpeg",
    logo: "/images/logos/logo-mobilier.jpeg",
  },
  {
    id: "formation",
    name: "KARFI FORMATION",
    category: "Formation & Incubation",
    description:
      "Former, accompagner et développer les compétences afin de transformer les idées et les talents en projets et opportunités.",
    icon: GraduationCap,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    image: "/images/poles/karfi-formation.jpeg",
    logo: "/images/logos/logo-mobilier.jpeg",
  },
];

/* =========================================================
   STATS
========================================================= */

const stats = [
  {
    value: "04",
    label: "Pôles d'activité",
  },
  {
    value: "01",
    label: "Vision commune",
  },
  {
    value: "∞",
    label: "Potentiel",
  },
  {
    value: "100%",
    label: "Engagement",
  },
];

/* =========================================================
   STEPS
========================================================= */

const steps = [
  {
    number: "01",
    title: "Identifier",
    description:
      "Comprendre les besoins, les opportunités et les défis de notre environnement.",
  },
  {
    number: "02",
    title: "Concevoir",
    description:
      "Transformer les idées en stratégies, produits et solutions concrètes.",
  },
  {
    number: "03",
    title: "Développer",
    description:
      "Mobiliser les talents, les ressources et la technologie pour réaliser les projets.",
  },
  {
    number: "04",
    title: "Créer de l'impact",
    description:
      "Mesurer la valeur créée et construire des solutions durables.",
  },
];

/* =========================================================
   TIMELINE
========================================================= */

const timeline = [
  {
    year: "01",
    title: "Vision",
    description:
      "La naissance d'une vision entrepreneuriale orientée vers la création de valeur.",
  },
  {
    year: "02",
    title: "Structuration",
    description:
      "Organisation des activités autour de pôles spécialisés et complémentaires.",
  },
  {
    year: "03",
    title: "Innovation",
    description:
      "Intégration de la technologie et de l'innovation au cœur des activités.",
  },
  {
    year: "04",
    title: "Expansion",
    description:
      "Développement de nouveaux projets, partenariats et opportunités.",
  },
];

/* =========================================================
   ACTUALITÉS
========================================================= */

const news = [
  {
    id: 1,
    category: "Actualité",
    title: "KARFI HOLDING poursuit son développement",
    description:
      "Découvrez les dernières initiatives et projets développés par KARFI HOLDING.",
    date: "12 Août 2026",
    image: "/images/actualites/actualite-1.jpeg",
  },
  {
    id: 2,
    category: "KARFI TECH",
    title: "Innovation et transformation numérique",
    description:
      "KARFI TECH développe des solutions numériques adaptées aux entreprises et aux communautés.",
    date: "08 Août 2026",
    image: "/images/actualites/actualite-2.jpeg",
  },
  {
    id: 3,
    category: "KARFI AGRO",
    title: "Vers une agriculture plus moderne",
    description:
      "Nos initiatives agricoles visent à améliorer la production et la valorisation des ressources.",
    date: "02 Août 2026",
    image: "/images/actualites/actualite-3.jpeg",
  },
];

/* =========================================================
   ÉQUIPE
========================================================= */

const team = [
  {
    name: "Nom du PDG",
    role: "Président Directeur Général",
    image: "/images/equipe/pdg.png",
    badge: "DIRECTION GÉNÉRALE",
    pdg: true,
  },
  {
    name: "Responsable KARFI AGRO",
    role: "Direction Agro",
    image: "/images/equipe/agro.jpeg",
    badge: "AGRO",
  },
  {
    name: "Responsable KARFI TECH",
    role: "Direction Technologie",
    image: "/images/equipe/tech.jpeg",
    badge: "TECH",
  },
  {
    name: "Responsable KARFI MOBILIER",
    role: "Direction Mobilier",
    image: "/images/equipe/mobilier.jpeg",
    badge: "MOBILIER",
  },
  {
    name: "Responsable KARFI FORMATION",
    role: "Direction Formation",
    image: "/images/equipe/formation.jpeg",
    badge: "FORMATION",
  },
];

/* =========================================================
   PARTENAIRES
========================================================= */

const partners = [
  {
    name: "BAGRI-Niger",
    image: "/images/partenaires/bagri.webp",
  },
  {
    name: "NITA TRANSFERT D'ARGENT",
    image: "/images/partenaires/nita.webp",
  },
  {
    name: "AMANA TRANSFERT D'ARGENT",
    image: "/images/partenaires/amanata.webp",
  },
  {
    name: "UDDM",
    image: "/images/partenaires/uddm.webp",
  },
  {
    name: "PISEN-Niger",
    image: "/images/partenaires/pis.webp",
  },
  {
    name: "Agro",
    image: "/images/partenaires/agro.jpg",
  },
];

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mobilePoles, setMobilePoles] = useState(false);
  const [activePole, setActivePole] = useState("agro");

  const currentPole =
    poles.find((pole) => pole.id === activePole) ?? poles[0];

  const CurrentPoleIcon = currentPole.icon;

  /* =======================================================
     SCROLL
  ======================================================= */

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenu(false);
    setMobileAbout(false);
    setMobilePoles(false);
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const goToPole = (id: string) => {
    setMobileMenu(false);
    setMobileAbout(false);
    setMobilePoles(false);

    router.push(`/${id}`);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-base-100 pt-[73px] text-base-content">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="fixed inset-x-0 top-0 z-[100] border-b border-base-300/60 bg-base-100/90 backdrop-blur-xl">

        <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">

          {/* LOGO */}

          <div className="flex-1">

            <button
              onClick={() => router.push("/")}
              className="group flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-105">

                <Landmark size={22} />

              </div>

              <div className="text-left">

                <p className="font-black tracking-tight">
                  KARFI
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-base-content/40">
                  HOLDING
                </p>

              </div>

            </button>

          </div>

          {/* =====================================================
              DESKTOP NAVBAR
          ===================================================== */}

          <div className="hidden lg:flex">

            <nav className="flex items-center gap-1">

              {/* ACCUEIL */}

              <button
                onClick={() => scrollTo("accueil")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Accueil
              </button>

              {/* =================================================
                  À PROPOS
              ================================================= */}

              <div className="dropdown dropdown-end">

                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm gap-1 rounded-xl"
                >

                  À propos

                  <ChevronDown size={15} />

                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-[200] mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
                >

                  <li>
                    <button onClick={() => scrollTo("apropos")}>

                      <Landmark size={16} />

                      <span>
                        Présentation
                      </span>

                    </button>
                  </li>

                  <li>
                    <button onClick={() => scrollTo("apropos")}>

                      <Sparkles size={16} />

                      <span>
                        Notre vision
                      </span>

                    </button>
                  </li>

                  <li>
                    <button onClick={() => scrollTo("apropos")}>

                      <CheckCircle2 size={16} />

                      <span>
                        Notre mission
                      </span>

                    </button>
                  </li>

                  <li>
                    <button onClick={() => scrollTo("parcours")}>

                      <ArrowRight size={16} />

                      <span>
                        Notre parcours
                      </span>

                    </button>
                  </li>

                  <li>
                    <button onClick={() => scrollTo("equipe")}>

                      <Users size={16} />

                      <span>
                        Notre équipe
                      </span>

                    </button>
                  </li>

                </ul>

              </div>

              {/* ACTUALITÉS */}

              <button
                onClick={() => scrollTo("actualites")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Actualités
              </button>

              {/* =================================================
                  NOS PÔLES
              ================================================= */}

              <div className="dropdown dropdown-end">

                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm gap-1 rounded-xl"
                >

                  Nos pôles

                  <ChevronDown size={15} />

                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-[200] mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl"
                >

                  <li>

                    <button onClick={() => goToPole("agro")}>

                      <Leaf
                        size={17}
                        className="text-success"
                      />

                      <div className="flex flex-col items-start">

                        <span className="font-bold">
                          KARFI AGRO
                        </span>

                        <span className="text-xs opacity-50">
                          Agriculture & Production
                        </span>

                      </div>

                    </button>

                  </li>

                  <li>

                    <button onClick={() => goToPole("tech")}>

                      <Cpu
                        size={17}
                        className="text-info"
                      />

                      <div className="flex flex-col items-start">

                        <span className="font-bold">
                          KARFI TECH
                        </span>

                        <span className="text-xs opacity-50">
                          Technologie & Innovation
                        </span>

                      </div>

                    </button>

                  </li>

                  <li>

                    <button onClick={() => goToPole("mobilier")}>

                      <Factory
                        size={17}
                        className="text-warning"
                      />

                      <div className="flex flex-col items-start">

                        <span className="font-bold">
                          KARFI MOBILIER
                        </span>

                        <span className="text-xs opacity-50">
                          Mobilier & Fabrication
                        </span>

                      </div>

                    </button>

                  </li>

                  <li>

                    <button onClick={() => goToPole("formation")}>

                      <GraduationCap
                        size={17}
                        className="text-secondary"
                      />

                      <div className="flex flex-col items-start">

                        <span className="font-bold">
                          KARFI FORMATION
                        </span>

                        <span className="text-xs opacity-50">
                          Formation & Incubation
                        </span>

                      </div>

                    </button>

                  </li>

                  <div className="divider my-1" />

                  <li>

                    <button
                      onClick={() => scrollTo("poles")}
                      className="text-primary"
                    >

                      Voir tous les pôles

                      <ArrowRight size={15} />

                    </button>

                  </li>

                </ul>

              </div>

              {/* PARCOURS */}

              <button
                onClick={() => scrollTo("parcours")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Parcours
              </button>

              {/* ÉQUIPE */}

              <button
                onClick={() => scrollTo("equipe")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Équipe
              </button>

              {/* PARTENAIRES */}

              <button
                onClick={() => scrollTo("partenaires")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Partenaires
              </button>

              {/* CONTACT */}

              <button
                onClick={() => scrollTo("contact")}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                Contact
              </button>

            </nav>

          </div>

          {/* =====================================================
              ESPACE PROFESSIONNEL
          ===================================================== */}

          <div className="hidden flex-1 justify-end lg:flex">

            <button
              onClick={() => router.push("/login")}
              className="btn btn-primary rounded-xl"
            >

              Espace Admin

              <ArrowRight size={16} />

            </button>

          </div>

          {/* =====================================================
              MOBILE BUTTON
          ===================================================== */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="btn btn-circle btn-ghost lg:hidden"
            aria-label="Menu"
          >

            {mobileMenu ? (
              <X />
            ) : (
              <Menu />
            )}

          </button>

        </div>

        {/* =======================================================
            MOBILE MENU
        ======================================================= */}

        {mobileMenu && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            transition={{
              duration: 0.25,
            }}
            className="border-t border-base-300 bg-base-100 lg:hidden"
          >

            <nav className="mx-auto flex max-w-7xl flex-col p-4">

              {/* ACCUEIL */}

              <button
                onClick={() => scrollTo("accueil")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Accueil
              </button>

              {/* =================================================
                  MOBILE À PROPOS
              ================================================= */}

              <div className="w-full">

                <button
                  onClick={() =>
                    setMobileAbout(!mobileAbout)
                  }
                  className="btn btn-ghost w-full justify-between rounded-xl"
                >

                  <span>
                    À propos
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      mobileAbout
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {mobileAbout && (

                  <div className="ml-4 mt-1 flex flex-col border-l border-base-300 pl-3">

                    <button
                      onClick={() => scrollTo("apropos")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >
                      Présentation
                    </button>

                    <button
                      onClick={() => scrollTo("apropos")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >
                      Notre vision
                    </button>

                    <button
                      onClick={() => scrollTo("apropos")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >
                      Notre mission
                    </button>

                    <button
                      onClick={() => scrollTo("parcours")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >
                      Notre parcours
                    </button>

                    <button
                      onClick={() => scrollTo("equipe")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >
                      Notre équipe
                    </button>

                  </div>

                )}

              </div>

              {/* ACTUALITÉS */}

              <button
                onClick={() => scrollTo("actualites")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Actualités
              </button>

              {/* =================================================
                  MOBILE PÔLES
              ================================================= */}

              <div className="w-full">

                <button
                  onClick={() =>
                    setMobilePoles(!mobilePoles)
                  }
                  className="btn btn-ghost w-full justify-between rounded-xl"
                >

                  <span>
                    Nos pôles
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      mobilePoles
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {mobilePoles && (

                  <div className="ml-4 mt-1 flex flex-col border-l border-base-300 pl-3">

                    <button
                      onClick={() => goToPole("agro")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >

                      <Leaf
                        size={16}
                        className="text-success"
                      />

                      KARFI AGRO

                    </button>

                    <button
                      onClick={() => goToPole("tech")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >

                      <Cpu
                        size={16}
                        className="text-info"
                      />

                      KARFI TECH

                    </button>

                    <button
                      onClick={() => goToPole("mobilier")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >

                      <Factory
                        size={16}
                        className="text-warning"
                      />

                      KARFI MOBILIER

                    </button>

                    <button
                      onClick={() => goToPole("formation")}
                      className="btn btn-ghost justify-start rounded-xl text-sm"
                    >

                      <GraduationCap
                        size={16}
                        className="text-secondary"
                      />

                      KARFI FORMATION

                    </button>

                    <button
                      onClick={() => scrollTo("poles")}
                      className="btn btn-ghost justify-start rounded-xl text-sm text-primary"
                    >

                      Voir tous les pôles

                      <ArrowRight size={14} />

                    </button>

                  </div>

                )}

              </div>

              {/* PARCOURS */}

              <button
                onClick={() => scrollTo("parcours")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Parcours
              </button>

              {/* ÉQUIPE */}

              <button
                onClick={() => scrollTo("equipe")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Équipe
              </button>

              {/* PARTENAIRES */}

              <button
                onClick={() => scrollTo("partenaires")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Partenaires
              </button>

              {/* CONTACT */}

              <button
                onClick={() => scrollTo("contact")}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Contact
              </button>

              {/* =================================================
                  ESPACE PROFESSIONNEL MOBILE
              ================================================= */}

              <div className="divider" />

              <button
                onClick={() => {
                  setMobileMenu(false);
                  router.push("/login");
                }}
                className="btn btn-primary rounded-xl"
              >

                Espace Admin

                <ArrowRight size={16} />

              </button>

            </nav>

          </motion.div>

        )}

      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        id="accueil"
        className="hero relative min-h-screen overflow-hidden bg-base-200"
      >

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

        <div className="hero-content relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-20">

          <div className="grid w-full items-center gap-14 lg:grid-cols-2">

            {/* TEXTE */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
            >

              <div className="badge badge-primary mb-6 gap-2 px-4 py-4">

                <Sparkles size={14} />

                GROUPE · INNOVATION · IMPACT

              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">

                Nous créons.

                <span className="block text-primary">
                  Nous innovons.
                </span>

                <span className="block">
                  Nous construisons.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-base-content/60 sm:text-lg">

                KARFI HOLDING rassemble plusieurs expertises autour
                d'une même ambition : transformer les idées,
                les ressources et les talents en projets créateurs
                de valeur.

              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                <button
                  onClick={() => scrollTo("poles")}
                  className="btn btn-primary btn-lg rounded-2xl shadow-xl shadow-primary/20"
                >

                  Découvrir nos pôles

                  <ArrowRight />

                </button>

                <button
                  onClick={() => scrollTo("apropos")}
                  className="btn btn-outline btn-lg rounded-2xl"
                >

                  À propos de nous

                </button>

              </div>

            </motion.div>

            {/* HERO 3D */}

            <div className="relative flex min-h-[420px] items-center justify-center">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[330px] w-[330px] rounded-full border border-primary/15 border-dashed sm:h-[500px] sm:w-[500px]"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[250px] w-[250px] rounded-full border border-secondary/20 sm:h-[390px] sm:w-[390px]"
              />

              <motion.div
                animate={{
                  y: [0, -18, 0],
                  rotateX: [0, 6, 0],
                  rotateY: [0, -8, 0],
                  rotateZ: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
                className="relative z-20"
              >

                <div className="relative flex h-64 w-64 items-center justify-center rounded-[3rem] border border-primary/20 bg-base-100/90 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:h-80 sm:w-80">

                  <div className="absolute inset-5 rounded-[2.5rem] border border-primary/10" />

                  <div className="text-center">

                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-content shadow-xl shadow-primary/30"
                    >

                      <Landmark size={38} />

                    </motion.div>

                    <p className="mt-5 text-3xl font-black">
                      KARFI
                    </p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.4em] text-base-content/40">
                      HOLDING
                    </p>

                  </div>

                </div>

              </motion.div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute left-0 top-8 z-30 hidden rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl sm:block"
              >

                <Leaf className="text-success" />

                <p className="mt-2 text-xs font-bold">
                  KARFI AGRO
                </p>

              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute bottom-8 right-0 z-30 hidden rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl sm:block"
              >

                <Cpu className="text-info" />

                <p className="mt-2 text-xs font-bold">
                  KARFI TECH
                </p>

              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute right-4 top-1/2 z-30 hidden rounded-full bg-primary p-4 text-primary-content shadow-xl lg:flex"
              >

                <Network />

              </motion.div>

            </div>

          </div>

          {/* =====================================================
              ACTUALITÉS + VIDÉO
          ===================================================== */}

          <div className="grid w-full gap-6 lg:grid-cols-[1.4fr_1fr]">

            {/* ACTUALITÉS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="overflow-hidden rounded-[2rem] border border-base-300/70 bg-base-100/80 p-5 shadow-2xl backdrop-blur-xl"
            >

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <div className="badge badge-primary badge-outline mb-2">
                    Actualités
                  </div>

                  <h2 className="text-2xl font-black">
                    Nos dernières activités
                  </h2>

                </div>

                <button
                  onClick={() => scrollTo("actualites")}
                  className="btn btn-ghost btn-sm rounded-xl"
                >

                  Voir tout

                  <ArrowRight size={15} />

                </button>

              </div>

              <div className="grid gap-4 sm:grid-cols-3">

                {news.map((item, index) => (

                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.7 + index * 0.15,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-all hover:border-primary/30 hover:shadow-xl"
                  >

                    <div className="relative h-32 overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3">

                        <span className="badge badge-primary badge-sm">
                          {item.category}
                        </span>

                      </div>

                    </div>

                    <div className="p-4">

                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
                        {item.date}
                      </p>

                      <h3 className="line-clamp-2 text-sm font-black">
                        {item.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-base-content/50">
                        {item.description}
                      </p>

                      <button
                        onClick={() => scrollTo("actualites")}
                        className="btn btn-link btn-xs mt-3 px-0 text-primary"
                      >

                        Lire plus

                        <ArrowRight size={12} />

                      </button>

                    </div>

                  </motion.article>

                ))}

              </div>

            </motion.div>

            {/* VIDÉO */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.7,
                duration: 0.8,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-base-300/70 bg-neutral shadow-2xl"
            >

              <div className="relative min-h-[270px]">

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/video/episode-1.mp4"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105"
                >

                  <source
                    src="/videos/episode-1.mp4"
                    type="video/mp4"
                  />

                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl"
                  >

                    <div className="ml-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-content shadow-xl">

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>

                    </div>

                  </motion.div>

                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                  <div className="mb-3 flex items-center gap-2">

                    <span className="badge badge-primary">
                      VIDÉO
                    </span>

                    <span className="text-xs text-white/60">
                      KARFI HOLDING
                    </span>

                  </div>

                  <h2 className="text-2xl font-black">
                    Découvrez notre vision
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Découvrez KARFI HOLDING, nos pôles,
                    nos projets et notre ambition.
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

        <motion.button
          onClick={() => scrollTo("apropos")}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center text-base-content/30 md:flex"
        >

          <span className="text-[10px] uppercase tracking-[0.3em]">
            Découvrir
          </span>

          <ChevronDown size={18} />

        </motion.button>

      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="bg-primary px-5 py-12 text-primary-content">

        <div className="stats stats-vertical mx-auto w-full max-w-7xl bg-transparent shadow-none sm:stats-horizontal">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="stat place-items-center border-primary-content/10 text-center"
            >

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-title text-primary-content/70">
                {stat.label}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================================================
          À PROPOS
      ========================================================= */}

      <section
        id="apropos"
        className="scroll-mt-24 bg-base-100 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>

              <div className="badge badge-outline mb-5 gap-2 px-4 py-3">

                <Landmark size={14} />

                À PROPOS

              </div>

              <h2 className="text-4xl font-black sm:text-5xl">

                Une holding construite autour de

                <span className="text-primary">
                  {" "}l'action.
                </span>

              </h2>

              <p className="mt-6 leading-8 text-base-content/60">

                KARFI HOLDING développe un écosystème
                entrepreneurial regroupant plusieurs domaines
                complémentaires.

              </p>

              <p className="mt-4 leading-8 text-base-content/60">

                Notre objectif est de créer des entreprises,
                des solutions, des compétences et des partenariats
                capables de produire un impact réel.

              </p>

              <div className="mt-7 flex flex-wrap gap-2">

                <div className="badge badge-primary badge-lg">
                  Innovation
                </div>

                <div className="badge badge-secondary badge-lg">
                  Production
                </div>

                <div className="badge badge-accent badge-lg">
                  Formation
                </div>

                <div className="badge badge-outline badge-lg">
                  Développement
                </div>

              </div>

            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-200">

              <img
                src="/images/apropos/apropos.jpeg"
                alt="À propos de KARFI HOLDING"
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          ACTUALITÉS
      ========================================================= */}

      <section
        id="actualites"
        className="scroll-mt-24 bg-base-200 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="badge badge-primary mb-4 gap-2 px-4 py-3">

                <Sparkles size={14} />

                ACTUALITÉS

              </div>

              <h2 className="text-4xl font-black sm:text-5xl">

                Les nouvelles de

                <span className="text-primary">
                  {" "}KARFI.
                </span>

              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-base-content/50">

                Retrouvez nos dernières activités, nos projets,
                nos événements et les actualités de nos différents pôles.

              </p>

            </div>

            <button className="btn btn-primary rounded-xl">

              Toutes les actualités

              <ArrowRight size={16} />

            </button>

          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {news.map((item, index) => (

              <motion.article
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="card overflow-hidden border border-base-300 bg-base-100 shadow-lg transition-shadow hover:shadow-2xl"
              >

                <figure className="relative h-60 overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 hover:scale-110"
                  />

                  <div className="absolute left-4 top-4">

                    <span className="badge badge-primary">
                      {item.category}
                    </span>

                  </div>

                </figure>

                <div className="card-body">

                  <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">
                    {item.date}
                  </p>

                  <h3 className="card-title text-xl">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-base-content/55">
                    {item.description}
                  </p>

                  <div className="card-actions mt-4">

                    <button className="btn btn-primary btn-sm rounded-xl">

                      Lire l'article

                      <ArrowRight size={14} />

                    </button>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>

      <div className="divider mx-auto max-w-7xl px-5">
        NOTRE ÉCOSYSTÈME
      </div>

      {/* =========================================================
          PÔLES
      ========================================================= */}

      <section
        id="poles"
        className="scroll-mt-24 bg-base-100 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-3xl text-center">

            <div className="badge badge-primary mb-5 px-4 py-3">
              NOS PÔLES
            </div>

            <h2 className="text-4xl font-black sm:text-5xl">

              Quatre expertises.

              <span className="text-primary">
                {" "}Une vision.
              </span>

            </h2>

            <p className="mt-5 leading-8 text-base-content/55">

              Chaque pôle possède sa propre identité et son
              domaine d'expertise tout en restant connecté
              à l'écosystème KARFI HOLDING.

            </p>

          </div>

          {/* TABS */}

          <div
            role="tablist"
            className="tabs tabs-boxed mx-auto mb-8 max-w-4xl justify-center gap-1 bg-base-200 p-2"
          >

            {poles.map((pole) => {

              const Icon = pole.icon;

              return (

                <button
                  key={pole.id}
                  role="tab"
                  onClick={() => setActivePole(pole.id)}
                  className={`tab h-auto gap-2 rounded-xl px-4 py-3 ${
                    activePole === pole.id
                      ? "tab-active"
                      : ""
                  }`}
                >

                  <Icon size={16} />

                  <span className="hidden sm:inline">
                    {pole.name.replace("KARFI ", "")}
                  </span>

                </button>

              );

            })}

          </div>

          {/* POLE */}

          <motion.div
            key={currentPole.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl lg:card-side"
          >

            <figure className="relative min-h-[320px] lg:w-1/2">

              <img
                src={currentPole.image}
                alt={currentPole.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6">

                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-xl">

                  <CurrentPoleIcon size={28} />

                </div>

                <h3 className="text-3xl font-black text-white">
                  {currentPole.name}
                </h3>

              </div>

            </figure>

            <div className="card-body justify-center p-7 lg:p-12">

              <div
                className={`badge ${currentPole.bg} ${currentPole.color} ${currentPole.border}`}
              >
                {currentPole.category}
              </div>

              <h3 className="card-title mt-3 text-3xl">
                {currentPole.name}
              </h3>

              <p className="mt-2 leading-8 text-base-content/55">
                {currentPole.description}
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="avatar">

                  <div className="w-16 rounded-2xl border border-base-300 bg-base-100 p-2">

                    <img
                      src={currentPole.logo}
                      alt={`Logo ${currentPole.name}`}
                    />

                  </div>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wider text-base-content/40">
                    Entité
                  </p>

                  <p className="font-bold">
                    {currentPole.name}
                  </p>

                </div>

              </div>

              <div className="card-actions mt-7">

                <button
                  onClick={() => router.push(`/${currentPole.id}`)}
                  className="btn btn-primary rounded-xl"
                >

                  Découvrir le pôle

                  <ArrowRight size={16} />

                </button>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =========================================================
          MÉTHODE
      ========================================================= */}

      <section className="bg-base-100 px-5 py-24 sm:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mb-12">

            <div className="badge badge-secondary mb-5 px-4 py-3">
              NOTRE MÉTHODE
            </div>

            <h2 className="text-4xl font-black sm:text-5xl">

              De l'idée à

              <span className="text-primary">
                {" "}l'impact.
              </span>

            </h2>

          </div>

          <ul className="steps steps-vertical w-full lg:steps-horizontal">

            {steps.map((step) => (

              <li
                key={step.number}
                className="step step-primary"
              >

                <div className="mt-6 max-w-xs text-left lg:text-center">

                  <span className="text-xs font-bold text-primary">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-xl font-black">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-base-content/50">
                    {step.description}
                  </p>

                </div>

              </li>

            ))}

          </ul>

        </div>

      </section>

      {/* =========================================================
          PARCOURS
      ========================================================= */}

      <section
        id="parcours"
        className="scroll-mt-24 bg-base-200 px-5 py-24 sm:px-8"
      >

        <div className="mx-auto max-w-5xl">

          <div className="mb-14 text-center">

            <div className="badge badge-primary mb-5 px-4 py-3">
              NOTRE PARCOURS
            </div>

            <h2 className="text-4xl font-black sm:text-5xl">

              Une histoire en

              <span className="text-primary">
                {" "}construction.
              </span>

            </h2>

          </div>

          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">

            {timeline.map((item, index) => (

              <li key={item.year}>

                {index !== 0 && (
                  <hr className="bg-primary" />
                )}

                <div className="timeline-middle">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-content shadow-lg">

                    <CheckCircle2 size={18} />

                  </div>

                </div>

                <div
                  className={`mb-10 ${
                    index % 2 === 0
                      ? "timeline-start md:text-end"
                      : "timeline-end"
                  }`}
                >

                  <time className="font-mono text-sm text-primary">
                    ÉTAPE {item.year}
                  </time>

                  <div className="mt-2 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">

                    <h3 className="text-xl font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-base-content/50">
                      {item.description}
                    </p>

                  </div>

                </div>

                {index !== timeline.length - 1 && (
                  <hr className="bg-primary" />
                )}

              </li>

            ))}

          </ul>

        </div>

      </section>

      {/* =========================================================
          ÉQUIPE
      ========================================================= */}

      <section
        id="equipe"
        className="relative overflow-hidden bg-base-100 px-5 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-3xl text-center">

            <div className="badge badge-primary badge-outline mb-4 gap-2 px-4 py-3">

              <Users size={15} />

              Notre équipe

            </div>

            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">

              Une équipe derrière

              <span className="text-primary">
                {" "}une vision.
              </span>

            </h2>

            <p className="mt-5 text-base leading-7 text-base-content/60">

              KARFI HOLDING s'appuie sur une équipe
              multidisciplinaire réunie autour d'une même
              ambition : construire, innover et créer de la valeur.

            </p>

          </div>

          {/* PDG */}

          <div className="flex flex-col items-center">

            <motion.div
              initial={{
                opacity: 0,
                y: -40,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              whileHover={{
                y: -8,
              }}
              className="relative z-10"
            >

              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" />

              <div className="card w-[290px] border border-primary/20 bg-base-100 shadow-2xl shadow-primary/10">

                <figure className="px-6 pt-6">

                  <div className="avatar">

                    <div className="w-32 rounded-3xl ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100">

                      <img
                        src="/images/equipe/pdg.png"
                        alt="PDG KARFI HOLDING"
                      />

                    </div>

                  </div>

                </figure>

                <div className="card-body items-center text-center">

                  <div className="badge badge-primary">
                    DIRECTION GÉNÉRALE
                  </div>

                  <h3 className="card-title mt-1 text-xl">
                    Nom du PDG
                  </h3>

                  <p className="text-sm font-medium text-base-content/50">
                    Président Directeur Général
                  </p>

                  <div className="divider my-1" />

                  <p className="text-xs leading-5 text-base-content/50">
                    Vision stratégique et développement
                    de KARFI HOLDING.
                  </p>

                </div>

              </div>

            </motion.div>

            <div className="hidden h-16 w-px bg-primary/30 md:block" />

            <div className="hidden h-px w-3/4 bg-primary/20 md:block" />

            <div className="mt-10 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {team.slice(1).map((member, index) => (

                <motion.div
                  key={member.badge}
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
                    delay: index * 0.12,
                    duration: 0.6,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="card border border-base-300 bg-base-100 shadow-lg transition-shadow hover:shadow-2xl"
                >

                  <figure className="px-5 pt-5">

                    <div className="avatar">

                      <div className="w-24 rounded-2xl ring-2 ring-primary/10">

                        <img
                          src={member.image}
                          alt={member.name}
                        />

                      </div>

                    </div>

                  </figure>

                  <div className="card-body items-center px-5 text-center">

                    <div className="badge badge-outline badge-primary">
                      {member.badge}
                    </div>

                    <h3 className="card-title text-base">
                      {member.name}
                    </h3>

                    <p className="text-xs text-base-content/50">
                      {member.role}
                    </p>

                    <button className="btn btn-ghost btn-xs mt-3">
                      Voir le profil
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>

{/* =========================================================
    PARTENAIRES
========================================================= */}

<section
  id="partenaires"
  className="overflow-hidden border-t border-base-300 bg-base-200 py-24"
>
  <div className="mx-auto max-w-7xl px-5">

    {/* TITRE */}
    <div className="mx-auto mb-14 max-w-2xl text-center">

      <div className="badge badge-secondary badge-outline mb-4 px-4 py-3">
        Nos partenaires
      </div>

      <h2 className="text-4xl font-black sm:text-5xl">
        Ils avancent avec
        <span className="text-secondary">
          {" "}KARFI.
        </span>
      </h2>

      <p className="mt-5 text-base leading-7 text-base-content/50">
        Des partenaires qui contribuent à notre développement,
        à notre innovation et à notre impact.
      </p>

    </div>
  </div>

  {/* =====================================================
      CARROUSEL LOGOS
  ===================================================== */}

  <div className="relative w-full overflow-hidden">

    {/* Dégradé gauche */}
    <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-base-200 to-transparent" />

    {/* Dégradé droite */}
    <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-base-200 to-transparent" />

    {/* ANIMATION */}
    <div className="flex w-max animate-partners">

      {/* PREMIÈRE SÉRIE */}
      <div className="flex shrink-0">

        {partners.map((partner, index) => (
          <div
            key={`partner-1-${index}`}
            className="mx-3 flex h-28 w-52 shrink-0 items-center justify-center rounded-3xl border border-base-300 bg-base-100 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="max-h-16 max-w-[150px] object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}

      </div>

      {/* DEUXIÈME SÉRIE
          indispensable pour une boucle continue */}
      <div className="flex shrink-0">

        {partners.map((partner, index) => (
          <div
            key={`partner-2-${index}`}
            className="mx-3 flex h-28 w-52 shrink-0 items-center justify-center rounded-3xl border border-base-300 bg-base-100 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <img
              src={partner.image}
              alt={partner.name}
              className="max-h-16 max-w-[150px] object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}

      </div>

    </div>

  </div>

</section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section
        id="contact"
        className="scroll-mt-24 px-5 py-24 sm:px-8"
      >

        <div className="hero overflow-hidden rounded-[2rem] bg-primary text-primary-content">

          <div className="hero-content relative w-full max-w-5xl py-16 text-center">

            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <div className="relative z-10">

              <Quote
                size={40}
                className="mx-auto mb-6 opacity-50"
              />

              <h2 className="text-4xl font-black sm:text-5xl">

                Construisons ensemble

                <span className="block">
                  les projets de demain.
                </span>

              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-8 text-primary-content/75">

                Vous souhaitez collaborer avec KARFI HOLDING,
                développer un projet ou rejoindre notre écosystème ?

              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">

                <button className="btn btn-neutral rounded-xl">

                  <Phone size={17} />

                  Nous contacter

                </button>

                <button className="btn btn-outline rounded-xl border-primary-content/40 text-primary-content hover:border-primary-content hover:bg-primary-content hover:text-primary">

                  <Mail size={17} />

                  Envoyer un message

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-base-300 bg-neutral text-neutral-content">

        <div className="mx-auto max-w-7xl px-5 py-16">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* IDENTITÉ */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content">

                  <Landmark size={24} />

                </div>

                <div>

                  <p className="text-lg font-black">
                    KARFI
                  </p>

                  <p className="text-[10px] font-bold tracking-[0.3em] text-neutral-content/40">
                    HOLDING
                  </p>

                </div>

              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-content/60">

                Un groupe diversifié qui développe des solutions
                dans l'agriculture, la technologie, le mobilier
                et la formation.

              </p>

              {/* RÉSEAUX */}

              <div className="mt-6">

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-content/40">
                  Suivez-nous
                </p>

                <div className="flex gap-2">

                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-ghost"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={16} />
                  </a>

                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-ghost"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={17} />
                  </a>

                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-ghost"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn size={16} />
                  </a>

                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-ghost"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={17} />
                  </a>

                  <a
                    href="#"
                    className="btn btn-circle btn-sm btn-ghost"
                    aria-label="TikTok"
                  >
                    <FaTiktok size={16} />
                  </a>

                </div>

              </div>

            </div>

            {/* NAVIGATION */}

            <div>

              <h3 className="footer-title text-neutral-content">
                Navigation
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm">

                {[
                  ["accueil", "Accueil"],
                  ["apropos", "À propos"],
                  ["actualites", "Actualités"],
                  ["equipe", "Notre équipe"],
                  ["partenaires", "Partenaires"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (

                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="link link-hover text-left"
                  >
                    {label}
                  </button>

                ))}

              </div>

            </div>

            {/* PÔLES */}

            <div>

              <h3 className="footer-title text-neutral-content">
                Nos pôles
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-sm">

                <button
                  onClick={() => router.push("/agro")}
                  className="link link-hover text-left"
                >
                  🌱 KARFI AGRO
                </button>

                <button
                  onClick={() => router.push("/tech")}
                  className="link link-hover text-left"
                >
                  💻 KARFI TECH
                </button>

                <button
                  onClick={() => router.push("/mobilier")}
                  className="link link-hover text-left"
                >
                  🏗️ KARFI MOBILIER
                </button>

                <button
                  onClick={() => router.push("/formation")}
                  className="link link-hover text-left"
                >
                  🎓 KARFI FORMATION
                </button>

              </div>

            </div>

            {/* CONTACT */}

            <div>

              <h3 className="footer-title text-neutral-content">
                Contact
              </h3>

              <div className="mt-4 flex flex-col gap-4 text-sm">

                <div className="flex gap-3">

                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <span className="text-neutral-content/60">
                    Niger
                  </span>

                </div>

                <div className="flex gap-3">

                  <Phone
                    size={18}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-neutral-content/60">
                    +227 96 91 39 44
                  </span>

                </div>

                <div className="flex gap-3">

                  <Mail
                    size={18}
                    className="shrink-0 text-primary"
                  />

                  <span className="text-neutral-content/60">
                    contact@karfi.com
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="divider opacity-20" />

          {/* NEWSLETTER */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="font-bold">
                Restez informé de nos activités
              </h3>

              <p className="mt-1 text-sm text-neutral-content/50">
                Recevez nos actualités et annonces importantes.
              </p>

            </div>

            <div className="join w-full max-w-md">

              <input
                type="email"
                placeholder="Votre adresse email"
                className="input input-bordered join-item w-full bg-base-100 text-base-content"
              />

              <button className="btn btn-primary join-item">
                S'abonner
              </button>

            </div>

          </div>

          <div className="divider opacity-20" />

          {/* COPYRIGHT */}

          <div className="flex flex-col gap-3 text-xs text-neutral-content/40 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} KARFI HOLDING.
              Tous droits réservés.
            </p>

            <div className="flex gap-5">

              <a className="link link-hover">
                Politique de confidentialité
              </a>

              <a className="link link-hover">
                Mentions légales
              </a>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}