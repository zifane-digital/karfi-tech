import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";

// =====================================================
// CONNEXION DATABASE
// =====================================================

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "❌ DATABASE_URL n'est pas défini dans le fichier .env"
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// =====================================================
// TYPES
// =====================================================

type PermissionSeed = {
  code: string;
  nom: string;
  description?: string;
  module: string;
};

// =====================================================
// PERMISSIONS
// =====================================================

const permissions: PermissionSeed[] = [
  // ===================================================
  // DASHBOARD
  // ===================================================

  {
    code: "dashboard.read",
    nom: "Voir le tableau de bord",
    description: "Permet de consulter le tableau de bord",
    module: "dashboard",
  },

  // ===================================================
  // UTILISATEURS
  // ===================================================

  {
    code: "users.read",
    nom: "Voir les utilisateurs",
    description: "Permet de consulter les utilisateurs",
    module: "users",
  },

  {
    code: "users.create",
    nom: "Créer un utilisateur",
    description: "Permet de créer un utilisateur",
    module: "users",
  },

  {
    code: "users.update",
    nom: "Modifier un utilisateur",
    description: "Permet de modifier un utilisateur",
    module: "users",
  },

  {
    code: "users.delete",
    nom: "Supprimer un utilisateur",
    description: "Permet de supprimer un utilisateur",
    module: "users",
  },

  // ===================================================
  // FILIALES
  // ===================================================

  {
    code: "filiales.read",
    nom: "Voir les filiales",
    description: "Permet de consulter les filiales",
    module: "filiales",
  },

  {
    code: "filiales.create",
    nom: "Créer une filiale",
    description: "Permet de créer une filiale",
    module: "filiales",
  },

  {
    code: "filiales.update",
    nom: "Modifier une filiale",
    description: "Permet de modifier une filiale",
    module: "filiales",
  },

  {
    code: "filiales.delete",
    nom: "Supprimer une filiale",
    description: "Permet de supprimer une filiale",
    module: "filiales",
  },

  // ===================================================
  // FINANCE
  // ===================================================

  {
    code: "finance.read",
    nom: "Voir les finances",
    description: "Permet de consulter les opérations financières",
    module: "finance",
  },

  {
    code: "finance.create",
    nom: "Créer une opération financière",
    description: "Permet de créer une opération financière",
    module: "finance",
  },

  {
    code: "finance.update",
    nom: "Modifier une opération financière",
    description: "Permet de modifier une opération financière",
    module: "finance",
  },

  {
    code: "finance.validate",
    nom: "Valider une opération financière",
    description: "Permet de valider une opération financière",
    module: "finance",
  },

  // ===================================================
  // CONTRATS
  // ===================================================

  {
    code: "contracts.read",
    nom: "Voir les contrats",
    description: "Permet de consulter les contrats",
    module: "contracts",
  },

  {
    code: "contracts.create",
    nom: "Créer un contrat",
    description: "Permet de créer un contrat",
    module: "contracts",
  },

  {
    code: "contracts.update",
    nom: "Modifier un contrat",
    description: "Permet de modifier un contrat",
    module: "contracts",
  },

  {
    code: "contracts.delete",
    nom: "Supprimer un contrat",
    description: "Permet de supprimer un contrat",
    module: "contracts",
  },

  // ===================================================
  // DOCUMENTS
  // ===================================================

  {
    code: "documents.read",
    nom: "Voir les documents",
    description: "Permet de consulter les documents",
    module: "documents",
  },

  {
    code: "documents.create",
    nom: "Créer un document",
    description: "Permet de créer un document",
    module: "documents",
  },

  {
    code: "documents.update",
    nom: "Modifier un document",
    description: "Permet de modifier un document",
    module: "documents",
  },

  {
    code: "documents.delete",
    nom: "Supprimer un document",
    description: "Permet de supprimer un document",
    module: "documents",
  },

  // ===================================================
  // FINANCEMENT
  // ===================================================

  {
    code: "financing.read",
    nom: "Voir les demandes de financement",
    description: "Permet de consulter les demandes de financement",
    module: "financing",
  },

  {
    code: "financing.create",
    nom: "Créer une demande de financement",
    description: "Permet de créer une demande de financement",
    module: "financing",
  },

  {
    code: "financing.validate",
    nom: "Valider un financement",
    description: "Permet de valider une demande de financement",
    module: "financing",
  },

  {
    code: "financing.reject",
    nom: "Refuser un financement",
    description: "Permet de refuser une demande de financement",
    module: "financing",
  },

  // ===================================================
  // PARAMÈTRES
  // ===================================================

  {
    code: "settings.read",
    nom: "Voir les paramètres",
    description: "Permet de consulter les paramètres",
    module: "settings",
  },

  {
    code: "settings.manage",
    nom: "Gérer les paramètres",
    description: "Permet de gérer les paramètres",
    module: "settings",
  },
];

// =====================================================
// PERMISSIONS PAR RÔLE
// =====================================================

const rolePermissions: Record<Role, string[]> = {
  // ===================================================
  // SUPER ADMIN
  // ===================================================

  SUPER_ADMIN: permissions.map(
    (permission) => permission.code
  ),

  // ===================================================
  // ADMIN HOLDING
  // ===================================================

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

  // ===================================================
  // DIRECTEUR FILIALE
  // ===================================================

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

  // ===================================================
  // EMPLOYÉ
  // ===================================================

  EMPLOYE: [
    "dashboard.read",

    "users.read",

    "filiales.read",

    "documents.read",
    "documents.create",

    "contracts.read",

    "finance.read",
  ],

  // ===================================================
  // PARTENAIRE
  // ===================================================

  PARTENAIRE: [
    "dashboard.read",
    "filiales.read",
    "documents.read",
  ],

  // ===================================================
  // CLIENT
  // ===================================================

  CLIENT: [
    "dashboard.read",

    "documents.read",

    "financing.read",
    "financing.create",
  ],

  // ===================================================
  // VISITEUR
  // ===================================================

  VISITEUR: [
    "dashboard.read",
    "filiales.read",
  ],
};

// =====================================================
// MAIN
// =====================================================

async function main() {
  console.log("");
  console.log("==============================================");
  console.log("🌱 SEED SIIKH - KARFI HOLDING");
  console.log("==============================================");
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

  console.log("");
  console.log("🔐 Création des permissions...");

  const createdPermissions = [];

  for (const permission of permissions) {
    const result = await prisma.permission.upsert({
      where: {
        code: permission.code,
      },

      update: {
        nom: permission.nom,
        description: permission.description,
        module: permission.module,
      },

      create: {
        code: permission.code,
        nom: permission.nom,
        description: permission.description,
        module: permission.module,
      },
    });

    createdPermissions.push(result);
  }

  console.log(
    `✅ ${createdPermissions.length} permissions créées/vérifiées`
  );

  // ===================================================
  // 3. PERMISSIONS DES RÔLES
  // ===================================================

  console.log("");
  console.log("👥 Attribution des permissions aux rôles...");

  for (const [role, permissionCodes] of Object.entries(
    rolePermissions
  )) {
    console.log(`   → ${role}`);

    for (const code of permissionCodes) {
      const permission = createdPermissions.find(
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
  // 4. SUPER ADMIN
  // ===================================================

  console.log("");
  console.log("👑 Création du Super Admin...");

  const adminPassword = await bcrypt.hash(
    "Admin@123456",
    12
  );

  const superAdmin = await prisma.user.upsert({
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
  // 5. USER SETTINGS DU SUPER ADMIN
  // ===================================================

  console.log("");
  console.log("⚙️ Création des paramètres du Super Admin...");

  await prisma.userSettings.upsert({
    where: {
      userId: superAdmin.id,
    },

    update: {
      theme: "system",
      notifications: true,
      emailNotifications: true,
      language: "fr",
      timezone: "Africa/Niamey",
    },

    create: {
      userId: superAdmin.id,
      theme: "system",
      notifications: true,
      emailNotifications: true,
      language: "fr",
      timezone: "Africa/Niamey",
    },
  });

  console.log(
    "✅ Paramètres du Super Admin créés/vérifiés"
  );

  // ===================================================
  // 6. NOTIFICATION DE BIENVENUE
  // ===================================================

  console.log("");
  console.log("🔔 Création de la notification initiale...");

  const existingNotification =
    await prisma.notification.findFirst({
      where: {
        userId: superAdmin.id,
        title: "Bienvenue dans SIIKH",
      },
    });

  if (!existingNotification) {
    await prisma.notification.create({
      data: {
        userId: superAdmin.id,
        title: "Bienvenue dans SIIKH",
        message:
          "Bienvenue dans le Système d’Information Intégré de Karfi Holding.",
        type: "SUCCESS",
        read: false,
      },
    });
  }

  console.log(
    "✅ Notification initiale créée/vérifiée"
  );

  // ===================================================
  // FIN
  // ===================================================

  console.log("");
  console.log("==============================================");
  console.log("🎉 SEED SIIKH TERMINÉ AVEC SUCCÈS");
  console.log("==============================================");
  console.log("");

  console.log("🔐 IDENTIFIANTS DE DÉVELOPPEMENT");
  console.log("----------------------------------------------");
  console.log("Email        : admin@karfi.ne");
  console.log("Mot de passe : Admin@123456");
  console.log("----------------------------------------------");
  console.log("");

  console.log("📊 DONNÉES INITIALISÉES");
  console.log("----------------------------------------------");
  console.log("Filiales     : 4");
  console.log(
    `Permissions  : ${createdPermissions.length}`
  );
  console.log("Super Admin  : 1");
  console.log("----------------------------------------------");
  console.log("");
}

// =====================================================
// EXECUTION
// =====================================================

main()
  .catch((error) => {
    console.error("");
    console.error("==============================================");
    console.error("❌ ERREUR PENDANT LE SEED");
    console.error("==============================================");
    console.error("");
    console.error(error);
    console.error("");

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });