-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN_HOLDING', 'DIRECTEUR_FILIALE', 'EMPLOYE', 'PARTENAIRE', 'CLIENT', 'VISITEUR');

-- CreateEnum
CREATE TYPE "FilialeCode" AS ENUM ('AGRO', 'TECH', 'MOBILIER', 'FORMATION');

-- CreateTable
CREATE TABLE "Filiale" (
    "id" TEXT NOT NULL,
    "code" "FilialeCode" NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filiale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "filialeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filiale_code_key" ON "Filiale"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_filialeId_idx" ON "User"("filialeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_filialeId_fkey" FOREIGN KEY ("filialeId") REFERENCES "Filiale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
