import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { getUserOrders, createOrder, getOrderById, clearCart } from '@/app/lib/db-utils';
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

    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const result = await getUserOrders(session.user.id, page, limit);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
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

    const { items, shippingAddress, paymentMethod, notes } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Shipping address and payment method are required' },
        { status: 400 }
      );
    }

    // Calculate totals
    let subtotal = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      const price = product.discountedPrice || product.price;
      subtotal += price * item.quantity;

      // Check stock
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      // Reduce stock
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: product.stock - item.quantity },
      });
    }

    const tax = Math.round(subtotal * 0.1 * 100) / 100; // 10% tax
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const totalAmount = subtotal + tax + shippingCost;

    const order = await createOrder(session.user.id, {
      items: items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
    });

    // Clear cart
    await clearCart(session.user.id);

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
