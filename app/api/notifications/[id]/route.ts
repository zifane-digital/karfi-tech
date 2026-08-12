import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
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

    const { id } = await context.params;

    const notification =
      await prisma.notification.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!notification) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Notification introuvable.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(
      "❌ GET /api/notifications/[id] :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de récupérer la notification.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
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

    const { id } = await context.params;

    const existing =
      await prisma.notification.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Notification introuvable.",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const read =
      typeof body.read === "boolean"
        ? body.read
        : true;

    const notification =
      await prisma.notification.update({
        where: {
          id,
        },
        data: {
          read,
        },
      });

    return NextResponse.json({
      success: true,
      message: read
        ? "Notification marquée comme lue."
        : "Notification marquée comme non lue.",
      notification,
    });
  } catch (error) {
    console.error(
      "❌ PATCH /api/notifications/[id] :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de modifier la notification.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
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

    const { id } = await context.params;

    const existing =
      await prisma.notification.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Notification introuvable.",
        },
        { status: 404 }
      );
    }

    await prisma.notification.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Notification supprimée avec succès.",
    });
  } catch (error) {
    console.error(
      "❌ DELETE /api/notifications/[id] :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de supprimer la notification.",
      },
      { status: 500 }
    );
  }
}