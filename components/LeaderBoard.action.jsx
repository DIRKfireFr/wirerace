"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLeaderBoard() {
  try {
    const leaderboard = await prisma.post.findMany({
      orderBy: {
        points: "desc",
      },
    });
    return { data: leaderboard || [], status: 200 };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { data: [], error: "Failed to fetch leaderboard", status: 500 };
  }
}

export async function addToLeaderBoard({ nickname, points }) {
  if (!nickname || typeof nickname !== "string" || nickname.trim() === "") {
    return { error: "Le pseudo est invalide.", status: 400 };
  }

  if (typeof points !== "number" || points <= 0) {
    return { error: "Le nombre de points est invalide.", status: 400 };
  }

  try {
    const newEntry = await prisma.post.create({
      data: {
        nickname,
        points,
      },
    });

    return { status: 201 };
  } catch (error) {
    console.error("Error adding to leaderboard:", error);
    return { error: error, status: 500 };
  }
}
