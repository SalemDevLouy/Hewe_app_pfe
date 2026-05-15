import { prisma } from '@/lib/prisma';
import { ProductFilters, ProductRating, PaginatedResponse } from './types';

// ============= Product Utilities =============

export async function getProducts(filters: ProductFilters & { page?: number; limit?: number }) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const skip = (page - 1) * limit;

  const where: any = { isActive: true };

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters.minPrice !== undefined) {
    where.price = { gte: filters.minPrice };
  }

  if (filters.maxPrice !== undefined) {
    if (where.price) {
      where.price.lte = filters.maxPrice;
    } else {
      where.price = { lte: filters.maxPrice };
    }
  }

  if (filters.inStock) {
    where.stock = { gt: 0 };
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        tags: { include: { tag: true } },
        ingredients: { include: { ingredient: true } },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      tags: { include: { tag: true } },
      ingredients: { include: { ingredient: true } },
      reviews: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });
}

export async function getProductsByCategory(categoryId: string, limit = 10) {
  return prisma.product.findMany({
    where: {
      categoryId,
      isActive: true,
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    take: limit,
  });
}

export async function getRelatedProducts(productId: string, limit = 5) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { categoryId: true, tags: { select: { tagId: true } } },
  });

  if (!product) return [];

  const tagIds = product.tags.map((t: any) => t.tagId);

  return prisma.product.findMany({
    where: {
      id: { not: productId },
      isActive: true,
      OR: [
        { categoryId: product.categoryId },
        {
          tags: {
            some: {
              tagId: { in: tagIds },
            },
          },
        },
      ],
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    take: limit,
  });
}

export async function getTrendingProducts(limit = 10) {
  return prisma.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// ============= Rating & Review Utilities =============

export async function getProductRating(productId: string): Promise<ProductRating> {
  const ratings = await prisma.rating.findMany({
    where: { productId },
  });

  if (ratings.length === 0) {
    return {
      averageScore: 0,
      totalRatings: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }

  const averageScore = ratings.reduce((sum: number, r: any) => sum + r.score, 0) / ratings.length;
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  ratings.forEach((r: any) => {
    ratingDistribution[r.score as keyof typeof ratingDistribution]++;
  });

  return {
    averageScore: Math.round(averageScore * 10) / 10,
    totalRatings: ratings.length,
    ratingDistribution,
  };
}

export async function getUserReview(userId: string, productId: string) {
  return prisma.review.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });
}

export async function getUserRating(userId: string, productId: string) {
  return prisma.rating.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

// ============= Cart Utilities =============

export async function getUserCart(userId: string) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          discountedPrice: true,
          thumbnail: true,
          stock: true,
        },
      },
    },
  });

  const total = items.reduce((sum: number, item: any) => {
    const price = item.product.discountedPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return {
    items,
    total: Math.round(total * 100) / 100,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
}

export async function removeFromCart(userId: string, productId: string) {
  return prisma.cartItem.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

export async function updateCartItemQuantity(userId: string, productId: string, quantity: number) {
  if (quantity <= 0) {
    return removeFromCart(userId, productId);
  }

  return prisma.cartItem.update({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    data: { quantity },
  });
}

export async function clearCart(userId: string) {
  return prisma.cartItem.deleteMany({
    where: { userId },
  });
}

// ============= Order Utilities =============

export async function createOrder(userId: string, data: any) {
  const orderNumber = `ORD-${Date.now()}`;

  return prisma.order.create({
    data: {
      userId,
      orderNumber,
      subtotal: data.subtotal,
      tax: data.tax || 0,
      shippingCost: data.shippingCost || 0,
      totalAmount: data.totalAmount,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      items: {
        createMany: {
          data: data.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    },
    include: { items: true },
  });
}

export async function getUserOrders(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where: { userId } }),
  ]);

  return {
    data: orders,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              thumbnail: true,
              price: true,
            },
          },
        },
      },
    },
  });
}

// ============= Wishlist Utilities =============

export async function getUserWishlist(userId: string) {
  return prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      },
    },
  });
}

export async function addToWishlist(userId: string, productId: string) {
  return prisma.wishlistItem.create({
    data: {
      userId,
      productId,
    },
  });
}

export async function removeFromWishlist(userId: string, productId: string) {
  return prisma.wishlistItem.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
}

// ============= Category & Tag Utilities =============

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getAllTags() {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}
