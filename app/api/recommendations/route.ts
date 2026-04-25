import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import {
  Product,
  UserProfile,
  generateRecommendations,
  normalizeQuizProfile,
} from "@/lib/recommendation-engine";

type RawQuizCommandResult = {
  cursor?: {
    firstBatch?: Array<{
      data?: Record<string, unknown>;
    }>;
  };
};

async function getProfileFromSession(): Promise<UserProfile | null> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const commandResult = (await prisma.$runCommandRaw({
    find: "QuizProfile",
    filter: { userId },
    limit: 1,
  })) as RawQuizCommandResult;

  const quizData = commandResult.cursor?.firstBatch?.[0]?.data;

  if (!quizData) {
    return null;
  }

  return normalizeQuizProfile(quizData);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const providedProfile = body?.userProfile as UserProfile | undefined;
    const providedProducts = body?.availableProducts as Product[] | undefined;

    const userProfile = providedProfile ?? (await getProfileFromSession());

    if (!userProfile) {
      return NextResponse.json(
        { error: "No user profile available. Complete quiz or send userProfile in body." },
        { status: 400 }
      );
    }

    const output = generateRecommendations(userProfile, Array.isArray(providedProducts) ? providedProducts : undefined);
    return NextResponse.json(output);
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
