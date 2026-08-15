import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const filiale = await prisma.filiale.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            role: true,
            active: true,
          },
        },
      },
    });

    if (!filiale) {
      return NextResponse.json(
        { error: "Filiale introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(filiale);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const filiale = await prisma.filiale.update({
      where: { id },
      data: {
        ...(body.nom !== undefined && {
          nom: body.nom,
        }),

        ...(body.description !== undefined && {
          description: body.description,
        }),

        ...(body.active !== undefined && {
          active: body.active,
        }),
      },
    });

    return NextResponse.json(filiale);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de modifier la filiale.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const users = await prisma.user.count({
      where: {
        filialeId: id,
      },
    });

    if (users > 0) {
      return NextResponse.json(
        {
          error:
            "Impossible de supprimer cette filiale car des utilisateurs y sont associés.",
        },
        { status: 409 }
      );
    }

    await prisma.filiale.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Impossible de supprimer la filiale.",
      },
      { status: 500 }
    );
  }
}
