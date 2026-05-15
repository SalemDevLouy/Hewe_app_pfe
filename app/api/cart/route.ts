import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getUserCart, addToCart, removeFromCart, updateCartItemQuantity } from '@/app/lib/db-utils';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as any;

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cart = await getUserCart(session.user.id);

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart' },
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

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const cartItem = await addToCart(session.user.id, productId, quantity);
    const cart = await getUserCart(session.user.id);

    return NextResponse.json({
      success: true,
      data: { cartItem, cart },
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add to cart' },
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
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await removeFromCart(session.user.id, productId);
    const cart = await getUserCart(session.user.id);

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove from cart' },
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

    const { productId, quantity } = await request.json();

    if (!productId || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }

    await updateCartItemQuantity(session.user.id, productId, quantity);
    const cart = await getUserCart(session.user.id);

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}
