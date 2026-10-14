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

## Marketplace workflow

- Public catalog entries are either `DROPSHIP` or `PRELOVED`; buyers can filter between them.
- Sellers can submit pre-loved shoes, jackets, bags, clothing, and accessories with condition, size, price, description, and 3-8 HTTPS photo URLs. Contact details are visible only in the protected admin response.
- Seller submissions always begin as unpublished `PENDING` listings with one unit of stock. Admins can approve or reject them; approved listings become public.
- Dropship products are added by admins with supplier stock quantities. Supplier identity, supplier feeds, fulfillment, and dispatch estimates are not integrated yet.
- Product administration includes create, edit, publish/draft, stock-by-size, review, and delete operations.

## Launch gates

The bag is local-only and is not an order. Shopper/seller accounts, order persistence, checkout, Razorpay payment creation/webhooks, Shiprocket labels and tracking, seller settlement, email/SMS, spam/rate protection for public seller submissions, and approved returns/disputes terms are not implemented. Do not accept payments or promise delivery, payouts, returns, or authentication until these workflows are built and configured. Expensive-item authenticity is not certified. Do not advertise the old demo's generated reviews, delivery estimates, discounts, or policy claims as real.

The Vercel and Render manifests prepare service configuration but do not deploy into the supplied dashboards. Before launch, rotate the Atlas credential shared in chat, set new secrets directly in Render, configure the real Vercel and Render origins, verify the Cloudinary setup and approved catalog, and test all provider webhooks in sandbox mode.
