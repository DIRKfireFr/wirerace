import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.APP_ENV !== "prod") globalThis.prismaGlobal = prisma;
