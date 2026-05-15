You are a senior full-stack software architect and AI engineer.

I am building an intelligent Health & Wellness E-commerce platform with an AI-powered recommendation system.

Your task is to design a production-grade architecture and implementation plan for the following modules.

The platform must include:

# 1. User Module

Features:

* User Registration
* Login / Authentication
* JWT Authentication
* User Profile Management
* User Preferences
* Purchase History
* Recommendation History
* Health Goals
* Saved Products / Wishlist

Requirements:

* Role-based access (User/Admin)
* Secure password hashing
* Session management
* API validation
* User onboarding quiz

# 2. Product Module

Features:

* Product Catalog
* Product Categories
* Product Search
* Product Filtering
* Product Details
* Product Tags
* Product Ingredients
* Product Health Benefits
* Related Products

Requirements:

* Pagination
* Sorting
* Full-text search
* Advanced filtering
* SEO-friendly structure

# 3. Shopping Module

Features:

* Shopping Cart
* Add/Remove Products
* Quantity Management
* Checkout
* Orders
* Order History
* Payment-ready architecture
* Delivery status

Requirements:

* Persistent cart
* Cart synchronization
* Transaction-safe checkout

# 4. Review Module

Features:

* Product Ratings
* Product Reviews
* User Feedback
* Review Moderation
* Verified Purchase Reviews

Requirements:

* Rating aggregation
* Anti-spam validation
* Review analytics

# 5. Recommendation Module (Core AI Module)

This is the most important module.

The system must generate personalized health and wellness product recommendations using Machine Learning.

Requirements:

* Content-Based Filtering
* Collaborative Filtering
* Hybrid Recommendation System
* User similarity calculation
* Product similarity calculation
* Recommendation scoring
* Recommendation ranking
* Recommendation explanation using LLM
* Cold start handling
* User preference learning

The recommendation engine should analyze:

* User preferences
* Purchase history
* Product ratings
* Product categories
* Product ingredients
* User wellness goals

Generate:

* Personalized recommendations
* Similar product recommendations
* Goal-based recommendations
* Trending recommendations

# 6. Admin Dashboard

Features:

* Product Management
* User Management
* Order Management
* Category Management
* Rating & Review Management
* Analytics Dashboard
* Recommendation Monitoring

Requirements:

* Admin authentication
* Dashboard statistics
* CRUD operations
* Audit logging
* System monitoring

# Technical Requirements

Frontend:

* Next.js
* TypeScript
* TailwindCSS
* Responsive Design
* Clean scalable folder structure

Backend:

* NestJS
* REST API
* Modular architecture
* DTO validation
* Authentication & authorization

Database:

* PostgreSQL

AI/ML:

* Python FastAPI microservice
* scikit-learn
* Recommendation engine
* OCR-ready architecture
* LLM integration-ready

Infrastructure:

* Docker-ready
* Environment configuration
* Scalable architecture
* Clean code principles

Now generate:

1. Complete scalable folder structure
2. System architecture
3. Microservices architecture
4. Database schema
5. Main entities and relationships
6. API structure
7. Feature breakdown
8. Recommendation engine architecture
9. Authentication flow
10. Admin dashboard architecture
11. Frontend architecture
12. Backend architecture
13. AI/ML integration architecture
14. Suggested development phases
15. Best practices
16. Security recommendations
17. Production-grade architecture decisions

The architecture should be modern, scalable, modular, clean, and suitable for a graduation project with real-world potential.
