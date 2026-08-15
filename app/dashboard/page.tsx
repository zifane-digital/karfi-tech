"use client";

import {
  Activity,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type DashboardData = {
  user: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    active: boolean;
  };

  statistics: {
    totalUsers: number;
    activeUsers: number;
    totalFiliales: number;
    activeFiliales: number;
    totalSessions: number;
  };

  filiales: Array<{
    id: string;
    code: string;
    nom: string;
    description: string | null;
    active: boolean;
  }>;

  recentUsers: Array<{
    id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    filiale: {
      code: string;
      nom: string;
    } | null;
  }>;

  activities: Array<{
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }>;
};

const chartData = [
  { name: "Jan", value: 35 },
  { name: "Fév", value: 48 },
  { name: "Mar", value: 44 },
  { name: "Avr", value: 61 },
  { name: "Mai", value: 68 },
  { name: "Juin", value: 82 },
];

const filialeIcons: Record<string, string> = {
  AGRO: "🌱",
  TECH: "💻",
  MOBILIER: "🏠",
  FORMATION: "🎓",
};

export default function DashboardPage() {
  const [data, setData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/dashboard",
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Impossible de charger le dashboard."
        );
      }

      setData(result);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Erreur inconnue."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-[#3ecf8e]" />

          <p className="mt-4 text-sm text-white/40">
            Chargement de SIIKH...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md rounded-3xl border border-error/20 bg-[#101917] p-8 text-center">
          <Activity
            size={35}
            className="mx-auto text-error"
          />

          <h2 className="mt-4 text-xl font-bold text-white">
            Dashboard indisponible
          </h2>

          <p className="mt-2 text-sm text-white/40">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="btn mt-5 border-0 bg-[#3ecf8e] text-[#0b1110] hover:bg-[#3ecf8e]/80"
          >
            <RefreshCw size={17} />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const stats = data.statistics;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[#3ecf8e]/10 bg-[#101917] p-6 shadow-2xl"
      >
        <div className="absolute right-[-100px] top-[-150px] h-[350px] w-[350px] rounded-full bg-[#3ecf8e]/10 blur-[100px]" />

        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#3ecf8e]/20 bg-[#3ecf8e]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#3ecf8e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3ecf8e]" />
              SIIKH
            </div>

            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Bonjour {data.user.prenom} 👋
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Vue globale de KARFI Holding.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3ecf8e] font-bold text-[#0b1110]">
              {data.user.prenom.charAt(0)}
              {data.user.nom.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {data.user.prenom} {data.user.nom}
              </p>

              <p className="text-xs text-white/30">
                {data.user.role.replaceAll("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Utilisateurs"
          value={stats.totalUsers}
          detail={`${stats.activeUsers} actifs`}
          icon={<Users size={20} />}
        />

        <Stat
          title="Filiales"
          value={stats.totalFiliales}
          detail={`${stats.activeFiliales} actives`}
          icon={<Building2 size={20} />}
        />

        <Stat
          title="Sessions"
          value={stats.totalSessions}
          detail="Sessions actives"
          icon={<ShieldCheck size={20} />}
        />

        <Stat
          title="État système"
          value="OK"
          detail="Services opérationnels"
          icon={<CheckCircle2 size={20} />}
        />
      </section>

      {/* CHART + FILIALES */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* CHART */}
        <div className="rounded-3xl border border-white/10 bg-[#101917] p-5 shadow-xl lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3ecf8e]">
                Analyse
              </p>

              <h2 className="mt-1 font-bold text-white">
                Évolution de l'activité
              </h2>
            </div>

            <span className="badge border-[#3ecf8e]/20 bg-[#3ecf8e]/5 text-[#3ecf8e]">
              2026
            </span>
          </div>

          <div className="mt-5 h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="karfiGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#3ecf8e"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#3ecf8e"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,.05)"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,.3)",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "rgba(255,255,255,.3)",
                    fontSize: 11,
                  }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3ecf8e"
                  strokeWidth={3}
                  fill="url(#karfiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FILIALES */}
        <div className="rounded-3xl border border-white/10 bg-[#101917] p-5 shadow-xl">
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3ecf8e]">
              Groupe
            </p>

            <h2 className="mt-1 font-bold text-white">
              Nos filiales
            </h2>
          </div>

          <div className="space-y-3">
            {data.filiales.map(
              (filiale, index) => (
                <motion.div
                  key={filiale.id}
                  initial={{
                    opacity: 0,
                    x: 10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-[#3ecf8e]/20 hover:bg-[#3ecf8e]/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg">
                    {filialeIcons[
                      filiale.code
                    ] || "🏢"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {filiale.nom}
                    </p>

                    <p className="text-[10px] uppercase tracking-wider text-white/30">
                      {filiale.code}
                    </p>
                  </div>

                  <span
                    className={`h-2 w-2 rounded-full ${
                      filiale.active
                        ? "bg-[#3ecf8e]"
                        : "bg-red-500"
                    }`}
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ACTIVITÉ + UTILISATEURS */}
      <section className="grid gap-6 lg:grid-cols-2">
        <DashboardBox
          title="Activité récente"
          subtitle="Dernières opérations"
        >
          {data.activities.length === 0 ? (
            <Empty />
          ) : (
            data.activities
              .slice(0, 5)
              .map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3ecf8e]/10 text-[#3ecf8e]">
                    <Activity size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">
                      {activity.title}
                    </p>

                    <p className="truncate text-xs text-white/30">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-[10px] text-white/20">
                      {formatDate(
                        activity.createdAt
                      )}
                    </p>
                  </div>
                </div>
              ))
          )}
        </DashboardBox>

        <DashboardBox
          title="Utilisateurs récents"
          subtitle="Derniers comptes"
        >
          {data.recentUsers.length === 0 ? (
            <Empty />
          ) : (
            data.recentUsers
              .slice(0, 5)
              .map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3ecf8e] text-xs font-bold text-[#0b1110]">
                    {user.prenom.charAt(0)}
                    {user.nom.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.prenom} {user.nom}
                    </p>

                    <p className="truncate text-xs text-white/30">
                      {user.email}
                    </p>
                  </div>

                  <span
                    className={`badge badge-xs ${
                      user.active
                        ? "bg-[#3ecf8e]/10 text-[#3ecf8e]"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.active
                      ? "Actif"
                      : "Inactif"}
                  </span>
                </div>
              ))
          )}
        </DashboardBox>
      </section>

      {/* FOOTER */}
      <footer className="flex items-center justify-between border-t border-white/5 pt-5 text-[10px] text-white/20">
        <span>
          © {new Date().getFullYear()} KARFI HOLDING
        </span>

        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#3ecf8e]" />
          SIIKH opérationnel
        </span>
      </footer>
    </div>
  );
}

function Stat({
  title,
  value,
  detail,
  icon,
}: {
  title: string;
  value: string | number;
  detail: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-white/10 bg-[#101917] p-5 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3ecf8e]/10 text-[#3ecf8e]">
          {icon}
        </div>

        <ArrowUpRight
          size={15}
          className="text-white/20"
        />
      </div>

      <p className="mt-4 text-xs text-white/40">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-[#3ecf8e]">
        {detail}
      </p>
    </motion.div>
  );
}

function DashboardBox({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#101917] p-5 shadow-xl">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3ecf8e]">
          {subtitle}
        </p>

        <h2 className="mt-1 font-bold text-white">
          {title}
        </h2>
      </div>

      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-xs text-white/30">
      Aucune donnée disponible.
    </div>
  );
}

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