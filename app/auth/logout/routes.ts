
import { NextResponse } from "next/server";

import {
  deleteCurrentSession,
} from "@/lib/auth";

export async function POST() {
  try {
    await deleteCurrentSession();

    return NextResponse.json({
      success: true,
      message: "Déconnexion réussie.",
    });
  } catch (error) {
    console.error(
      "Erreur logout:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur pendant la déconnexion.",
      },
      { status: 500 }
    );
  }
}

