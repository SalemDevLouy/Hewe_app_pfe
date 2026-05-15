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

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    if (!preferences) {
      // Create default preferences
      const newPreferences = await prisma.userPreferences.create({
        data: { userId: session.user.id },
      });
      return NextResponse.json({
        success: true,
        data: newPreferences,
      });
    }

    return NextResponse.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch preferences' },
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

    const {
      emailNotifications,
      pushNotifications,
      smsNotifications,
      newsletter,
      dietaryRestrictions,
      allergies,
    } = await request.json();

    let preferences = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id },
    });

    if (!preferences) {
      preferences = await prisma.userPreferences.create({
        data: { userId: session.user.id },
      });
    }

    const updated = await prisma.userPreferences.update({
      where: { id: preferences.id },
      data: {
        ...(emailNotifications !== undefined && { emailNotifications }),
        ...(pushNotifications !== undefined && { pushNotifications }),
        ...(smsNotifications !== undefined && { smsNotifications }),
        ...(newsletter !== undefined && { newsletter }),
        ...(dietaryRestrictions && { dietaryRestrictions }),
        ...(allergies && { allergies }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}
