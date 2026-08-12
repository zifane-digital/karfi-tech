"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Users,
  Power,
} from "lucide-react";

interface Filiale {
  id: string;
  code: string;
  nom: string;
  description: string | null;
  active: boolean;
  _count?: {
    users: number;
  };
}

export default function FilialesPage() {
  const [filiales, setFiliales] = useState<Filiale[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFiliales() {
    try {
      setLoading(true);

      const response = await fetch("/api/filiales");

      if (!response.ok) {
        throw new Error("Erreur lors du chargement");
      }

      const data = await response.json();

      setFiliales(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiliales();
  }, []);

  async function deleteFiliale(id: string) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette filiale ?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/filiales/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Suppression impossible");
      }

      await loadFiliales();
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer cette filiale.");
    }
  }

  async function toggleFiliale(
    id: string,
    active: boolean
  ) {
    try {
      const response = await fetch(`/api/filiales/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: !active,
        }),
      });

      if (!response.ok) {
        throw new Error("Modification impossible");
      }

      await loadFiliales();
    } catch (error) {
      console.error(error);
      alert("Impossible de modifier la filiale.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-secondary">
            KARFI HOLDING
          </p>

          <h1 className="mt-1 text-2xl font-bold text-neutral sm:text-3xl">
            Filiales
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            Gestion des filiales de Karfi Holding.
          </p>
        </div>

        <a
          href="/dashboard/filiales/nouveau"
          className="btn btn-primary gap-2"
        >
          <Plus size={18} />
          Nouvelle filiale
        </a>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Total filiales
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {filiales.length}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Building2 size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Filiales actives
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {filiales.filter((f) => f.active).length}
                </p>
              </div>

              <div className="rounded-xl bg-success/10 p-3 text-success">
                <Power size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/50">
                  Utilisateurs
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {filiales.reduce(
                    (total, filiale) =>
                      total + (filiale._count?.users ?? 0),
                    0
                  )}
                </p>
              </div>

              <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : filiales.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
              <Building2
                size={48}
                className="text-base-content/30"
              />

              <p className="font-semibold">
                Aucune filiale
              </p>

              <p className="text-sm text-base-content/50">
                Commencez par créer une filiale.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Filiale</th>
                    <th>Code</th>
                    <th>Utilisateurs</th>
                    <th>Statut</th>
                    <th className="text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filiales.map((filiale) => (
                    <tr key={filiale.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Building2 size={20} />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {filiale.nom}
                            </p>

                            <p className="max-w-xs truncate text-xs text-base-content/50">
                              {filiale.description ||
                                "Aucune description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-outline">
                          {filiale.code}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <Users size={16} />

                          {filiale._count?.users ?? 0}
                        </div>
                      </td>

                      <td>
                        {filiale.active ? (
                          <span className="badge badge-success">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-error">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            title={
                              filiale.active
                                ? "Désactiver"
                                : "Activer"
                            }
                            onClick={() =>
                              toggleFiliale(
                                filiale.id,
                                filiale.active
                              )
                            }
                          >
                            <Power size={17} />
                          </button>

                          <a
                            href={`/dashboard/filiales/${filiale.id}`}
                            className="btn btn-ghost btn-sm"
                            title="Modifier"
                          >
                            <Pencil size={17} />
                          </a>

                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-error"
                            title="Supprimer"
                            onClick={() =>
                              deleteFiliale(filiale.id)
                            }
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}