import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getRelatedProducts, getProductRating } from '@/app/lib/db-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const [rating, relatedProducts] = await Promise.all([
      getProductRating(product.id),
      getRelatedProducts(product.id, 5),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        rating,
        relatedProducts,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
