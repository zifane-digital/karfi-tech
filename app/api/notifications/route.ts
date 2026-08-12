import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Non authentifié.",
        },
        { status: 401 }
      );
    }

    const notifications =
      await prisma.notification.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const unreadCount =
      await prisma.notification.count({
        where: {
          userId: user.id,
          read: false,
        },
      });

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error(
      "❌ GET /api/notifications :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de récupérer les notifications.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Non authentifié.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const title = String(
      body.title || ""
    ).trim();

    const message = String(
      body.message || ""
    ).trim();

    const type = String(
      body.type || "INFO"
    ).toUpperCase();

    if (!title || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Le titre et le message sont obligatoires.",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "INFO",
      "SUCCESS",
      "WARNING",
      "SECURITY",
    ];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Type de notification invalide.",
        },
        { status: 400 }
      );
    }

    const notification =
      await prisma.notification.create({
        data: {
          title,
          message,
          type: type as
            | "INFO"
            | "SUCCESS"
            | "WARNING"
            | "SECURITY",
          userId: user.id,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Notification créée avec succès.",
        notification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "❌ POST /api/notifications :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de créer la notification.",
      },
      { status: 500 }
    );
  }
}