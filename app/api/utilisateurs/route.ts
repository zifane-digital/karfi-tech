import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

const createUserSchema = z.object({
  nom: z.string().min(2, "Le nom est obligatoire"),
  prenom: z.string().min(2, "Le prénom est obligatoire"),
  email: z.string().email("Adresse email invalide"),
  telephone: z.string().optional(),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum([
    "SUPER_ADMIN",
    "ADMIN_HOLDING",
    "DIRECTEUR_FILIALE",
    "EMPLOYE",
    "PARTENAIRE",
    "CLIENT",
    "VISITEUR",
  ]),
  filialeId: z.string().nullable().optional(),
  active: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    await requireRole([
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
    ]);

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const role = searchParams.get("role") || "";
    const active = searchParams.get("active");

    const users = await prisma.user.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    nom: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    prenom: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},

          role
            ? {
                role: role as any,
              }
            : {},

          active !== null
            ? {
                active: active === "true",
              }
            : {},
        ],
      },

      include: {
        filiale: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/utilisateurs :", error);

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Impossible de récupérer les utilisateurs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireRole([
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
    ]);

    const body = await request.json();

    const validation =
      createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validation.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: data.email.toLowerCase(),
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Un utilisateur avec cet email existe déjà.",
        },
        { status: 409 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email.toLowerCase(),
        telephone: data.telephone || null,
        password: hashedPassword,
        role: data.role,
        filialeId: data.filialeId || null,
        active: data.active,
      },
      include: {
        filiale: true,
      },
    });

    const { password, ...safeUser } = user;

    return NextResponse.json(
      safeUser,
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/utilisateurs :", error);

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return NextResponse.json(
        { error: "Accès interdit" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        error: "Impossible de créer l'utilisateur",
      },
      { status: 500 }
    );
  }
}