"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-base-200" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // CONNEXION
  // =====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 Tentative :", email);

      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      // =================================================
      // RÉCUPÉRER LA RÉPONSE
      // =================================================

      const contentType =
        response.headers.get("content-type") || "";

      let data: any = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "❌ Réponse serveur non JSON :",
          text
        );

        throw new Error(
          "Le serveur a retourné une réponse invalide."
        );
      }

      // =================================================
      // ERREUR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Email ou mot de passe incorrect."
        );
      }

      // =================================================
      // CONNEXION RÉUSSIE
      // =================================================

      console.log(
        "✅ Connexion réussie :",
        data.user
      );

      // =================================================
      // REDIRECTION
      // =================================================

      const redirect =
        searchParams.get("redirect") ||
        "/dashboard";

      console.log(
        "➡️ Redirection vers :",
        redirect
      );

      window.location.assign(redirect);
    } catch (err) {
      console.error(
        "❌ Erreur login :",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Impossible de contacter le serveur."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-200">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
        {/* =====================================================
            LEFT
        ===================================================== */}

        <section className="relative hidden overflow-hidden bg-neutral text-neutral-content lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral via-neutral to-primary/40" />

          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

          <div className="absolute -bottom-40 left-20 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            {/* LOGO */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-xl shadow-primary/20">
                  <ShieldCheck size={26} />
                </div>

                <div>
                  <p className="text-xl font-bold tracking-tight">
                    KARFI
                  </p>

                  <p className="text-xs font-medium uppercase tracking-[0.25em] opacity-50">
                    Holding
                  </p>
                </div>
              </div>

              <div className="badge badge-outline border-neutral-content/20 px-4 py-3 text-xs">
                Administration
              </div>
            </div>

            {/* PRESENTATION */}

            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-content/10 bg-neutral-content/5 px-4 py-2 text-sm backdrop-blur">
                <Sparkles
                  size={16}
                  className="text-secondary"
                />

                <span>
                  Plateforme de gestion
                </span>
              </div>

              <h1 className="text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">
                Pilotez votre groupe

                <span className="block text-primary">
                  depuis un seul espace.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-content/60 xl:text-lg">
                Une plateforme centralisée pour
                superviser les filiales, les équipes,
                les finances et les opérations de
                KARFI HOLDING.
              </p>

              {/* FEATURES */}

              <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
                <Feature
                  icon={<Building2 size={18} />}
                  title="Gestion des filiales"
                  description="Pilotez vos différentes activités."
                />

                <Feature
                  icon={<BarChart3 size={18} />}
                  title="Vue consolidée"
                  description="Suivez les performances du groupe."
                />

                <Feature
                  icon={<ShieldCheck size={18} />}
                  title="Accès sécurisé"
                  description="Sessions protégées et contrôlées."
                />

                <Feature
                  icon={<CheckCircle2 size={18} />}
                  title="Administration"
                  description="Gérez utilisateurs et permissions."
                />
              </div>

              {/* STATISTIQUES */}

              <div className="mt-10 flex flex-wrap gap-4">
                <Stat
                  value="04"
                  label="Filiales"
                />

                <Stat
                  value="100%"
                  label="Sécurisé"
                />

                <Stat
                  value="24/7"
                  label="Disponible"
                />
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between text-xs text-neutral-content/30">
              <span>
                © {new Date().getFullYear()} KARFI HOLDING
              </span>

              <span>
                Administration sécurisée
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT
        ===================================================== */}

        <section className="flex min-h-screen items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}

            <div className="mb-8 flex items-center justify-center lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-xl">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <p className="text-xl font-bold">
                    KARFI
                  </p>

                  <p className="text-xs uppercase tracking-[0.2em] text-base-content/40">
                    Holding
                  </p>
                </div>
              </div>
            </div>

            {/* LOGIN CARD */}

            <div className="rounded-3xl border border-base-300/70 bg-base-100/90 shadow-2xl backdrop-blur-xl">
              <div className="p-7 sm:p-9">
                {/* HEADER */}

                <div className="mb-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <LockKeyhole size={25} />
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Espace sécurisé
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight">
                    Bon retour 👋
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-base-content/50">
                    Connectez-vous à votre espace
                    d'administration KARFI HOLDING.
                  </p>
                </div>

                {/* ERROR */}

                {error && (
                  <div className="alert alert-error mb-6 rounded-2xl">
                    <span className="text-sm">
                      {error}
                    </span>
                  </div>
                )}

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* EMAIL */}

                  <div className="form-control">
                    <label className="mb-2">
                      <span className="text-sm font-semibold">
                        Adresse email
                      </span>
                    </label>

                    <label className="input input-bordered flex h-14 w-full items-center gap-3 rounded-2xl bg-base-200/50 transition-all focus-within:border-primary focus-within:outline-none focus-within:ring-4 focus-within:ring-primary/10">
                      <Mail
                        size={19}
                        className="text-base-content/30"
                      />

                      <input
                        type="email"
                        className="grow bg-transparent"
                        placeholder="admin@karfi.ne"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        autoComplete="email"
                        disabled={loading}
                        required
                      />
                    </label>
                  </div>

                  {/* PASSWORD */}

                  <div className="form-control">
                    <div className="mb-2 flex items-center justify-between">
                      <label>
                        <span className="text-sm font-semibold">
                          Mot de passe
                        </span>
                      </label>

                      <span className="text-xs text-base-content/40">
                        Sécurisé
                      </span>
                    </div>

                    <label className="input input-bordered flex h-14 w-full items-center gap-3 rounded-2xl bg-base-200/50 transition-all focus-within:border-primary focus-within:outline-none focus-within:ring-4 focus-within:ring-primary/10">
                      <LockKeyhole
                        size={19}
                        className="text-base-content/30"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        className="grow bg-transparent"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        autoComplete="current-password"
                        disabled={loading}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle"
                        onClick={() =>
                          setShowPassword(
                            (value) => !value
                          )
                        }
                        disabled={loading}
                        aria-label={
                          showPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </label>
                  </div>

                  {/* SECURITY */}

                  <div className="flex items-center gap-2 text-xs text-base-content/45">
                    <CheckCircle2
                      size={15}
                      className="text-success"
                    />

                    <span>
                      Connexion protégée par une session sécurisée
                    </span>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary h-14 min-h-14 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        Accéder au dashboard

                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>
                </form>

                {/* SECURITY CARD */}

                <div className="mt-7 rounded-2xl border border-base-300 bg-base-200/50 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Votre espace est sécurisé
                      </p>

                      <p className="mt-1 text-xs leading-5 text-base-content/45">
                        Vos informations sont protégées
                        et votre session est automatiquement
                        sécurisée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM */}

            <div className="mt-6 text-center">
              <p className="text-xs text-base-content/35">
                KARFI HOLDING · Administration
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// =====================================================
// FEATURE
// =====================================================

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-3 rounded-2xl border border-neutral-content/10 bg-neutral-content/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-content/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-neutral-content/40">
          {description}
        </p>
      </div>
    </div>
  );
}

// =====================================================
// STAT
// =====================================================

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-content/10 bg-neutral-content/5 px-6 py-4 backdrop-blur">
      <p className="text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs uppercase tracking-wider text-neutral-content/40">
        {label}
      </p>
    </div>
  );
}
