import { NextResponse } from "next/server";

import { deleteCurrentSession } from "@/lib/auth";

export async function POST() {
  try {
    await deleteCurrentSession();

    return NextResponse.json({
      success: true,
      message: "Déconnexion réussie.",
    });
  } catch (error) {
    console.error(
      "❌ ERREUR LOGOUT :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Impossible de se déconnecter.",
      },
      { status: 500 }
    );
  }
}