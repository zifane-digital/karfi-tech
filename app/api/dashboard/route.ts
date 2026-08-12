
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("=================================");
  console.log("📊 API DASHBOARD START");
  console.log("=================================");

  try {
    // =====================================================
    // 1. AUTHENTIFICATION
    // =====================================================

    console.log("🔐 Vérification utilisateur...");

    const user = await getCurrentUser();

    console.log(
      "👤 Utilisateur :",
      user
        ? `${user.prenom} ${user.nom} (${user.email})`
        : "AUCUN"
    );

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
    // 2. TEST PRISMA
    // =====================================================

    console.log("🗄️ Test Prisma...");

    await prisma.$queryRaw`SELECT 1`;

    console.log("✅ Prisma fonctionne");

    // =====================================================
    // 3. STATISTIQUES
    // =====================================================

    console.log("📊 Chargement statistiques...");

    const totalUsers = await prisma.user.count();

    console.log(
      "👥 Total utilisateurs :",
      totalUsers
    );

    const activeUsers = await prisma.user.count({
      where: {
        active: true,
      },
    });

    console.log(
      "🟢 Utilisateurs actifs :",
      activeUsers
    );

    const totalFiliales = await prisma.filiale.count();

    console.log(
      "🏢 Total filiales :",
      totalFiliales
    );

    const activeFiliales = await prisma.filiale.count({
      where: {
        active: true,
      },
    });

    console.log(
      "🟢 Filiales actives :",
      activeFiliales
    );

    const totalSessions = await prisma.session.count({
      where: {
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    console.log(
      "🔐 Sessions actives :",
      totalSessions
    );

    // =====================================================
    // 4. FILIALES
    // =====================================================

    console.log("🏢 Chargement filiales...");

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
      },
    });

    console.log(
      "✅ Filiales chargées :",
      filiales.length
    );

    // =====================================================
    // 5. UTILISATEURS RÉCENTS
    // =====================================================

    console.log(
      "👥 Chargement utilisateurs récents..."
    );

    const recentUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 5,

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

    console.log(
      "✅ Utilisateurs récents :",
      recentUsers.length
    );

    // =====================================================
    // 6. ACTIVITÉS
    // =====================================================

    const activities = recentUsers.map(
      (item) => ({
        id: `user-${item.id}`,

        type: "USER_CREATED",

        title: "Utilisateur enregistré",

        description: `${item.prenom} ${item.nom} a été ajouté au système.`,

        createdAt: item.createdAt,
      })
    );

    // =====================================================
    // 7. RÉPONSE
    // =====================================================

    const response = {
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
        totalFiliales,
        activeFiliales,
        totalSessions,
      },

      filiales,

      recentUsers,

      activities,
    };

    console.log("=================================");
    console.log("✅ API DASHBOARD SUCCESS");
    console.log("=================================");

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "❌ ERREUR API DASHBOARD"
    );

    console.error(
      "================================="
    );

    console.error(error);

    let message =
      "Erreur interne du serveur.";

    if (error instanceof Error) {
      message = error.message;

      console.error(
        "MESSAGE :",
        error.message
      );

      console.error(
        "STACK :",
        error.stack
      );
    }

    return NextResponse.json(
      {
        success: false,

        error: message,

        message,

        details:
          process.env.NODE_ENV ===
          "development"
            ? error instanceof Error
              ? error.stack
              : String(error)
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

