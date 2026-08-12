"use client";

import {
  Bell,
  Check,
  Globe,
  Lock,
  Palette,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Shield size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  Paramètres
                </h1>

                <p className="text-sm text-base-content/50">
                  Gérez les paramètres de votre espace KARFI HOLDING.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary rounded-xl"
          >
            {saved ? (
              <>
                <Check size={18} />
                Enregistré
              </>
            ) : (
              <>
                <Save size={18} />
                Enregistrer
              </>
            )}
          </button>
        </div>

        {/* SUCCESS */}
        {saved && (
          <div className="alert alert-success rounded-2xl shadow-sm">
            <Check size={20} />

            <span>
              Les paramètres ont été enregistrés avec succès.
            </span>
          </div>
        )}

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* SIDEBAR SETTINGS */}
          <div className="card h-fit border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-4">

              <h2 className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-base-content/40">
                Configuration
              </h2>

              <button className="flex w-full items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-left text-primary">
                <User size={19} />
                <span className="font-medium">
                  Général
                </span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-base-200">
                <Shield size={19} />
                <span>
                  Sécurité
                </span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-base-200">
                <Bell size={19} />
                <span>
                  Notifications
                </span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-base-200">
                <Palette size={19} />
                <span>
                  Apparence
                </span>
              </button>

            </div>
          </div>

          {/* MAIN SETTINGS */}
          <div className="space-y-6 lg:col-span-2">

            {/* GENERAL */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Globe size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Général
                    </h2>

                    <p className="text-sm text-base-content/50">
                      Configurez les paramètres généraux.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* NOM */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Nom de l'entreprise
                      </span>
                    </label>

                    <input
                      type="text"
                      className="input input-bordered w-full rounded-xl"
                      defaultValue="KARFI HOLDING"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Email administration
                      </span>
                    </label>

                    <input
                      type="email"
                      className="input input-bordered w-full rounded-xl"
                      defaultValue="admin@karfi.ne"
                    />
                  </div>

                  {/* TELEPHONE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Téléphone
                      </span>
                    </label>

                    <input
                      type="tel"
                      className="input input-bordered w-full rounded-xl"
                      placeholder="+227 XX XX XX XX"
                    />
                  </div>

                  {/* LANGUE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Langue
                      </span>
                    </label>

                    <select
                      className="select select-bordered w-full rounded-xl"
                      value={language}
                      onChange={(e) =>
                        setLanguage(e.target.value)
                      }
                    >
                      <option value="fr">
                        Français
                      </option>

                      <option value="en">
                        English
                      </option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 text-warning">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Notifications
                    </h2>

                    <p className="text-sm text-base-content/50">
                      Contrôlez les notifications du système.
                    </p>
                  </div>
                </div>

                {/* NOTIFICATION */}
                <div className="flex items-center justify-between gap-4 rounded-xl bg-base-200 p-4">
                  <div>
                    <p className="font-semibold">
                      Notifications système
                    </p>

                    <p className="text-sm text-base-content/50">
                      Recevoir les notifications importantes.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notifications}
                    onChange={(e) =>
                      setNotifications(e.target.checked)
                    }
                  />
                </div>

                {/* EMAIL */}
                <div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-base-200 p-4">
                  <div>
                    <p className="font-semibold">
                      Notifications email
                    </p>

                    <p className="text-sm text-base-content/50">
                      Recevoir les alertes par email.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(
                        e.target.checked
                      )
                    }
                  />
                </div>

              </div>
            </div>

            {/* SECURITY */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
                    <Lock size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Sécurité
                    </h2>

                    <p className="text-sm text-base-content/50">
                      Gérez la sécurité de votre compte.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">

                  <button className="btn btn-outline justify-start rounded-xl">
                    <Lock size={18} />
                    Modifier le mot de passe
                  </button>

                  <button className="btn btn-outline justify-start rounded-xl">
                    <Shield size={18} />
                    Gérer les sessions
                  </button>

                </div>

              </div>
            </div>

            {/* APPEARANCE */}
            <div className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Palette size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Apparence
                    </h2>

                    <p className="text-sm text-base-content/50">
                      Personnalisez l'interface.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-base-200 p-4">

                  <div>
                    <p className="font-semibold">
                      Mode sombre
                    </p>

                    <p className="text-sm text-base-content/50">
                      Utiliser une interface sombre.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    checked={darkMode}
                    onChange={(e) =>
                      setDarkMode(e.target.checked)
                    }
                  />

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}