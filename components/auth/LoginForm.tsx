"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "L'adresse email est obligatoire.")
    .email("Adresse email invalide."),

  password: z
    .string()
    .min(1, "Le mot de passe est obligatoire.")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result.message ||
            "Identifiants incorrects."
        );

        return;
      }

      toast.success(
        "Connexion réussie. Bienvenue dans le SIIKH."
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      toast.error(
        "Impossible de contacter le serveur."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold"
        >
          Adresse email
        </label>

        <label
          className={`input input-bordered flex w-full items-center gap-3 ${
            errors.email
              ? "input-error"
              : ""
          }`}
        >
          <Mail
            size={19}
            className="text-base-content/40"
          />

          <input
            id="email"
            type="email"
            placeholder="admin@karfi.ne"
            autoComplete="email"
            className="grow"
            {...register("email")}
          />
        </label>

        {errors.email && (
          <p className="mt-1 text-xs text-error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold"
        >
          Mot de passe
        </label>

        <label
          className={`input input-bordered flex w-full items-center gap-3 ${
            errors.password
              ? "input-error"
              : ""
          }`}
        >
          <LockKeyhole
            size={19}
            className="text-base-content/40"
          />

          <input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="••••••••"
            autoComplete="current-password"
            className="grow"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="btn btn-ghost btn-xs btn-circle"
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

        {errors.password && (
          <p className="mt-1 text-xs text-error">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Connexion */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={19}
              className="animate-spin"
            />
            Connexion...
          </>
        ) : (
          <>
            <ShieldCheck size={19} />
            Se connecter
          </>
        )}
      </button>
    </form>
  );
}