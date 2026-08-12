import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH() {
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

    const result =
      await prisma.notification.updateMany({
        where: {
          userId: user.id,
          read: false,
        },
        data: {
          read: true,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Toutes les notifications ont été marquées comme lues.",
      count: result.count,
    });
  } catch (error) {
    console.error(
      "❌ PATCH /api/notifications/read-all :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de marquer les notifications comme lues.",
      },
      { status: 500 }
    );
  }
}