import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  deleteCurrentSession,
} from "@/lib/auth";

export async function POST() {
  try {
    await deleteCurrentSession();

    const response = NextResponse.json({
      success: true,
      message: "Déconnexion réussie.",
    });

    response.cookies.set(
      SESSION_COOKIE,
      "",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Impossible de se déconnecter.",
      },
      {
        status: 500,
      }
    );
  }
}