import { prisma } from "@/lib/prisma";

export async function hasPermission(
  userId: string,
  permissionCode: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
      active: true,
    },
  });

  if (!user || !user.active) {
    return false;
  }

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  const permission =
    await prisma.permission.findUnique({
      where: {
        code: permissionCode,
      },
      select: {
        id: true,
      },
    });

  if (!permission) {
    return false;
  }

  const rolePermission =
    await prisma.rolePermission.findUnique({
      where: {
        role_permissionId: {
          role: user.role,
          permissionId: permission.id,
        },
      },
    });

  return Boolean(rolePermission);
}