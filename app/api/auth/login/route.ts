import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email et mot de passe obligatoires.",
        },
        { status: 400 }
      );
    }

    console.log("🔐 Tentative de connexion :", email);

    // =====================================================
    // RECHERCHE UTILISATEUR
    // =====================================================

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        filiale: true,
      },
    });

    if (!user) {
      console.log("❌ Utilisateur introuvable :", email);

      return NextResponse.json(
        {
          success: false,
          error: "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // VÉRIFICATION COMPTE
    // =====================================================

    if (!user.active) {
      console.log("⚠️ Compte désactivé :", email);

      return NextResponse.json(
        {
          success: false,
          error: "Votre compte est désactivé.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // VÉRIFICATION MOT DE PASSE
    // =====================================================

    const passwordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValid) {
      console.log("❌ Mot de passe incorrect :", email);

      return NextResponse.json(
        {
          success: false,
          error: "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // CRÉATION DE SESSION
    // =====================================================

    await createSession(user.id);

    console.log("✅ Connexion réussie :", user.email);

    // =====================================================
    // RÉPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: "Connexion réussie.",

        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
          active: user.active,
          filialeId: user.filialeId,

          filiale: user.filiale
            ? {
                id: user.filiale.id,
                code: user.filiale.code,
                nom: user.filiale.nom,
                description: user.filiale.description,
                active: user.filiale.active,
              }
            : null,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ ERREUR API LOGIN :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur interne du serveur.",
      },
      { status: 500 }
    );
  }
}