// ============= User Types =============

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  role: 'user' | 'admin';
  bio?: string;
  dateOfBirth?: Date;
  gender?: string;
  phone?: string;
  preferences?: UserPreferencesData;
  healthGoals?: HealthGoalData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferencesData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  preferredLanguage: string;
  newsletter: boolean;
  dietaryRestrictions: string[];
  allergies: string[];
}

export interface HealthGoalData {
  id: string;
  goal: string;
  description?: string;
  targetValue?: number;
  targetDate?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  label?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============= Product Types =============

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  images: string[];
  thumbnail?: string;
  categoryId: string;
  category?: CategoryData;
  sku: string;
  stock: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  healthBenefits: string[];
  tags: TagData[];
  ingredients: IngredientData[];
  seo_title?: string;
  seo_description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagData {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IngredientData {
  id: string;
  name: string;
  description?: string;
  benefits: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  categoryId?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
  page?: number;
  limit?: number;
}

// ============= Shopping Types =============

export interface CartItemData {
  id: string;
  productId: string;
  product?: ProductData;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartData {
  items: CartItemData[];
  total: number;
  itemCount: number;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItemData[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: string;
  deliveryStatus?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemData {
  id: string;
  productId: string;
  product?: ProductData;
  quantity: number;
  price: number;
  createdAt: Date;
}

export interface CheckoutData {
  items: CartItemData[];
  shippingAddress: Address;
  paymentMethod: string;
  notes?: string;
}

// ============= Review & Rating Types =============

export interface ReviewData {
  id: string;
  userId: string;
  productId: string;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  helpful: number;
  user?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface RatingData {
  id: string;
  userId: string;
  productId: string;
  score: number; // 1-5
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductRating {
  averageScore: number;
  totalRatings: number;
  ratingDistribution: {
    [key: number]: number; // score: count
  };
}

// ============= Recommendation Types =============

export interface RecommendationData {
  id: string;
  productId: string;
  product?: ProductData;
  type: 'content_based' | 'collaborative' | 'trending' | 'goal_based';
  score: number;
  reason?: string;
  createdAt: Date;
}

export interface RecommendationResponse {
  personalRecommendations: RecommendationData[];
  goalBasedRecommendations: RecommendationData[];
  relatedProducts: RecommendationData[];
  trendingProducts: RecommendationData[];
}

// ============= Pagination Types =============

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ============= API Response Types =============

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}
