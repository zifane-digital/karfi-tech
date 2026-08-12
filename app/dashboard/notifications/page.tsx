"use client";

import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Info,
  Loader2,
  Trash2,
  AlertTriangle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { useEffect, useState } from "react";

type NotificationType =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  // =====================================================
  // CHARGER NOTIFICATIONS
  // =====================================================

  async function loadNotifications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/notifications",
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de récupérer les notifications."
        );
      }

      setNotifications(
        data.notifications || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Erreur de chargement."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // CHARGEMENT INITIAL
  // =====================================================

  useEffect(() => {
    loadNotifications();
  }, []);

  // =====================================================
  // MARQUER UNE NOTIFICATION COMME LUE
  // =====================================================

  async function markAsRead(
    id: string
  ) {
    try {
      setProcessing(id);

      const response = await fetch(
        `/api/notifications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            read: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de modifier la notification."
        );
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  }

  // =====================================================
  // SUPPRIMER
  // =====================================================

  async function deleteNotification(
    id: string
  ) {
    try {
      setProcessing(id);

      const response = await fetch(
        `/api/notifications/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de supprimer la notification."
        );
      }

      setNotifications((current) =>
        current.filter(
          (notification) =>
            notification.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  }

  // =====================================================
  // TOUT MARQUER COMME LU
  // =====================================================

  async function markAllAsRead() {
    try {
      setProcessing("all");

      const response = await fetch(
        "/api/notifications/read-all",
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Impossible de modifier les notifications."
        );
      }

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(null);
    }
  }

  // =====================================================
  // COMPTEUR
  // =====================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  // =====================================================
  // DATE
  // =====================================================

  function formatDate(
    date: string
  ) {
    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date(date));
  }

  // =====================================================
  // ICON
  // =====================================================

  function getIcon(
    type: NotificationType
  ) {
    switch (type) {
      case "SUCCESS":
        return (
          <Check
            size={20}
            className="text-success"
          />
        );

      case "WARNING":
        return (
          <AlertTriangle
            size={20}
            className="text-warning"
          />
        );

      case "ERROR":
        return (
          <XCircle
            size={20}
            className="text-error"
          />
        );

      default:
        return (
          <Info
            size={20}
            className="text-info"
          />
        );
    }
  }

  // =====================================================
  // COULEUR
  // =====================================================

  function getIconBackground(
    type: NotificationType
  ) {
    switch (type) {
      case "SUCCESS":
        return "bg-success/10";

      case "WARNING":
        return "bg-warning/10";

      case "ERROR":
        return "bg-error/10";

      default:
        return "bg-info/10";
    }
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="text-sm text-base-content/50">
            Chargement des notifications...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bell size={27} />
          </div>

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="badge badge-primary">
                  {unreadCount} nouvelle
                  {unreadCount > 1
                    ? "s"
                    : ""}
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-base-content/50">
              Consultez les dernières
              notifications de votre espace.
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={loadNotifications}
            className="btn btn-ghost btn-sm"
            disabled={
              processing !== null
            }
          >
            <RefreshCw size={17} />
            Actualiser
          </button>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={
                processing !== null
              }
              className="btn btn-primary btn-sm"
            >
              {processing === "all" ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <CheckCheck size={17} />
              )}

              Tout marquer comme lu
            </button>
          )}

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="alert alert-error">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* EMPTY */}

      {notifications.length === 0 ? (
        <div className="rounded-3xl border border-base-300 bg-base-100 p-12 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-200 text-base-content/30">
            <Bell size={34} />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Aucune notification
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-base-content/50">
            Vous n'avez actuellement
            aucune notification.
          </p>

        </div>
      ) : (

        <div className="space-y-3">

          {notifications.map(
            (notification) => (

              <div
                key={notification.id}
                className={`group rounded-2xl border bg-base-100 p-4 shadow-sm transition-all hover:shadow-md sm:p-5 ${
                  notification.read
                    ? "border-base-300"
                    : "border-primary/30 bg-primary/[0.02]"
                }`}
              >

                <div className="flex gap-4">

                  {/* ICON */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getIconBackground(
                      notification.type
                    )}`}
                  >
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="flex items-center gap-2">

                          <h3
                            className={`text-sm font-bold sm:text-base ${
                              notification.read
                                ? ""
                                : "text-primary"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}

                        </div>

                        <p className="mt-1 text-sm leading-6 text-base-content/60">
                          {notification.message}
                        </p>

                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-base-content/40">

                        <Clock size={14} />

                        {formatDate(
                          notification.createdAt
                        )}

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                          disabled={
                            processing !== null
                          }
                          className="btn btn-primary btn-xs"
                        >
                          {processing ===
                          notification.id ? (
                            <Loader2
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Check size={14} />
                          )}

                          Marquer comme lu
                        </button>
                      )}

                      {notification.read && (
                        <span className="badge badge-ghost gap-1">
                          <Check size={12} />
                          Lu
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(
                            notification.id
                          )
                        }
                        disabled={
                          processing !== null
                        }
                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                      >
                        {processing ===
                        notification.id ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={14} />
                        )}

                        Supprimer
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}