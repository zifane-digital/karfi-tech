import { getSession } from "./session";

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export async function hasPermission(
  permissionCode: string
): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  // SUPER_ADMIN possède toutes les permissions
  if (session.user.role === "SUPER_ADMIN") {
    return true;
  }

  const permission =
    await prismaPermission(permissionCode);

  return permission;
}

async function prismaPermission(
  permissionCode: string
): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  // Cette fonction sera finalisée avec Prisma
  // dans l'étape RBAC complète.
  return false;
}