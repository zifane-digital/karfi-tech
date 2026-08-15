import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // =====================================================
    // AUTHENTIFICATION
    // =====================================================

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Utilisateur non authentifié.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // STATISTIQUES
    // =====================================================

    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalFiliales,
      activeFiliales,
      totalPermissions,
      totalNotifications,
      unreadNotifications,
      activeSessions,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          active: true,
        },
      }),

      prisma.user.count({
        where: {
          active: false,
        },
      }),

      prisma.filiale.count(),

      prisma.filiale.count({
        where: {
          active: true,
        },
      }),

      prisma.permission.count(),

      prisma.notification.count(),

      prisma.notification.count({
        where: {
          read: false,
        },
      }),

      prisma.session.count({
        where: {
          expiresAt: {
            gt: new Date(),
          },
        },
      }),
    ]);

    // =====================================================
    // FILIALES
    // =====================================================

    const filiales = await prisma.filiale.findMany({
      orderBy: {
        nom: "asc",
      },

      select: {
        id: true,
        code: true,
        nom: true,
        description: true,
        active: true,
        createdAt: true,

        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    // =====================================================
    // UTILISATEURS RÉCENTS
    // =====================================================

    const recentUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 6,

      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        role: true,
        active: true,
        createdAt: true,

        filiale: {
          select: {
            id: true,
            code: true,
            nom: true,
          },
        },
      },
    });

    // =====================================================
    // NOTIFICATIONS RÉCENTES
    // =====================================================

    const recentNotifications =
      await prisma.notification.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 6,

        select: {
          id: true,
          title: true,
          message: true,
          type: true,
          read: true,
          createdAt: true,
        },
      });

    // =====================================================
    // UTILISATEURS PAR RÔLE
    // =====================================================

    const roles = [
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
      "DIRECTEUR_FILIALE",
      "EMPLOYE",
      "PARTENAIRE",
      "CLIENT",
      "VISITEUR",
    ] as const;

    const usersByRole = await Promise.all(
      roles.map(async (role) => {
        const count = await prisma.user.count({
          where: {
            role,
          },
        });

        return {
          role,
          count,
        };
      })
    );

    // =====================================================
    // UTILISATEURS PAR FILIALE
    // =====================================================

    const usersByFiliale = filiales.map((filiale) => ({
      code: filiale.code,
      nom: filiale.nom,
      users: filiale._count.users,
    }));

    // =====================================================
    // ACTIVITÉS
    // =====================================================

    const activities = [
      ...recentUsers.map((item) => ({
        id: `user-${item.id}`,
        type: "USER",
        title: "Nouvel utilisateur",
        description: `${item.prenom} ${item.nom} a rejoint le système.`,
        createdAt: item.createdAt,
      })),

      ...recentNotifications.map((item) => ({
        id: `notification-${item.id}`,
        type: "NOTIFICATION",
        title: item.title,
        description: item.message,
        createdAt: item.createdAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 8);

    // =====================================================
    // RÉPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
        active: user.active,
        filialeId: user.filialeId,
        filiale: user.filiale,
      },

      statistics: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalFiliales,
        activeFiliales,
        totalPermissions,
        totalNotifications,
        unreadNotifications,
        activeSessions,
      },

      filiales,

      usersByRole,

      usersByFiliale,

      recentUsers,

      recentNotifications,

      activities,
    });
  } catch (error) {
    console.error("❌ DASHBOARD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur interne du serveur.",
      },
      {
        status: 500,
      }
    );
  }
}