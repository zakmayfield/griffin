import { prisma } from "~/db.server";
export type { Session } from "@prisma/client";

export function getAllSessions() {
  return prisma.session.findMany()
}

// i wouldn't have chose such a similar name to our 'sessions' for these tables 
export function getSession(id: string) {
  return prisma.session.findUnique({
    where: {
      id
    }
  })
}