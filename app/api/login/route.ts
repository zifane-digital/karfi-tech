import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("========== LOGIN API ==========");

    const body = await request.json();

    console.log("Body reçu :", body);

    return NextResponse.json({
      success: true,
      message: "API LOGIN FONCTIONNE",
      body,
    });
  } catch (error) {
    console.error("ERREUR API LOGIN :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur API",
      },
      {
        status: 500,
      }
    );
  }
}