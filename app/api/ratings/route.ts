import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { getProductRating, getUserRating } from '@/app/lib/db-utils';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const rating = await getProductRating(productId);

    return NextResponse.json({
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error('Error fetching rating:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rating' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { productId, score } = await request.json();

    if (!productId || score === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product ID and score are required' },
        { status: 400 }
      );
    }

    if (score < 1 || score > 5) {
      return NextResponse.json(
        { success: false, error: 'Score must be between 1 and 5' },
        { status: 400 }
      );
    }

    const existingRating = await getUserRating(session.user.id, productId);

    let rating;
    if (existingRating) {
      rating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { score },
      });
    } else {
      rating = await prisma.rating.create({
        data: {
          userId: session.user.id,
          productId,
          score,
        },
      });
    }

    const updatedRating = await getProductRating(productId);

    return NextResponse.json({
      success: true,
      data: {
        userRating: rating,
        productRating: updatedRating,
      },
    });
  } catch (error) {
    console.error('Error creating/updating rating:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create/update rating' },
      { status: 500 }
    );
  }
}
