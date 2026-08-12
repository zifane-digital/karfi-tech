"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  MoreVertical,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

type User = {
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
  } | null;
};

type Filiale = {
  id: string;
  code: string;
  nom: string;
};

const roles = [
  "SUPER_ADMIN",
  "ADMIN_HOLDING",
  "DIRECTEUR_FILIALE",
  "EMPLOYE",
  "PARTENAIRE",
  "CLIENT",
  "VISITEUR",
];

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN_HOLDING: "Admin Holding",
  DIRECTEUR_FILIALE: "Directeur Filiale",
  EMPLOYE: "Employé",
  PARTENAIRE: "Partenaire",
  CLIENT: "Client",
  VISITEUR: "Visiteur",
};

export default function UtilisateursPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filiales, setFiliales] = useState<Filiale[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState<User | null>(null);

  async function loadUsers() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/utilisateurs?search=${encodeURIComponent(search)}`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de récupérer les utilisateurs"
        );
      }

      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur serveur"
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadFiliales() {
    try {
      const response = await fetch(
        "/api/filiales",
        {
          credentials: "include",
        }
      );

      if (!response.ok) return;

      const data = await response.json();

      setFiliales(data);
    } catch (error) {
      console.error(
        "Erreur chargement filiales :",
        error
      );
    }
  }

  useEffect(() => {
    loadUsers();
    loadFiliales();
  }, []);

  async function deleteUser(id: string) {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/utilisateurs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de supprimer l'utilisateur"
        );
      }

      await loadUsers();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erreur"
      );
    }
  }

  function openCreateModal() {
    setEditingUser(null);
    setShowModal(true);
  }

  function openEditModal(user: User) {
    setEditingUser(user);
    setShowModal(true);
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <div>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>Administration</li>
              <li>Utilisateurs</li>
            </ul>
          </div>

          <h1 className="mt-2 text-3xl font-bold">
            Utilisateurs
          </h1>

          <p className="mt-2 text-base-content/50">
            Gérez les utilisateurs et leurs
            autorisations.
          </p>
        </div>

        <button
          className="btn btn-primary gap-2"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Nouvel utilisateur
        </button>

      </div>

      {/* STATISTIQUES */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total"
          value={users.length}
          icon={<Users size={21} />}
        />

        <StatCard
          title="Actifs"
          value={
            users.filter((u) => u.active)
              .length
          }
          icon={<UserCheck size={21} />}
          color="success"
        />

        <StatCard
          title="Inactifs"
          value={
            users.filter((u) => !u.active)
              .length
          }
          icon={<UserX size={21} />}
          color="error"
        />

        <StatCard
          title="Administrateurs"
          value={
            users.filter(
              (u) =>
                u.role === "SUPER_ADMIN" ||
                u.role === "ADMIN_HOLDING"
            ).length
          }
          icon={<ShieldCheck size={21} />}
          color="secondary"
        />

      </div>

      {/* TABLE */}

      <div className="card border border-base-300 bg-base-100 shadow-sm">

        <div className="card-body p-0">

          {/* SEARCH */}

          <div className="border-b border-base-300 p-5">

            <label className="input input-bordered flex w-full max-w-md items-center gap-3">

              <Search
                size={18}
                className="text-base-content/40"
              />

              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loadUsers();
                  }
                }}
                className="grow"
              />

            </label>

          </div>

          {error && (
            <div className="alert alert-error m-5">
              {error}
            </div>
          )}

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="table">

              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Rôle</th>
                  <th>Filiale</th>
                  <th>Statut</th>
                  <th className="text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center"
                    >
                      <span className="loading loading-spinner loading-md" />
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-3 text-base-content/40">

                        <Users size={40} />

                        <p>
                          Aucun utilisateur trouvé.
                        </p>

                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>

                      {/* UTILISATEUR */}

                      <td>

                        <div className="flex items-center gap-3">

                          <div className="avatar placeholder">

                            <div className="w-11 rounded-full bg-primary text-primary-content">

                              <span className="text-sm font-bold">
                                {user.prenom
                                  ?.charAt(0)}
                                {user.nom
                                  ?.charAt(0)}
                              </span>

                            </div>

                          </div>

                          <div>

                            <div className="font-bold">
                              {user.prenom}{" "}
                              {user.nom}
                            </div>

                            <div className="text-xs text-base-content/50">
                              {user.email}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}

                      <td>

                        <span className="badge badge-outline">
                          {roleLabels[user.role] ||
                            user.role}
                        </span>

                      </td>

                      {/* FILIALE */}

                      <td>

                        {user.filiale ? (
                          <div>
                            <p className="font-medium">
                              {user.filiale.nom}
                            </p>

                            <p className="text-xs text-base-content/40">
                              {user.filiale.code}
                            </p>
                          </div>
                        ) : (
                          <span className="text-base-content/40">
                            Holding
                          </span>
                        )}

                      </td>

                      {/* STATUT */}

                      <td>

                        {user.active ? (
                          <span className="badge badge-success badge-outline">
                            Actif
                          </span>
                        ) : (
                          <span className="badge badge-error badge-outline">
                            Inactif
                          </span>
                        )}

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="flex justify-end gap-2">

                          <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() =>
                              openEditModal(user)
                            }
                            title="Modifier"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            className="btn btn-ghost btn-sm btn-square text-error"
                            onClick={() =>
                              deleteUser(user.id)
                            }
                            title="Supprimer"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (
        <UserModal
          user={editingUser}
          filiales={filiales}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() => {
            setShowModal(false);
            loadUsers();
          }}
        />
      )}

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color = "primary",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="card border border-base-300 bg-base-100 shadow-sm">

      <div className="card-body">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-base-content/50">
              {title}
            </p>

            <p className="mt-2 text-3xl font-bold">
              {value}
            </p>
          </div>

          <div
            className={`rounded-2xl bg-${color}/10 p-3 text-${color}`}
          >
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}

function UserModal({
  user,
  filiales,
  onClose,
  onSuccess,
}: {
  user: User | null;
  filiales: Filiale[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    telephone: user?.telephone || "",
    password: "",
    role:
      user?.role || "EMPLOYE",
    filialeId:
      user?.filialeId || "",
    active:
      user?.active ?? true,
  });

  async function submit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const payload: any = {
        ...form,
        filialeId:
          form.filialeId || null,
      };

      if (!form.password) {
        delete payload.password;
      }

      const response = await fetch(
        user
          ? `/api/utilisateurs/${user.id}`
          : "/api/utilisateurs",
        {
          method: user ? "PUT" : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Une erreur est survenue"
        );
      }

      onSuccess();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur serveur"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal modal-open">

      <div className="modal-box max-w-2xl">

        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h3 className="text-2xl font-bold">
          {user
            ? "Modifier l'utilisateur"
            : "Nouvel utilisateur"}
        </h3>

        <p className="mt-1 text-sm text-base-content/50">
          {user
            ? "Modifiez les informations du compte."
            : "Créez un nouveau compte utilisateur."}
        </p>

        {error && (
          <div className="alert alert-error mt-5">
            {error}
          </div>
        )}

        <form
          onSubmit={submit}
          className="mt-6 space-y-5"
        >

          <div className="grid gap-4 md:grid-cols-2">

            <label className="form-control">
              <span className="label-text mb-2 font-medium">
                Prénom
              </span>

              <input
                className="input input-bordered"
                value={form.prenom}
                onChange={(e) =>
                  setForm({
                    ...form,
                    prenom:
                      e.target.value,
                  })
                }
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-2 font-medium">
                Nom
              </span>

              <input
                className="input input-bordered"
                value={form.nom}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nom: e.target.value,
                  })
                }
                required
              />
            </label>

          </div>

          <label className="form-control">
            <span className="label-text mb-2 font-medium">
              Email
            </span>

            <input
              type="email"
              className="input input-bordered"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2 font-medium">
              Téléphone
            </span>

            <input
              className="input input-bordered"
              value={form.telephone}
              onChange={(e) =>
                setForm({
                  ...form,
                  telephone:
                    e.target.value,
                })
              }
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-2 font-medium">
              Mot de passe
            </span>

            <input
              type="password"
              className="input input-bordered"
              placeholder={
                user
                  ? "Laisser vide pour conserver"
                  : "Mot de passe"
              }
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              required={!user}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">

            <label className="form-control">
              <span className="label-text mb-2 font-medium">
                Rôle
              </span>

              <select
                className="select select-bordered"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              >
                {roles.map((role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {roleLabels[role]}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control">
              <span className="label-text mb-2 font-medium">
                Filiale
              </span>

              <select
                className="select select-bordered"
                value={form.filialeId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    filialeId:
                      e.target.value,
                  })
                }
              >
                <option value="">
                  Holding
                </option>

                {filiales.map(
                  (filiale) => (
                    <option
                      key={filiale.id}
                      value={filiale.id}
                    >
                      {filiale.code} —{" "}
                      {filiale.nom}
                    </option>
                  )
                )}
              </select>
            </label>

          </div>

          <label className="label cursor-pointer justify-start gap-4">

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active:
                    e.target.checked,
                })
              }
            />

            <span>
              Compte actif
            </span>

          </label>

          <div className="modal-action">

            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm" />
              )}

              {user
                ? "Enregistrer"
                : "Créer l'utilisateur"}
            </button>

          </div>

        </form>

      </div>

      <div
        className="modal-backdrop"
        onClick={onClose}
      />

    </div>
  );
}