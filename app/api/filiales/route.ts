import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const filialeSchema = z.object({
  code: z.enum([
    "AGRO",
    "TECH",
    "MOBILIER",
    "FORMATION",
  ]),

  nom: z
    .string()
    .min(2)
    .max(100),

  description: z
    .string()
    .max(500)
    .optional()
    .nullable(),
});

export async function GET() {
  try {
    const filiales = await prisma.filiale.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
    });

    return NextResponse.json(filiales);
  } catch (error) {
    console.error(
      "Erreur récupération filiales :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de récupérer les filiales.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    // Validation serveur
    const validation =
      filialeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error:
            "Les données envoyées sont invalides.",
          details:
            validation.error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    const {
      code,
      nom,
      description,
    } = validation.data;

    // Vérifier si le code existe déjà
    const existingFiliale =
      await prisma.filiale.findUnique({
        where: {
          code,
        },
      });

    if (existingFiliale) {
      return NextResponse.json(
        {
          error:
            `La filiale avec le code ${code} existe déjà.`,
        },
        {
          status: 409,
        }
      );
    }

    // Création PostgreSQL
    const filiale =
      await prisma.filiale.create({
        data: {
          code,
          nom,
          description:
            description || null,
        },
      });

    return NextResponse.json(
      filiale,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Erreur création filiale :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de créer la filiale.",
      },
      {
        status: 500,
      }
    );
  }
}