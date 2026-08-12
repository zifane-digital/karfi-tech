import "dotenv/config";
import bcrypt from "bcryptjs";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL n'est pas défini dans le fichier .env"
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// =====================================================
// PERMISSIONS
// =====================================================

const permissions = [
  // Dashboard
  {
    code: "dashboard.read",
    nom: "Voir le tableau de bord",
    module: "dashboard",
  },

  // Utilisateurs
  {
    code: "users.read",
    nom: "Voir les utilisateurs",
    module: "users",
  },
  {
    code: "users.create",
    nom: "Créer un utilisateur",
    module: "users",
  },
  {
    code: "users.update",
    nom: "Modifier un utilisateur",
    module: "users",
  },
  {
    code: "users.delete",
    nom: "Supprimer un utilisateur",
    module: "users",
  },

  // Filiales
  {
    code: "filiales.read",
    nom: "Voir les filiales",
    module: "filiales",
  },
  {
    code: "filiales.create",
    nom: "Créer une filiale",
    module: "filiales",
  },
  {
    code: "filiales.update",
    nom: "Modifier une filiale",
    module: "filiales",
  },
  {
    code: "filiales.delete",
    nom: "Supprimer une filiale",
    module: "filiales",
  },

  // Finance
  {
    code: "finance.read",
    nom: "Voir les finances",
    module: "finance",
  },
  {
    code: "finance.create",
    nom: "Créer une opération financière",
    module: "finance",
  },
  {
    code: "finance.update",
    nom: "Modifier une opération financière",
    module: "finance",
  },
  {
    code: "finance.validate",
    nom: "Valider une opération financière",
    module: "finance",
  },

  // Contrats
  {
    code: "contracts.read",
    nom: "Voir les contrats",
    module: "contracts",
  },
  {
    code: "contracts.create",
    nom: "Créer un contrat",
    module: "contracts",
  },
  {
    code: "contracts.update",
    nom: "Modifier un contrat",
    module: "contracts",
  },
  {
    code: "contracts.delete",
    nom: "Supprimer un contrat",
    module: "contracts",
  },

  // Documents
  {
    code: "documents.read",
    nom: "Voir les documents",
    module: "documents",
  },
  {
    code: "documents.create",
    nom: "Créer un document",
    module: "documents",
  },
  {
    code: "documents.update",
    nom: "Modifier un document",
    module: "documents",
  },
  {
    code: "documents.delete",
    nom: "Supprimer un document",
    module: "documents",
  },

  // Financement Karfi Mobilier
  {
    code: "financing.read",
    nom: "Voir les demandes de financement",
    module: "financing",
  },
  {
    code: "financing.create",
    nom: "Créer une demande de financement",
    module: "financing",
  },
  {
    code: "financing.validate",
    nom: "Valider un financement",
    module: "financing",
  },
  {
    code: "financing.reject",
    nom: "Refuser un financement",
    module: "financing",
  },

  // Paramètres
  {
    code: "settings.read",
    nom: "Voir les paramètres",
    module: "settings",
  },
  {
    code: "settings.manage",
    nom: "Gérer les paramètres",
    module: "settings",
  },
];

// =====================================================
// MAIN
// =====================================================

async function main() {
  console.log("");
  console.log("======================================");
  console.log("🌱 SEED SIIKH");
  console.log("======================================");
  console.log("");

  // ===================================================
  // 1. FILIALES
  // ===================================================

  console.log("🏢 Création des filiales...");

  const filiales = [
    {
      code: "AGRO" as const,
      nom: "Karfi Agro",
      description:
        "Agriculture, élevage, apiculture, transformation et conseil.",
    },
    {
      code: "TECH" as const,
      nom: "Karfi Tech",
      description:
        "Développement web/mobile, logiciels, cybersécurité, IA et infographie.",
    },
    {
      code: "MOBILIER" as const,
      nom: "Karfi Mobilier",
      description:
        "Conception, fabrication et financement de mobilier sur mesure.",
    },
    {
      code: "FORMATION" as const,
      nom: "Karfi Formation & Incubation",
      description:
        "Formation, LMS, certifications, coaching et incubation.",
    },
  ];

  for (const filiale of filiales) {
    await prisma.filiale.upsert({
      where: {
        code: filiale.code,
      },
      update: {
        nom: filiale.nom,
        description: filiale.description,
        active: true,
      },
      create: {
        code: filiale.code,
        nom: filiale.nom,
        description: filiale.description,
        active: true,
      },
    });
  }

  console.log("✅ 4 filiales créées/vérifiées");

  // ===================================================
  // 2. PERMISSIONS
  // ===================================================

  console.log("🔐 Création des permissions...");

  const createdPermissions = [];

  for (const permission of permissions) {
    const result = await prisma.permission.upsert({
      where: {
        code: permission.code,
      },
      update: {
        nom: permission.nom,
        module: permission.module,
      },
      create: permission,
    });

    createdPermissions.push(result);
  }

  console.log(
    `✅ ${createdPermissions.length} permissions créées/vérifiées`
  );

  // ===================================================
  // 3. PERMISSIONS PAR RÔLE
  // ===================================================

  console.log(
    "👥 Attribution des permissions aux rôles..."
  );

  const allPermissionCodes = permissions.map(
    (permission) => permission.code
  );

  const rolePermissions: Record<
    Role,
    string[]
  > = {
    // -----------------------------------------------
    // SUPER ADMIN
    // -----------------------------------------------

    SUPER_ADMIN: allPermissionCodes,

    // -----------------------------------------------
    // ADMIN HOLDING
    // -----------------------------------------------

    ADMIN_HOLDING: [
      "dashboard.read",

      "users.read",
      "users.create",
      "users.update",

      "filiales.read",
      "filiales.update",

      "finance.read",
      "finance.create",
      "finance.update",
      "finance.validate",

      "contracts.read",
      "contracts.create",
      "contracts.update",

      "documents.read",
      "documents.create",
      "documents.update",

      "financing.read",
      "financing.validate",
      "financing.reject",

      "settings.read",
    ],

    // -----------------------------------------------
    // DIRECTEUR FILIALE
    // -----------------------------------------------

    DIRECTEUR_FILIALE: [
      "dashboard.read",

      "users.read",

      "filiales.read",

      "finance.read",
      "finance.create",

      "contracts.read",
      "contracts.create",
      "contracts.update",

      "documents.read",
      "documents.create",
      "documents.update",

      "financing.read",
      "financing.create",
    ],

    // -----------------------------------------------
    // EMPLOYÉ
    // -----------------------------------------------

    EMPLOYE: [
      "dashboard.read",

      "users.read",

      "filiales.read",

      "documents.read",
      "documents.create",

      "contracts.read",

      "finance.read",
    ],

    // -----------------------------------------------
    // PARTENAIRE
    // -----------------------------------------------

    PARTENAIRE: [
      "dashboard.read",

      "filiales.read",

      "documents.read",
    ],

    // -----------------------------------------------
    // CLIENT
    // -----------------------------------------------

    CLIENT: [
      "dashboard.read",

      "documents.read",

      "financing.read",
      "financing.create",
    ],

    // -----------------------------------------------
    // VISITEUR
    // -----------------------------------------------

    VISITEUR: [
      "dashboard.read",

      "filiales.read",
    ],
  };

  // ===================================================
  // 4. RELATIONS ROLE / PERMISSION
  // ===================================================

  for (const [
    role,
    permissionCodes,
  ] of Object.entries(rolePermissions)) {
    console.log(`   → ${role}`);

    for (const code of permissionCodes) {
      const permission =
        createdPermissions.find(
          (item) => item.code === code
        );

      if (!permission) {
        console.warn(
          `⚠️ Permission introuvable : ${code}`
        );

        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          role_permissionId: {
            role: role as Role,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          role: role as Role,
          permissionId: permission.id,
        },
      });
    }
  }

  console.log(
    "✅ Permissions attribuées aux rôles"
  );

  // ===================================================
  // 5. SUPER ADMIN
  // ===================================================

  console.log("");
  console.log("👑 Création du Super Admin...");

  const adminPassword = await bcrypt.hash(
    "Admin@123456",
    12
  );

  const superAdmin =
    await prisma.user.upsert({
      where: {
        email: "admin@karfi.ne",
      },

      update: {
        nom: "Administrateur",
        prenom: "Karfi",
        password: adminPassword,
        role: Role.SUPER_ADMIN,
        active: true,
      },

      create: {
        nom: "Administrateur",
        prenom: "Karfi",
        email: "admin@karfi.ne",
        password: adminPassword,
        role: Role.SUPER_ADMIN,
        active: true,
      },
    });

  console.log(
    `✅ Super Admin : ${superAdmin.email}`
  );

  // ===================================================
  // FIN
  // ===================================================

  console.log("");
  console.log("======================================");
  console.log("🎉 SEED SIIKH TERMINÉ AVEC SUCCÈS");
  console.log("======================================");
  console.log("");

  console.log("🔐 Identifiants de développement :");
  console.log(
    "   Email       : admin@karfi.ne"
  );
  console.log(
    "   Mot de passe: Admin@123456"
  );
  console.log("");
}

// =====================================================
// EXECUTION
// =====================================================

main()
  .catch((error) => {
    console.error("");
    console.error(
      "❌ ERREUR PENDANT LE SEED"
    );
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });