"use client";

import {
  UserPlus,
  Users,
  ShieldCheck,
  Search,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Administrateur",
    email: "admin@karfi.ne",
    role: "Super Admin",
    status: "Actif",
  },
  {
    id: 2,
    name: "Responsable",
    email: "responsable@karfi.ne",
    role: "Administrateur",
    status: "Actif",
  },
];

export default function UtilisateursPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={20} />
            </div>

            <span className="text-sm font-medium text-primary">
              Administration
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Utilisateurs
          </h1>

          <p className="mt-1 text-sm text-base-content/50">
            Gérez les utilisateurs et leurs permissions.
          </p>
        </div>

        <button className="btn btn-primary rounded-xl">
          <UserPlus size={18} />
          Ajouter un utilisateur
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Total utilisateurs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {users.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Utilisateurs actifs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {users.filter((u) => u.status === "Actif").length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <ShieldCheck size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Administrateurs
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {users.filter((u) =>
                    u.role.toLowerCase().includes("admin")
                  ).length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <ShieldCheck size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body p-0">
          {/* Search */}
          <div className="flex flex-col gap-4 border-b border-base-300 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Liste des utilisateurs
              </h2>

              <p className="text-sm text-base-content/50">
                Comptes ayant accès à la plateforme.
              </p>
            </div>

            <label className="input input-bordered flex w-full items-center gap-2 md:w-72">
              <Search
                size={18}
                className="text-base-content/40"
              />

              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="w-11 rounded-xl bg-primary text-primary-content">
                            <span className="text-lg">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold">
                            {user.name}
                          </p>

                          <div className="flex items-center gap-1 text-xs text-base-content/50">
                            <Mail size={13} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-outline">
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-success badge-sm">
                        {user.status}
                      </span>
                    </td>

                    <td className="text-right">
                      <button className="btn btn-ghost btn-sm btn-circle">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-12 text-center text-base-content/50"
                    >
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}