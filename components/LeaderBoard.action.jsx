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

export async function addToLeaderBoard(nickname = "test", points = 300) {
  try {
    const newEntry = await prisma.leaderboard.create({
      data: {
        nickname,
        points,
      },
    });
    return { data: newEntry, status: 201 };
  } catch (error) {
    console.error("Error adding to leaderboard:", error);
    return { error: "Failed to add to leaderboard", status: 500 };
  }
}
