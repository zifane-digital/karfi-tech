import { cookies } from "next/headers";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";

// =====================================================
// CONFIGURATION
// =====================================================

export const SESSION_COOKIE = "siikh_session";

const SESSION_DURATION =
  7 * 24 * 60 * 60 * 1000;

// =====================================================
// TYPES
// =====================================================

export type AuthUser = {
  id: string;

  nom: string;
  prenom: string;

  email: string;

  telephone: string | null;

  role:
    | "SUPER_ADMIN"
    | "ADMIN_HOLDING"
    | "DIRECTEUR_FILIALE"
    | "EMPLOYE"
    | "PARTENAIRE"
    | "CLIENT"
    | "VISITEUR";

  active: boolean;

  filialeId: string | null;

  filiale: {
    id: string;
    code: string;
    nom: string;
    description: string | null;
    active: boolean;
  } | null;
};

// =====================================================
// GÉNÉRER TOKEN
// =====================================================

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// =====================================================
// CRÉER SESSION
// =====================================================

export async function createSession(
  userId: string
) {
  const token =
    generateSessionToken();

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  );

  // Créer la session dans PostgreSQL

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  // Créer le cookie

  const cookieStore =
    await cookies();

  cookieStore.set(
    SESSION_COOKIE,
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      expires: expiresAt,

      path: "/",
    }
  );

  return {
    token,
    expiresAt,
  };
}

// =====================================================
// RÉCUPÉRER SESSION
// =====================================================

export async function getCurrentSession() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      SESSION_COOKIE
    )?.value;

  if (!token) {
    return null;
  }

  const session =
    await prisma.session.findUnique({
      where: {
        token,
      },

      include: {
        user: {
          include: {
            filiale: true,
          },
        },
      },
    });

  if (!session) {
    cookieStore.delete(
      SESSION_COOKIE
    );

    return null;
  }

  // Session expirée

  if (
    session.expiresAt <=
    new Date()
  ) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    cookieStore.delete(
      SESSION_COOKIE
    );

    return null;
  }

  // Utilisateur désactivé

  if (!session.user.active) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    cookieStore.delete(
      SESSION_COOKIE
    );

    return null;
  }

  return session;
}

// =====================================================
// UTILISATEUR CONNECTÉ
// =====================================================

export async function getCurrentUser(): Promise<
  AuthUser | null
> {
  const session =
    await getCurrentSession();

  if (!session) {
    return null;
  }

  const user =
    session.user;

  return {
    id: user.id,

    nom: user.nom,

    prenom: user.prenom,

    email: user.email,

    telephone:
      user.telephone,

    role: user.role,

    active: user.active,

    filialeId:
      user.filialeId,

    filiale:
      user.filiale
        ? {
            id:
              user.filiale.id,

            code:
              user.filiale.code,

            nom:
              user.filiale.nom,

            description:
              user.filiale
                .description,

            active:
              user.filiale.active,
          }
        : null,
  };
}

// =====================================================
// UTILISATEUR OBLIGATOIRE
// =====================================================

export async function requireUser(): Promise<AuthUser> {
  const user =
    await getCurrentUser();

  if (!user) {
    throw new Error(
      "UNAUTHORIZED"
    );
  }

  return user;
}

// =====================================================
// SUPPRIMER SESSION ACTUELLE
// =====================================================

export async function deleteCurrentSession() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      SESSION_COOKIE
    )?.value;

  if (token) {
    await prisma.session.deleteMany({
      where: {
        token,
      },
    });
  }

  cookieStore.delete(
    SESSION_COOKIE
  );
}

// =====================================================
// SUPPRIMER TOUTES LES SESSIONS
// =====================================================

export async function deleteAllUserSessions(
  userId: string
) {
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });
}

// =====================================================
// NETTOYER SESSIONS EXPIRÉES
// =====================================================

export async function cleanupExpiredSessions() {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(),
      },
    },
  });
}

// =====================================================
// AUTHENTIFICATION
// =====================================================

export async function isAuthenticated(): Promise<boolean> {
  const user =
    await getCurrentUser();

  return user !== null;
}

// =====================================================
// VÉRIFIER RÔLE
// =====================================================

export async function hasRole(
  roles:
    | AuthUser["role"]
    | AuthUser["role"][]
): Promise<boolean> {
  const user =
    await getCurrentUser();

  if (!user) {
    return false;
  }

  const allowedRoles =
    Array.isArray(roles)
      ? roles
      : [roles];

  return allowedRoles.includes(
    user.role
  );
}

// =====================================================
// VÉRIFIER PERMISSION
// =====================================================

export async function hasPermission(
  permissionCode: string
): Promise<boolean> {
  const user =
    await getCurrentUser();

  if (!user) {
    return false;
  }

  // SUPER ADMIN = tous les droits

  if (
    user.role ===
    "SUPER_ADMIN"
  ) {
    return true;
  }

  const permission =
    await prisma.permission.findUnique({
      where: {
        code: permissionCode,
      },

      select: {
        id: true,
      },
    });

  if (!permission) {
    return false;
  }

  const rolePermission =
    await prisma.rolePermission.findUnique({
      where: {
        role_permissionId: {
          role: user.role,
          permissionId:
            permission.id,
        },
      },

      select: {
        id: true,
      },
    });

  return (
    rolePermission !== null
  );
}

// =====================================================
// EXIGER PERMISSION
// =====================================================

export async function requirePermission(
  permissionCode: string
) {
  const user =
    await requireUser();

  const allowed =
    user.role ===
    "SUPER_ADMIN"
      ? true
      : await hasPermission(
          permissionCode
        );

  if (!allowed) {
    throw new Error(
      "FORBIDDEN"
    );
  }

  return user;
}

// =====================================================
// EXIGER RÔLE
// =====================================================

export async function requireRole(
  roles:
    | AuthUser["role"]
    | AuthUser["role"][]
) {
  const user =
    await requireUser();

  const allowedRoles =
    Array.isArray(roles)
      ? roles
      : [roles];

  if (
    !allowedRoles.includes(
      user.role
    )
  ) {
    throw new Error(
      "FORBIDDEN"
    );
  }

  return user;
}