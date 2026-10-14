# Gabru Looks

The repository contains a React/Vite storefront and a Spring Boot API for a real product catalog. The storefront does not publish sample products; add verified product information through the admin page.

## Stack

- Storefront: React 19, TypeScript, Vite
- API: Java 17, Spring Boot 3.4, MongoDB native driver
- Hosting: Vercel for the storefront; Render for the API
- Product images: HTTPS image URLs, intended for Cloudinary-hosted assets

## Local development

1. Install Node.js 20 or newer, Java 17, Maven 3.9+, and a local MongoDB instance.
2. Copy `.env.example` to `.env` only for local use. Do not commit `.env` or paste database credentials into chat.
3. Start the API from `backend/` with `mvn spring-boot:run`.
4. Start the storefront from the repository root with `npm install` and `npm run dev`.
5. Open `http://localhost:5173`; manage products at `/admin`.

The admin API remains disabled until `ADMIN_USERNAME` and a Spring Security-compatible BCrypt `ADMIN_PASSWORD_HASH` are configured. Use HTTPS in production. Set `APP_ALLOWED_ORIGINS` to the exact Vercel production and preview origins that should call the API.

## Deployment

- Vercel uses `vercel.json` and publishes `frontend/dist`. Set `VITE_API_BASE_URL` to the Render API's HTTPS origin.
- Render uses `render.yaml` and builds `backend/Dockerfile`. Configure `MONGODB_URI`, `MONGODB_DATABASE`, `APP_ALLOWED_ORIGINS`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD_HASH` in Render's environment settings.
- Rotate the Atlas credential that was shared in chat before using the database. Store the replacement only in Render's secret environment variables.
- Add verified catalog data and image URLs through `/admin` after the API is deployed.

## Current scope

This release provides public product browsing and protected product create, edit, publish, inventory-by-size, and delete operations. The local bag is not an order. Checkout is intentionally disabled: customer accounts, order persistence, Razorpay payment creation/webhooks, Shiprocket fulfillment, email/SMS notifications, and customer-facing policies still need implementation and provider/business configuration before real sales. Do not advertise the old demo's generated reviews, delivery estimates, discounts, or policy claims as real.
