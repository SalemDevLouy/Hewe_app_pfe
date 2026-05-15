# HEWEAPP - Implementation Guide

## Overview
This document outlines the complete implementation of the Health & Wellness E-commerce Platform modules, including all API routes, database schemas, and TypeScript types.

## Architecture Overview

```
Frontend (Next.js)
    ↓
API Routes (/api)
    ↓
Database Utilities (db-utils.ts)
    ↓
Prisma ORM
    ↓
MongoDB
```

## Completed Modules

### 1. Database Schema (Prisma)

**Location:** `prisma/schema.prisma`

#### User Module
- `User` - Extended with role, bio, profile fields
- `Address` - User addresses with default address support
- `UserPreferences` - Notification and content preferences
- `HealthGoal` - User wellness goals (weight loss, immunity, etc.)

#### Product Module
- `Product` - Full product details with pricing and inventory
- `Category` - Product categories
- `Tag` - Product tags for better discovery
- `Ingredient` - Product ingredients with benefits
- `ProductTag` - Many-to-many: Product ↔ Tag
- `ProductIngredient` - Many-to-many: Product ↔ Ingredient

#### Shopping Module
- `CartItem` - Shopping cart items per user
- `Order` - Complete order record with status tracking
- `OrderItem` - Order line items

#### Review & Rating Module
- `Review` - User reviews with verified purchase flag
- `Rating` - 1-5 star ratings per product

#### Wishlist Module
- `WishlistItem` - User saved products

#### Recommendation Module
- `ProductRecommendation` - Product recommendations with type and score
- `RecommendationHistory` - Track user interaction with recommendations
- `UserSimilarity` - User-to-user similarity for collaborative filtering
- `ProductSimilarity` - Product-to-product similarity

---

### 2. Database Utilities

**Location:** `app/lib/db-utils.ts`

#### Product Functions
```typescript
getProducts(filters)              // List with filtering & pagination
getProductById(id)                // Single product with details
getProductsByCategory(categoryId)  // Category products
getRelatedProducts(productId)     // Find similar products
getTrendingProducts()             // Sort by popular
```

#### Rating & Review Functions
```typescript
getProductRating(productId)       // Aggregated rating stats
getUserReview(userId, productId)  // Get user's review
getUserRating(userId, productId)  // Get user's rating
```

#### Cart Functions
```typescript
getUserCart(userId)               // Get user's cart
addToCart(userId, productId)      // Add item
removeFromCart(userId, productId) // Remove item
updateCartItemQuantity()          // Update quantity
clearCart(userId)                 // Clear all items
```

#### Order Functions
```typescript
createOrder(userId, data)         // Create order from cart
getUserOrders(userId, page)       // User order history
getOrderById(orderId)             // Single order details
```

#### Wishlist Functions
```typescript
getUserWishlist(userId)           // Get wishlist
addToWishlist(userId, productId)  // Add to wishlist
removeFromWishlist(userId, productId) // Remove from wishlist
```

---

### 3. TypeScript Types

**Location:** `app/lib/types.ts`

Key interfaces exported:
- `UserProfile` - Complete user data
- `ProductData` - Product with all relations
- `CategoryData`, `TagData`, `IngredientData`
- `CartItemData`, `CartData`
- `OrderData`, `OrderItemData`
- `ReviewData`, `RatingData`, `ProductRating`
- `RecommendationData`, `RecommendationResponse`
- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated API responses

---

### 4. API Routes

#### Product Module

**GET /api/products**
```
Query Parameters:
- search: string (product name or description)
- categoryId: string
- minPrice: number
- maxPrice: number
- inStock: boolean
- page: number (default: 1)
- limit: number (default: 12)

Response:
{
  success: boolean,
  data: Product[],
  pagination: { page, limit, total, pages }
}
```

**GET /api/products/[id]**
```
Response includes:
- Product details
- Ratings & reviews
- Related products (5 max)
```

**GET /api/categories**
```
Response:
{
  success: boolean,
  data: Category[]
}
```

**GET /api/tags**
```
Response:
{
  success: boolean,
  data: Tag[]
}
```

#### Shopping Module

**GET /api/cart**
```
Auth Required: YES

Response:
{
  success: boolean,
  data: {
    items: CartItem[],
    total: number,
    itemCount: number
  }
}
```

**POST /api/cart**
```
Auth Required: YES

Body:
{
  productId: string,
  quantity: number (optional, default: 1)
}
```

**PATCH /api/cart**
```
Auth Required: YES
Updates cart item quantity
```

**DELETE /api/cart?productId=xxx**
```
Auth Required: YES
Removes item from cart
```

**GET /api/orders**
```
Auth Required: YES
Query: page, limit (default: 10)

Returns paginated user orders with items
```

**POST /api/orders**
```
Auth Required: YES

Body:
{
  items: [{ productId, quantity, price }],
  shippingAddress: string,
  paymentMethod: string,
  notes: string (optional)
}

Automatically:
- Calculates totals with 10% tax
- Free shipping over $100
- Reduces product stock
- Clears cart
```

**GET /api/orders/[id]**
```
Auth Required: YES
Get order details (user can only access their own)
```

#### Review & Rating Module

**GET /api/reviews?productId=xxx**
```
Get 10 latest reviews for product
Includes user info
```

**POST /api/reviews**
```
Auth Required: YES

Body:
{
  productId: string,
  title: string,
  content: string
}

Checks for verified purchase
Max one review per user per product
```

**GET /api/ratings?productId=xxx**
```
Get aggregated rating stats:
{
  averageScore: number,
  totalRatings: number,
  ratingDistribution: { 1: n, 2: n, 3: n, 4: n, 5: n }
}
```

**POST /api/ratings**
```
Auth Required: YES

Body:
{
  productId: string,
  score: number (1-5)
}

Creates or updates user rating
Returns both user rating and updated product rating
```

#### Wishlist Module

**GET /api/wishlist**
```
Auth Required: YES
Get user's wishlist items with product details
```

**POST /api/wishlist**
```
Auth Required: YES

Body:
{
  productId: string
}
```

**DELETE /api/wishlist?productId=xxx**
```
Auth Required: YES
Remove from wishlist
```

#### User Module

**GET /api/user/profile**
```
Auth Required: YES
Get user profile (name, bio, phone, preferences, health goals)
```

**PATCH /api/user/profile**
```
Auth Required: YES

Body:
{
  name: string,
  bio: string,
  phone: string,
  gender: string,
  dateOfBirth: ISO date string
}
```

**GET /api/user/health-goals**
```
Auth Required: YES
Get all user health goals
```

**POST /api/user/health-goals**
```
Auth Required: YES

Body:
{
  goal: string,
  description: string,
  targetValue: number,
  targetDate: ISO date string
}
```

**PATCH /api/user/health-goals**
```
Auth Required: YES

Body:
{
  id: string,
  isActive: boolean,
  targetValue: number,
  targetDate: string
}
```

**DELETE /api/user/health-goals?id=xxx**
```
Auth Required: YES
Delete health goal
```

**GET /api/user/preferences**
```
Auth Required: YES
Get user notification & content preferences
```

**PATCH /api/user/preferences**
```
Auth Required: YES

Body:
{
  emailNotifications: boolean,
  pushNotifications: boolean,
  smsNotifications: boolean,
  newsletter: boolean,
  dietaryRestrictions: string[],
  allergies: string[]
}
```

**GET /api/user/addresses**
```
Auth Required: YES
Get all user addresses
```

**POST /api/user/addresses**
```
Auth Required: YES

Body:
{
  street: string,
  city: string,
  state: string,
  country: string,
  postalCode: string,
  isDefault: boolean,
  label?: string  // "Home", "Work", etc.
}
```

**PATCH /api/user/addresses**
```
Auth Required: YES
Update address by ID
```

**DELETE /api/user/addresses?id=xxx**
```
Auth Required: YES
Delete address
```

---

### 5. Recommendation Module

**POST /api/recommendations**
```
Auth: Not required but uses quiz profile if available

Body (optional):
{
  userProfile: UserProfile,
  availableProducts: Product[]
}

Uses AI recommendation engine to generate personalized suggestions
```

---

## Key Features Implemented

### ✅ User Management
- Extended user profiles with bio, phone, date of birth
- Role-based access (user/admin)
- User preferences (notifications, content, dietary)
- Health goals tracking
- Multiple addresses with default support

### ✅ Product Catalog
- Full product details with pricing & discounts
- Product categories and tags
- Ingredient tracking with benefits
- Health benefit keywords
- Nutritional information (calories, protein, carbs, fat)
- SEO-friendly structure

### ✅ Shopping Cart
- Add/remove/update items
- Persistent cart storage
- Real-time total calculation
- One cart per user

### ✅ Checkout & Orders
- Complete order workflow
- Automatic tax calculation (10%)
- Free shipping over $100
- Stock management
- Order status tracking
- Delivery status
- Payment status tracking

### ✅ Reviews & Ratings
- 1-5 star ratings
- User reviews with titles and content
- Verified purchase indicators
- Helpful flag for reviews
- Aggregated product ratings
- One rating/review per user per product

### ✅ Wishlist
- Save products for later
- Manage wishlist items
- Quick access for saved products

### ✅ Recommendations
- Content-based filtering
- Goal-based recommendations
- Personalized suggestions based on purchase history
- Trending products
- Related products

---

## Usage Examples

### Get All Products (with filtering)
```
GET /api/products?categoryId=health&minPrice=10&maxPrice=50&search=vitamin&page=1&limit=12
```

### Add to Cart
```
POST /api/cart
{
  "productId": "123abc",
  "quantity": 2
}
```

### Create Order
```
POST /api/orders
{
  "items": [
    { "productId": "123abc", "quantity": 2, "price": 25.99 }
  ],
  "shippingAddress": "123 Main St, City, ST 12345",
  "paymentMethod": "credit_card",
  "notes": "Leave at door"
}
```

### Rate Product
```
POST /api/ratings
{
  "productId": "123abc",
  "score": 5
}
```

### Set Health Goal
```
POST /api/user/health-goals
{
  "goal": "weight_loss",
  "description": "Lose 20 lbs in 3 months",
  "targetValue": 180,
  "targetDate": "2026-08-07T00:00:00Z"
}
```

---

## Error Handling

All API routes follow a consistent error response format:

```typescript
{
  success: false,
  error: "Error message",
  statusCode: 400
}
```

Common Status Codes:
- `400` - Bad Request (missing fields, invalid data)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (unauthorized access)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

---

## Next Steps

### Phase 5: Frontend Components
- Product listing & filtering
- Shopping cart UI
- Checkout flow
- Product details pages
- User profile pages
- Review & rating components

### Phase 6: Admin Dashboard
- Product management (CRUD)
- Order management
- User management
- Analytics dashboard
- Review moderation

### Phase 7: AI/ML Integration
- Recommendation engine improvements
- User similarity calculations
- Product similarity calculations
- Collaborative filtering
- Cold start problem handling

### Phase 8: Advanced Features
- Payment gateway integration (Stripe)
- Email notifications
- Order tracking
- Inventory management
- Analytics & reporting

---

## Database Indexes (Recommended)

```prisma
// For better query performance, consider these indexes:
- Product: (isActive, categoryId)
- CartItem: (userId, productId)
- Order: (userId, createdAt DESC)
- Review: (productId, createdAt DESC)
- Rating: (productId, score)
- Order: (status, createdAt DESC)
```

---

## Environment Variables Required

```env
DATABASE_URL=mongodb://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

---

## File Structure

```
app/
├── api/
│   ├── products/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── categories/route.ts
│   ├── tags/route.ts
│   ├── cart/route.ts
│   ├── orders/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── reviews/route.ts
│   ├── ratings/route.ts
│   ├── wishlist/route.ts
│   ├── user/
│   │   ├── profile/route.ts
│   │   ├── health-goals/route.ts
│   │   ├── preferences/route.ts
│   │   └── addresses/route.ts
│   └── auth/[...nextauth]/route.ts
└── lib/
    ├── types.ts
    ├── db-utils.ts
    ├── prisma.ts
    └── recommendation-engine.ts

prisma/
└── schema.prisma
```

---

## Testing Checklist

- [ ] Product listing and filtering
- [ ] Product details and related products
- [ ] Cart operations (add, remove, update, clear)
- [ ] Checkout and order creation
- [ ] Order history and details
- [ ] Product reviews (create, view)
- [ ] Product ratings (create, update, view aggregated)
- [ ] Wishlist operations
- [ ] User profile management
- [ ] Health goals CRUD
- [ ] Preferences management
- [ ] Address management
- [ ] Authentication guards
- [ ] Pagination
- [ ] Error handling
