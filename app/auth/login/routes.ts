
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  createSession,
  SESSION_COOKIE,
} from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Veuillez renseigner votre email et votre mot de passe.",
        },
        { status: 400 }
      );
    }

    // =================================================
    // RECHERCHE UTILISATEUR
    // =================================================

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          filiale: true,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    // =================================================
    // VÉRIFICATION DU COMPTE
    // =================================================

    if (!user.active) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Votre compte est désactivé.",
        },
        { status: 403 }
      );
    }

    // =================================================
    // VÉRIFICATION MOT DE PASSE
    // =================================================

    const passwordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email ou mot de passe incorrect.",
        },
        { status: 401 }
      );
    }

    // =================================================
    // CRÉATION SESSION
    // =================================================

    const session =
      await createSession(user.id);

    // =================================================
    // RÉPONSE
    // =================================================

    const response =
      NextResponse.json({
        success: true,
        message:
          "Connexion réussie.",
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          filiale: user.filiale
            ? {
                id: user.filiale.id,
                code: user.filiale.code,
                nom: user.filiale.nom,
              }
            : null,
        },
      });

    response.cookies.set(
      SESSION_COOKIE,
      session.token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
        expires: session.expiresAt,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Erreur login:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Une erreur interne est survenue.",
      },
      { status: 500 }
    );
  }
}

