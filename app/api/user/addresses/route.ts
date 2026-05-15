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

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch addresses' },
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

    const { street, city, state, country, postalCode, isDefault, label } = await request.json();

    if (!street || !city || !state || !country || !postalCode) {
      return NextResponse.json(
        { success: false, error: 'All address fields are required' },
        { status: 400 }
      );
    }

    // If setting as default, remove default from others
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        street,
        city,
        state,
        country,
        postalCode,
        isDefault: isDefault || false,
        label,
      },
    });

    return NextResponse.json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create address' },
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

    const { id, street, city, state, country, postalCode, isDefault, label } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Address ID is required' },
        { status: 400 }
      );
    }

    // Verify address belongs to user
    const address = await prisma.address.findUnique({
      where: { id },
    });

    if (!address || address.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    // If setting as default, remove default from others
    if (isDefault && !address.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const updated = await prisma.address.update({
      where: { id },
      data: {
        ...(street && { street }),
        ...(city && { city }),
        ...(state && { state }),
        ...(country && { country }),
        ...(postalCode && { postalCode }),
        ...(isDefault !== undefined && { isDefault }),
        ...(label && { label }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update address' },
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
        { success: false, error: 'Address ID is required' },
        { status: 400 }
      );
    }

    // Verify address belongs to user
    const address = await prisma.address.findUnique({
      where: { id },
    });

    if (!address || address.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      );
    }

    await prisma.address.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Address deleted',
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete address' },
      { status: 500 }
    );
  }
}
