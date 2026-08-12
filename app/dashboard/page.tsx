
"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";

import { TypeAnimation } from "react-type-animation";

import { motion } from "framer-motion";

// =====================================================
// TYPES
// =====================================================

type Filiale = {
  id: string;
  code: string;
  nom: string;
  description: string | null;
  active: boolean;
  createdAt: string;
};

type DashboardUser = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  role: string;
  active: boolean;
  filialeId: string | null;

  filiale: {
    id: string;
    code: string;
    nom: string;
    description: string | null;
    active: boolean;
  } | null;
};

type DashboardData = {
  user: DashboardUser;

  statistics: {
    totalUsers: number;
    activeUsers: number;
    totalFiliales: number;
    activeFiliales: number;
    totalSessions: number;
  };

  filiales: Filiale[];

  recentUsers: Array<{
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;

    filiale: {
      id: string;
      code: string;
      nom: string;
    } | null;
  }>;

  activities: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    createdAt: string;
  }>;
};

// =====================================================
// FILIALES
// =====================================================

const ecosystem = [
  {
    code: "AGRO",
    title: "KARFI AGRO",
    description: "Agriculture et agro-industrie",
    icon: "🌱",
  },
  {
    code: "TECH",
    title: "KARFI TECH",
    description: "Technologie et solutions digitales",
    icon: "💻",
  },
  {
    code: "MOBILIER",
    title: "KARFI MOBILIER",
    description: "Mobilier et aménagement",
    icon: "🏠",
  },
  {
    code: "FORMATION",
    title: "KARFI FORMATION",
    description: "Formation et développement des compétences",
    icon: "🎓",
  },
];

// =====================================================
// PAGE
// =====================================================

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // CHARGEMENT
  // =====================================================

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/dashboard", {
        method: "GET",
        credentials: "include",

        headers: {
          Accept: "application/json",
        },

        cache: "no-store",
      });

      // -------------------------------------------------
      // RÉCUPÉRER LE TEXTE D'ABORD
      // -------------------------------------------------

      const text = await response.text();

      console.log(
        "📡 API DASHBOARD :",
        response.status,
        text
      );

      // -------------------------------------------------
      // RÉPONSE VIDE
      // -------------------------------------------------

      if (!text.trim()) {
        throw new Error(
          `Le serveur a retourné une réponse vide (${response.status}).`
        );
      }

      // -------------------------------------------------
      // PARSER JSON
      // -------------------------------------------------

      let result: any;

      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        console.error(
          "❌ Réponse non JSON :",
          text
        );

        throw new Error(
          "Le serveur a retourné une réponse invalide."
        );
      }

      // -------------------------------------------------
      // ERREUR API
      // -------------------------------------------------

      if (!response.ok || !result.success) {
        throw new Error(
          result?.error ||
            result?.message ||
            `Erreur serveur (${response.status}).`
        );
      }

      // -------------------------------------------------
      // DONNÉES
      // -------------------------------------------------

      setDashboard(result);
    } catch (err) {
      console.error(
        "❌ ERREUR DASHBOARD :",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Impossible de charger le dashboard."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================================
  // INITIALISATION
  // =====================================================

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-base-200">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-xl">
              <Loader2
                size={30}
                className="animate-spin"
              />
            </div>

            <p className="text-sm font-medium text-base-content/60">
              Chargement du dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERREUR
  // =====================================================

  if (error) {
    return (
      <main className="min-h-screen bg-base-200 p-6">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-error/20 bg-base-100 p-8 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10 text-error">
              <Activity size={30} />
            </div>

            <h1 className="text-2xl font-bold">
              Impossible de charger le dashboard
            </h1>

            <p className="mt-3 text-sm text-base-content/50">
              {error}
            </p>

            <button
              onClick={loadDashboard}
              className="btn btn-primary mt-6"
            >
              <RefreshCw size={18} />
              Réessayer
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // PROTECTION
  // =====================================================

  if (!dashboard) {
    return null;
  }

  // =====================================================
  // VARIABLES
  // =====================================================

  const userName =
    dashboard.user?.prenom ||
    dashboard.user?.nom ||
    "Administrateur";

  const stats = dashboard.statistics;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen bg-base-200">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-neutral text-neutral-content">
        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-neutral via-neutral to-primary/40" />

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl"
        />

        {/* Content */}

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
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
              duration: 0.8,
            }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-content/10 bg-neutral-content/5 px-4 py-2 text-sm backdrop-blur">
              <Sparkles
                size={16}
                className="text-secondary"
              />

              <span>
                Système d'Information Intégré
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Bonjour{" "}
              <span className="text-primary">
                {userName}
              </span>{" "}
              👋
            </h1>

            <div className="mt-4 text-xl text-neutral-content/60 md:text-2xl">
              <TypeAnimation
                sequence={[
                  "Pilotez votre groupe depuis un seul espace.",
                  2500,
                  "Supervisez vos filiales en temps réel.",
                  2500,
                  "Prenez les bonnes décisions plus rapidement.",
                  2500,
                ]}
                speed={45}
                repeat={Infinity}
              />
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-content/50 md:text-base">
              Bienvenue dans le cockpit de supervision
              de KARFI HOLDING. Consultez les activités,
              les filiales, les utilisateurs et les
              indicateurs clés du groupe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl space-y-8 px-5 py-8 lg:px-8">
        {/* =================================================
            STATS
        ================================================= */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users size={22} />}
            title="Utilisateurs"
            value={stats.totalUsers}
            description={`${stats.activeUsers} actifs`}
          />

          <StatCard
            icon={<Building2 size={22} />}
            title="Filiales"
            value={stats.totalFiliales}
            description={`${stats.activeFiliales} actives`}
          />

          <StatCard
            icon={<ShieldCheck size={22} />}
            title="Sessions"
            value={stats.totalSessions}
            description="Sessions actives"
          />

          <StatCard
            icon={<CircleDollarSign size={22} />}
            title="Performance"
            value="100%"
            description="Vue consolidée"
          />
        </section>

        {/* =================================================
            ECOSYSTEM
        ================================================= */}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Écosystème
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Les 4 pôles de KARFI
              </h2>
            </div>

            <button className="btn btn-ghost btn-sm">
              Voir tout
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ecosystem.map(
              (item, index) => (
                <motion.div
                  key={item.code}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group cursor-pointer rounded-3xl border border-secondary/30 bg-base-100 p-6 shadow-lg transition-all hover:border-secondary hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                      {item.icon}
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="text-base-content/30 transition-all group-hover:text-primary"
                    />
                  </div>

                  <p className="mt-5 text-xs font-bold tracking-[0.15em] text-secondary">
                    {item.code}
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-base-content/50">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
                    Explorer
                    <ChevronRight size={15} />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* =================================================
            TWO COLUMNS
        ================================================= */}

        <section className="grid gap-6 lg:grid-cols-2">
          {/* ACTIVITIES */}

          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Activité
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Activités récentes
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity size={20} />
              </div>
            </div>

            <div className="space-y-4">
              {dashboard.activities.length === 0 ? (
                <EmptyState text="Aucune activité récente." />
              ) : (
                dashboard.activities.map(
                  (activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 rounded-2xl border border-base-300 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <CheckCircle2 size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-sm text-base-content/50">
                          {activity.description}
                        </p>

                        <p className="mt-2 text-xs text-base-content/30">
                          {formatDate(
                            activity.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>

          {/* USERS */}

          <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Administration
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Utilisateurs récents
                </h2>
              </div>

              <Users
                size={22}
                className="text-primary"
              />
            </div>

            <div className="space-y-3">
              {dashboard.recentUsers.length === 0 ? (
                <EmptyState text="Aucun utilisateur récent." />
              ) : (
                dashboard.recentUsers.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-2xl border border-base-300 p-3"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">
                        {item.prenom?.charAt(0)}
                        {item.nom?.charAt(0)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          {item.prenom} {item.nom}
                        </p>

                        <p className="truncate text-xs text-base-content/40">
                          {item.email}
                        </p>
                      </div>

                      <div
                        className={`badge ${
                          item.active
                            ? "badge-success"
                            : "badge-error"
                        } badge-sm`}
                      >
                        {item.active
                          ? "Actif"
                          : "Inactif"}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            FILIALES
        ================================================= */}

        <section className="rounded-3xl border border-secondary/30 bg-base-100 p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Organisation
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Filiales du groupe
              </h2>
            </div>

            <Building2
              size={24}
              className="text-primary"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboard.filiales.map(
              (filiale) => (
                <div
                  key={filiale.id}
                  className="rounded-2xl border border-base-300 p-5 transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="badge badge-primary">
                      {filiale.code}
                    </div>

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        filiale.active
                          ? "bg-success"
                          : "bg-error"
                      }`}
                    />
                  </div>

                  <h3 className="mt-4 font-bold">
                    {filiale.nom}
                  </h3>

                  <p className="mt-2 text-sm text-base-content/50">
                    {filiale.description ||
                      "Aucune description."}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* =================================================
            FOOTER ACTIONS
        ================================================= */}

        <section className="grid gap-4 md:grid-cols-3">
          <QuickAction
            icon={<BarChart3 size={21} />}
            title="Analytiques"
            description="Consulter les performances"
          />

          <QuickAction
            icon={<Clock3 size={21} />}
            title="Activités"
            description="Voir l'historique"
          />

          <QuickAction
            icon={<Wifi size={21} />}
            title="Services"
            description="Accéder aux services"
          />
        </section>
      </div>
    </main>
  );
}

// =====================================================
// STAT CARD
// =====================================================

function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-3xl border border-secondary/20 bg-base-100 p-5 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-base-content/20"
        />
      </div>

      <p className="mt-5 text-sm text-base-content/50">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-success">
        {description}
      </p>
    </motion.div>
  );
}

// =====================================================
// QUICK ACTION
// =====================================================

function QuickAction({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className="flex cursor-pointer items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content">
        {icon}
      </div>

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="text-xs text-base-content/40">
          {description}
        </p>
      </div>

      <ChevronRight
        size={18}
        className="ml-auto text-base-content/30"
      />
    </motion.div>
  );
}

// =====================================================
// EMPTY STATE
// =====================================================

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-base-300 p-6 text-center">
      <p className="text-sm text-base-content/40">
        {text}
      </p>
    </div>
  );
}

// =====================================================
// DATE
// =====================================================

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date(date));
  } catch {
    return date;
  }
}

