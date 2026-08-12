"use client";

import {
  Building2,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* HEADER DE PAGE */}

      <div>
        <div className="breadcrumbs mb-2 text-sm">
          <ul>
            <li>Administration</li>
            <li>Dashboard</li>
          </ul>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Tableau de bord
            </h1>

            <p className="mt-2 text-base-content/50">
              Vue globale de KARFI HOLDING.
            </p>
          </div>

          <div className="badge badge-primary gap-2 px-4 py-3">
            <TrendingUp size={15} />
            Système opérationnel
          </div>

        </div>
      </div>

      {/* STATISTIQUES */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* FILIALES */}

        <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="card-body">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-base-content/50">
                  Filiales
                </p>

                <p className="mt-2 text-3xl font-bold">
                  4
                </p>
              </div>

              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <Building2 size={22} />
              </div>

            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-success">
              <ArrowUpRight size={14} />
              <span>Filiales actives</span>
            </div>

          </div>

        </div>

        {/* UTILISATEURS */}

        <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="card-body">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-base-content/50">
                  Utilisateurs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  12
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
                <Users size={22} />
              </div>

            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-success">
              <UserCheck size={14} />
              <span>Utilisateurs enregistrés</span>
            </div>

          </div>

        </div>

        {/* ACTIFS */}

        <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="card-body">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-base-content/50">
                  Utilisateurs actifs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  10
                </p>
              </div>

              <div className="rounded-2xl bg-success/10 p-3 text-success">
                <UserCheck size={22} />
              </div>

            </div>

            <div className="mt-4 text-xs text-base-content/40">
              83% des utilisateurs
            </div>

          </div>

        </div>

        {/* INACTIFS */}

        <div className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="card-body">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-base-content/50">
                  Utilisateurs inactifs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  2
                </p>
              </div>

              <div className="rounded-2xl bg-error/10 p-3 text-error">
                <UserX size={22} />
              </div>

            </div>

            <div className="mt-4 text-xs text-error">
              À vérifier
            </div>

          </div>

        </div>

      </div>

      {/* ACTIVITÉS */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="card border border-base-300 bg-base-100 shadow-sm xl:col-span-2">

          <div className="card-body">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="card-title">
                  Activité récente
                </h2>

                <p className="text-sm text-base-content/40">
                  Dernières activités du système
                </p>
              </div>

              <button className="btn btn-ghost btn-sm">
                Voir tout
              </button>

            </div>

            <div className="divider my-2" />

            <div className="space-y-4">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-success/10 p-3 text-success">
                  <UserCheck size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Connexion administrateur
                  </p>

                  <p className="text-xs text-base-content/40">
                    admin@karfi.ne
                  </p>
                </div>

                <span className="text-xs text-base-content/40">
                  Maintenant
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Building2 size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Gestion des filiales
                  </p>

                  <p className="text-xs text-base-content/40">
                    Module Filiales
                  </p>
                </div>

                <span className="text-xs text-base-content/40">
                  Aujourd'hui
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                  <Users size={18} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Gestion des utilisateurs
                  </p>

                  <p className="text-xs text-base-content/40">
                    Module Utilisateurs
                  </p>
                </div>

                <span className="text-xs text-base-content/40">
                  Aujourd'hui
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ÉTAT DU SYSTÈME */}

        <div className="card border border-base-300 bg-base-100 shadow-sm">

          <div className="card-body">

            <h2 className="card-title">
              État du système
            </h2>

            <p className="text-sm text-base-content/40">
              Services KARFI
            </p>

            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-sm">
                  API
                </span>

                <div className="badge badge-success gap-2">
                  <span className="h-2 w-2 rounded-full bg-success-content" />
                  Opérationnel
                </div>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-sm">
                  PostgreSQL
                </span>

                <div className="badge badge-success gap-2">
                  <span className="h-2 w-2 rounded-full bg-success-content" />
                  Connecté
                </div>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-sm">
                  Authentification
                </span>

                <div className="badge badge-success gap-2">
                  <span className="h-2 w-2 rounded-full bg-success-content" />
                  Active
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}