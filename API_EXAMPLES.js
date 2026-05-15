// ============= QUICKSTART GUIDE =============
// Copy and paste these code snippets to test the implementation

// 1. GET ALL PRODUCTS (with filters and pagination)
fetch('/api/products?categoryId=health&minPrice=10&maxPrice=50&page=1&limit=12')
  .then(r => r.json())
  .then(d => console.log('Products:', d))

// 2. GET SINGLE PRODUCT WITH RELATED PRODUCTS
fetch('/api/products/[productId]')
  .then(r => r.json())
  .then(d => console.log('Product:', d))

// 3. ADD TO CART
fetch('/api/cart', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '[productId]',
    quantity: 2
  })
})
  .then(r => r.json())
  .then(d => console.log('Added to cart:', d))

// 4. GET CART
fetch('/api/cart', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(d => console.log('Cart:', d))

// 5. CHECKOUT
fetch('/api/orders', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [
      { productId: '[productId]', quantity: 1, price: 25.99 }
    ],
    shippingAddress: '123 Main St, City, ST 12345',
    paymentMethod: 'credit_card',
    notes: 'Leave at door'
  })
})
  .then(r => r.json())
  .then(d => console.log('Order created:', d))

// 6. GET ORDER DETAILS
fetch('/api/orders/[orderId]', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(d => console.log('Order:', d))

// 7. GET USER PROFILE
fetch('/api/user/profile', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(d => console.log('Profile:', d))

// 8. UPDATE PROFILE
fetch('/api/user/profile', {
  method: 'PATCH',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    bio: 'Health enthusiast',
    phone: '+1234567890'
  })
})
  .then(r => r.json())
  .then(d => console.log('Profile updated:', d))

// 9. SET HEALTH GOAL
fetch('/api/user/health-goals', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    goal: 'weight_loss',
    description: 'Lose weight by summer',
    targetValue: 180,
    targetDate: '2026-06-01T00:00:00Z'
  })
})
  .then(r => r.json())
  .then(d => console.log('Goal set:', d))

// 10. RATE A PRODUCT
fetch('/api/ratings', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '[productId]',
    score: 5
  })
})
  .then(r => r.json())
  .then(d => console.log('Rating saved:', d))

// 11. WRITE A REVIEW
fetch('/api/reviews', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '[productId]',
    title: 'Great product!',
    content: 'Really helped me with my fitness goals'
  })
})
  .then(r => r.json())
  .then(d => console.log('Review posted:', d))

// 12. GET PRODUCT REVIEWS
fetch('/api/reviews?productId=[productId]')
  .then(r => r.json())
  .then(d => console.log('Reviews:', d))

// 13. ADD TO WISHLIST
fetch('/api/wishlist', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '[productId]'
  })
})
  .then(r => r.json())
  .then(d => console.log('Added to wishlist:', d))

// 14. GET WISHLIST
fetch('/api/wishlist', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(d => console.log('Wishlist:', d))

// 15. ADD ADDRESS
fetch('/api/user/addresses', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postalCode: '10001',
    label: 'Home',
    isDefault: true
  })
})
  .then(r => r.json())
  .then(d => console.log('Address saved:', d))

// 16. GET CATEGORIES
fetch('/api/categories')
  .then(r => r.json())
  .then(d => console.log('Categories:', d))

// 17. GET RECOMMENDATIONS
fetch('/api/recommendations', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
  .then(r => r.json())
  .then(d => console.log('Recommendations:', d))

// Replace [productId], [orderId] with actual IDs
