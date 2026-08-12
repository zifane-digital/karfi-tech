"use client";

import { ArrowLeft, Building2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const filialeSchema = z.object({
  code: z.enum(["AGRO", "TECH", "MOBILIER", "FORMATION"], {
    message: "Veuillez sélectionner un code de filiale.",
  }),

  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom ne doit pas dépasser 100 caractères."),

  description: z
    .string()
    .max(
      500,
      "La description ne doit pas dépasser 500 caractères."
    )
    .optional(),
});

type FilialeFormData = z.infer<typeof filialeSchema>;

export default function NouvelleFilialePage() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilialeFormData>({
    resolver: zodResolver(filialeSchema),
    defaultValues: {
      code: "AGRO",
      nom: "",
      description: "",
    },
  });

  async function onSubmit(data: FilialeFormData) {
    try {
      setLoading(true);
      setServerError("");

      const response = await fetch("/api/filiales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.error ||
            "Impossible de créer la filiale."
        );

        return;
      }

      router.push("/dashboard/filiales");
      router.refresh();
    } catch (error) {
      console.error(error);

      setServerError(
        "Une erreur réseau est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/filiales"
            className="btn btn-ghost btn-circle"
            aria-label="Retour aux filiales"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-sm font-medium text-secondary">
              KARFI HOLDING
            </p>

            <h1 className="mt-1 text-2xl font-bold text-neutral">
              Nouvelle filiale
            </h1>

            <p className="mt-1 text-sm text-base-content/60">
              Ajouter une nouvelle filiale au groupe.
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          {/* Icône */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 size={28} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Informations de la filiale
              </h2>

              <p className="text-sm text-base-content/50">
                Renseignez les informations principales.
              </p>
            </div>
          </div>

          {/* Erreur serveur */}
          {serverError && (
            <div className="alert alert-error mb-6">
              <span>{serverError}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Code */}
            <div className="form-control">
              <label
                htmlFor="code"
                className="label"
              >
                <span className="label-text font-semibold">
                  Code de la filiale
                </span>
              </label>

              <select
                id="code"
                {...register("code")}
                className={`select select-bordered w-full ${
                  errors.code ? "select-error" : ""
                }`}
              >
                <option value="AGRO">
                  AGRO
                </option>

                <option value="TECH">
                  TECH
                </option>

                <option value="MOBILIER">
                  MOBILIER
                </option>

                <option value="FORMATION">
                  FORMATION
                </option>
              </select>

              {errors.code && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.code.message}
                  </span>
                </label>
              )}
            </div>

            {/* Nom */}
            <div className="form-control">
              <label
                htmlFor="nom"
                className="label"
              >
                <span className="label-text font-semibold">
                  Nom de la filiale
                </span>
              </label>

              <input
                id="nom"
                type="text"
                placeholder="Ex : Karfi Agro"
                {...register("nom")}
                className={`input input-bordered w-full ${
                  errors.nom ? "input-error" : ""
                }`}
              />

              {errors.nom && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.nom.message}
                  </span>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label
                htmlFor="description"
                className="label"
              >
                <span className="label-text font-semibold">
                  Description
                </span>

                <span className="label-text-alt">
                  Facultatif
                </span>
              </label>

              <textarea
                id="description"
                rows={5}
                placeholder="Décrivez les activités de cette filiale..."
                {...register("description")}
                className={`textarea textarea-bordered w-full ${
                  errors.description
                    ? "textarea-error"
                    : ""
                }`}
              />

              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/dashboard/filiales"
                className="btn btn-ghost"
              >
                Annuler
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary gap-2"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Création...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Créer la filiale
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}