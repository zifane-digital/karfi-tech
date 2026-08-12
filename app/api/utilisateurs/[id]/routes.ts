import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

const updateUserSchema = z.object({
  nom: z.string().min(2).optional(),
  prenom: z.string().min(2).optional(),
  email: z.string().email().optional(),
  telephone: z.string().nullable().optional(),
  password: z.string().min(6).optional(),
  role: z
    .enum([
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
      "DIRECTEUR_FILIALE",
      "EMPLOYE",
      "PARTENAIRE",
      "CLIENT",
      "VISITEUR",
    ])
    .optional(),
  filialeId: z.string().nullable().optional(),
  active: z.boolean().optional(),
});

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
    await requireRole([
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
    ]);

    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        filiale: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Utilisateur introuvable",
        },
        { status: 404 }
      );
    }

    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("GET utilisateur :", error);

    return NextResponse.json(
      {
        error: "Impossible de récupérer l'utilisateur",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await requireRole([
      "SUPER_ADMIN",
      "ADMIN_HOLDING",
    ]);

    const { id } = await context.params;

    const body = await request.json();

    const validation =
      updateUserSchema.safeParse(body);

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
        where: { id },
      });

    if (!existingUser) {
      return NextResponse.json(
        {
          error: "Utilisateur introuvable",
        },
        { status: 404 }
      );
    }

    const updateData: any = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email?.toLowerCase(),
      telephone: data.telephone,
      role: data.role,
      filialeId: data.filialeId,
      active: data.active,
    };

    if (data.password) {
      updateData.password =
        await bcrypt.hash(data.password, 12);
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        filiale: true,
      },
    });

    const { password, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("PUT utilisateur :", error);

    return NextResponse.json(
      {
        error: "Impossible de modifier l'utilisateur",
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
    const currentUser = await requireRole([
      "SUPER_ADMIN",
    ]);

    const { id } = await context.params;

    if (currentUser.id === id) {
      return NextResponse.json(
        {
          error:
            "Vous ne pouvez pas supprimer votre propre compte.",
        },
        { status: 400 }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: { id },
      });

    if (!user) {
      return NextResponse.json(
        {
          error: "Utilisateur introuvable",
        },
        { status: 404 }
      );
    }

    await prisma.session.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprimé.",
    });
  } catch (error) {
    console.error("DELETE utilisateur :", error);

    return NextResponse.json(
      {
        error: "Impossible de supprimer l'utilisateur",
      },
      { status: 500 }
    );
  }
}