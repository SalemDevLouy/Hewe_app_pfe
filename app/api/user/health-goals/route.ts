import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const healthGoals = await prisma.healthGoal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: healthGoals,
    });
  } catch (error) {
    console.error('Error fetching health goals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch health goals' },
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

    const { goal, description, targetValue, targetDate } = await request.json();

    if (!goal) {
      return NextResponse.json(
        { success: false, error: 'Goal is required' },
        { status: 400 }
      );
    }

    const healthGoal = await prisma.healthGoal.create({
      data: {
        userId: session.user.id,
        goal,
        description,
        targetValue,
        targetDate: targetDate ? new Date(targetDate) : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: healthGoal,
    });
  } catch (error) {
    console.error('Error creating health goal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create health goal' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, isActive, targetValue, targetDate } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Health goal ID is required' },
        { status: 400 }
      );
    }

    // Verify goal belongs to user
    const goal = await prisma.healthGoal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Health goal not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.healthGoal.update({
      where: { id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(targetValue && { targetValue }),
        ...(targetDate && { targetDate: new Date(targetDate) }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating health goal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update health goal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Health goal ID is required' },
        { status: 400 }
      );
    }

    // Verify goal belongs to user
    const goal = await prisma.healthGoal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Health goal not found' },
        { status: 404 }
      );
    }

    await prisma.healthGoal.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Health goal deleted',
    });
  } catch (error) {
    console.error('Error deleting health goal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete health goal' },
      { status: 500 }
    );
  }
}
