-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'KEPALA_LAB', 'TEKNISI', 'KEPALA_JURUSAN');

-- CreateEnum
CREATE TYPE "Organization" AS ENUM ('POLIJE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "ServiceFor" AS ENUM ('INTERNAL', 'EKSTERNAL', 'INTERNAL_JURKES', 'STUDENT', 'ALL');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('RENT', 'LEND', 'SERVICE', 'TRAINING');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('PER_HOUR', 'PER_DAY', 'PER_3_MONTHS', 'PER_1_7_DAYS', 'PER_PACKAGE', 'PER_WEEK', 'PER_USAGE', 'PER_PC_DAY', 'PER_MONTH', 'PER_ANALYSIS', 'PER_MOUSE', 'PER_SAMPLE', 'PER_ANIMAL', 'PER_PERSON', 'PER_14_MEETINGS', 'PER_28_MEETINGS', 'PER_7_MEETINGS', 'PER_1_METHOD_3_MEETINGS', 'PER_12_MEETINGS', 'PER_STUDENT', 'PER_ACTIVITY_DAY_PERSON', 'PER_PERSON_DAY', 'STARTING_FROM', 'PER_DESIGN_METER', 'PER_APPLICATION', 'PER_FORM', 'PER_REPORT', 'PER_RESPONDENT', 'PER_PERSON_MONTH', 'PER_PERSON_2_HOURS', 'PER_VIDEO', 'PER_MATERIAL', 'PER_AD', 'PER_PROTOTYPE', 'PER_DESIGN');

-- CreateEnum
CREATE TYPE "PortfolioType" AS ENUM ('RESEARCH', 'PROJECT', 'COMMUNITY_SERVICE');

-- CreateEnum
CREATE TYPE "AuthorRole" AS ENUM ('PRIMARY', 'CO_AUTHOR', 'CONTRIBUTOR');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AWAITING_VERIFICATION', 'COMPLETED', 'REJECTED', 'FAILED', 'REFUNDED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'WARNING', 'ALERT');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "CategoryFor" AS ENUM ('RESEARCH', 'ARTICLE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CASH', 'CREDIT_CARD', 'E_WALLET');

-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'PROCESSED', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "silab_users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "job" VARCHAR(100),
    "phone" VARCHAR(20),
    "address" VARCHAR(255),
    "organization" "Organization" NOT NULL,
    "image" VARCHAR(255) DEFAULT '/profile-img.png',
    "notificationPreferences" TEXT,
    "deleteReason" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "silab_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" VARCHAR(255) NOT NULL,

    CONSTRAINT "silab_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_verification_tokens" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "silab_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_password_reset_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "silab_password_reset_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_laboratories" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "coverImg" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "contactName" VARCHAR(100) NOT NULL,
    "contactEmail" VARCHAR(255) NOT NULL,
    "contactPhone" VARCHAR(20) NOT NULL,
    "floorPlanUrl" VARCHAR(255),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_laboratories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_facilities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image" VARCHAR(255),
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_services" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "price" DECIMAL(10,2) NOT NULL,
    "unit" "Unit" NOT NULL,
    "isRange" BOOLEAN NOT NULL DEFAULT false,
    "for" "ServiceFor" NOT NULL DEFAULT 'ALL',
    "type" "ServiceType" NOT NULL,
    "maxNumber" INTEGER DEFAULT 0,
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_laboratory_images" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "imageUrl" VARCHAR(255) NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_laboratory_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_laboratory_managers" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_laboratory_managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_research_portfolios" (
    "id" SERIAL NOT NULL,
    "coverImg" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "abstract" VARCHAR NOT NULL,
    "content" TEXT,
    "publishedDate" TIMESTAMP(3),
    "researchLocation" VARCHAR(255) NOT NULL,
    "researchDate" TIMESTAMP(3) NOT NULL,
    "correspondenceEmail" VARCHAR(255) NOT NULL,
    "studyProgram" VARCHAR(100) NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "doi" VARCHAR(100),
    "type" "PortfolioType" NOT NULL,
    "viewCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_research_portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_category_researchs" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_category_researchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_research_portfolio_authors" (
    "id" SERIAL NOT NULL,
    "researchPortfolioId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "AuthorRole" NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_research_portfolio_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_articles" (
    "id" SERIAL NOT NULL,
    "coverImg" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "summary" VARCHAR,
    "content" TEXT,
    "author" TEXT NOT NULL,
    "viewCount" INTEGER,
    "publishedDate" TIMESTAMP(3),
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_category_articles" (
    "id" SERIAL NOT NULL,
    "articleId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_category_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_reservations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" "ReservationStatus" NOT NULL,
    "type" "ServiceType" NOT NULL,
    "unit" "Unit" NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectedReason" TEXT,
    "cancelationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_add_ons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_add_ons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_reservation_add_ons" (
    "id" SERIAL NOT NULL,
    "reservationId" TEXT NOT NULL,
    "addOnId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "silab_reservation_add_ons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_payments" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3) NOT NULL,
    "verificationDate" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "transactionId" TEXT,
    "paymentProofUrl" TEXT,
    "notes" TEXT,
    "rejectionReason" TEXT,
    "failedReason" TEXT,
    "refundStatus" "RefundStatus",
    "refundDate" TIMESTAMP(3),
    "refundAmount" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_reviews" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "reservationId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_notifications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservationId" TEXT,

    CONSTRAINT "silab_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_operational_hours" (
    "id" SERIAL NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "breakStartTime" TIMESTAMP(3),
    "breakEndTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_operational_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_reservation_histories" (
    "id" SERIAL NOT NULL,
    "reservationId" TEXT NOT NULL,
    "changeType" "ChangeType" NOT NULL,
    "oldData" JSONB NOT NULL,
    "newData" JSONB NOT NULL,
    "changedById" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_reservation_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_category" (
    "id" SERIAL NOT NULL,
    "for" "CategoryFor" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "silab_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "silab_files" (
    "id" SERIAL NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "fileType" VARCHAR(50) NOT NULL,
    "fileUrl" VARCHAR(255) NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "researchPortfolioId" INTEGER,
    "paymentId" TEXT,
    "articleId" INTEGER,

    CONSTRAINT "silab_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "silab_users_email_key" ON "silab_users"("email");

-- CreateIndex
CREATE INDEX "silab_users_email_idx" ON "silab_users"("email");

-- CreateIndex
CREATE INDEX "silab_users_role_idx" ON "silab_users"("role");

-- CreateIndex
CREATE INDEX "silab_users_organization_idx" ON "silab_users"("organization");

-- CreateIndex
CREATE INDEX "silab_users_isDeleted_idx" ON "silab_users"("isDeleted");

-- CreateIndex
CREATE INDEX "silab_users_createdAt_idx" ON "silab_users"("createdAt");

-- CreateIndex
CREATE INDEX "silab_accounts_userId_idx" ON "silab_accounts"("userId");

-- CreateIndex
CREATE INDEX "silab_accounts_providerType_providerId_idx" ON "silab_accounts"("providerType", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "silab_accounts_providerId_providerAccountId_key" ON "silab_accounts"("providerId", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "silab_sessions_sessionToken_key" ON "silab_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "silab_sessions_userId_idx" ON "silab_sessions"("userId");

-- CreateIndex
CREATE INDEX "silab_sessions_expires_idx" ON "silab_sessions"("expires");

-- CreateIndex
CREATE INDEX "silab_sessions_sessionToken_idx" ON "silab_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "silab_verification_tokens_token_key" ON "silab_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "silab_verification_tokens_userId_idx" ON "silab_verification_tokens"("userId");

-- CreateIndex
CREATE INDEX "silab_verification_tokens_token_idx" ON "silab_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "silab_verification_tokens_expires_idx" ON "silab_verification_tokens"("expires");

-- CreateIndex
CREATE UNIQUE INDEX "silab_password_reset_requests_token_key" ON "silab_password_reset_requests"("token");

-- CreateIndex
CREATE INDEX "silab_password_reset_requests_userId_idx" ON "silab_password_reset_requests"("userId");

-- CreateIndex
CREATE INDEX "silab_password_reset_requests_token_idx" ON "silab_password_reset_requests"("token");

-- CreateIndex
CREATE INDEX "silab_password_reset_requests_expiresAt_idx" ON "silab_password_reset_requests"("expiresAt");

-- CreateIndex
CREATE INDEX "silab_password_reset_requests_isUsed_idx" ON "silab_password_reset_requests"("isUsed");

-- CreateIndex
CREATE UNIQUE INDEX "silab_laboratories_slug_key" ON "silab_laboratories"("slug");

-- CreateIndex
CREATE INDEX "silab_laboratories_name_idx" ON "silab_laboratories"("name");

-- CreateIndex
CREATE INDEX "silab_laboratories_isDeleted_isDraft_idx" ON "silab_laboratories"("isDeleted", "isDraft");

-- CreateIndex
CREATE INDEX "silab_laboratories_createdAt_idx" ON "silab_laboratories"("createdAt");

-- CreateIndex
CREATE INDEX "silab_laboratories_contactEmail_idx" ON "silab_laboratories"("contactEmail");

-- CreateIndex
CREATE INDEX "silab_facilities_laboratoryId_idx" ON "silab_facilities"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_facilities_name_idx" ON "silab_facilities"("name");

-- CreateIndex
CREATE INDEX "silab_services_laboratoryId_idx" ON "silab_services"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_services_type_for_idx" ON "silab_services"("type", "for");

-- CreateIndex
CREATE INDEX "silab_services_price_idx" ON "silab_services"("price");

-- CreateIndex
CREATE INDEX "silab_services_name_idx" ON "silab_services"("name");

-- CreateIndex
CREATE INDEX "silab_laboratory_images_laboratoryId_idx" ON "silab_laboratory_images"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_laboratory_managers_userId_idx" ON "silab_laboratory_managers"("userId");

-- CreateIndex
CREATE INDEX "silab_laboratory_managers_laboratoryId_idx" ON "silab_laboratory_managers"("laboratoryId");

-- CreateIndex
CREATE UNIQUE INDEX "silab_laboratory_managers_userId_laboratoryId_key" ON "silab_laboratory_managers"("userId", "laboratoryId");

-- CreateIndex
CREATE UNIQUE INDEX "silab_research_portfolios_slug_key" ON "silab_research_portfolios"("slug");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_laboratoryId_idx" ON "silab_research_portfolios"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_slug_idx" ON "silab_research_portfolios"("slug");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_type_idx" ON "silab_research_portfolios"("type");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_publishedDate_idx" ON "silab_research_portfolios"("publishedDate");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_studyProgram_idx" ON "silab_research_portfolios"("studyProgram");

-- CreateIndex
CREATE INDEX "silab_research_portfolios_createdAt_idx" ON "silab_research_portfolios"("createdAt");

-- CreateIndex
CREATE INDEX "silab_category_researchs_articleId_idx" ON "silab_category_researchs"("articleId");

-- CreateIndex
CREATE INDEX "silab_category_researchs_categoryId_idx" ON "silab_category_researchs"("categoryId");

-- CreateIndex
CREATE INDEX "silab_research_portfolio_authors_researchPortfolioId_idx" ON "silab_research_portfolio_authors"("researchPortfolioId");

-- CreateIndex
CREATE INDEX "silab_research_portfolio_authors_userId_idx" ON "silab_research_portfolio_authors"("userId");

-- CreateIndex
CREATE INDEX "silab_research_portfolio_authors_role_idx" ON "silab_research_portfolio_authors"("role");

-- CreateIndex
CREATE INDEX "silab_research_portfolio_authors_orderNumber_idx" ON "silab_research_portfolio_authors"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "silab_articles_slug_key" ON "silab_articles"("slug");

-- CreateIndex
CREATE INDEX "silab_articles_laboratoryId_idx" ON "silab_articles"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_articles_slug_idx" ON "silab_articles"("slug");

-- CreateIndex
CREATE INDEX "silab_articles_author_idx" ON "silab_articles"("author");

-- CreateIndex
CREATE INDEX "silab_articles_publishedDate_idx" ON "silab_articles"("publishedDate");

-- CreateIndex
CREATE INDEX "silab_articles_createdAt_idx" ON "silab_articles"("createdAt");

-- CreateIndex
CREATE INDEX "silab_category_articles_articleId_idx" ON "silab_category_articles"("articleId");

-- CreateIndex
CREATE INDEX "silab_category_articles_categoryId_idx" ON "silab_category_articles"("categoryId");

-- CreateIndex
CREATE INDEX "silab_reservations_userId_idx" ON "silab_reservations"("userId");

-- CreateIndex
CREATE INDEX "silab_reservations_laboratoryId_idx" ON "silab_reservations"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_reservations_serviceId_idx" ON "silab_reservations"("serviceId");

-- CreateIndex
CREATE INDEX "silab_reservations_status_idx" ON "silab_reservations"("status");

-- CreateIndex
CREATE INDEX "silab_reservations_startDate_endDate_idx" ON "silab_reservations"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "silab_reservations_createdAt_idx" ON "silab_reservations"("createdAt");

-- CreateIndex
CREATE INDEX "silab_reservations_reviewedById_idx" ON "silab_reservations"("reviewedById");

-- CreateIndex
CREATE INDEX "silab_reservations_reviewed_idx" ON "silab_reservations"("reviewed");

-- CreateIndex
CREATE INDEX "silab_add_ons_laboratoryId_idx" ON "silab_add_ons"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_add_ons_name_idx" ON "silab_add_ons"("name");

-- CreateIndex
CREATE INDEX "silab_add_ons_price_idx" ON "silab_add_ons"("price");

-- CreateIndex
CREATE INDEX "silab_reservation_add_ons_reservationId_idx" ON "silab_reservation_add_ons"("reservationId");

-- CreateIndex
CREATE INDEX "silab_reservation_add_ons_addOnId_idx" ON "silab_reservation_add_ons"("addOnId");

-- CreateIndex
CREATE INDEX "silab_reservation_add_ons_price_idx" ON "silab_reservation_add_ons"("price");

-- CreateIndex
CREATE UNIQUE INDEX "silab_reservation_add_ons_reservationId_addOnId_key" ON "silab_reservation_add_ons"("reservationId", "addOnId");

-- CreateIndex
CREATE UNIQUE INDEX "silab_payments_transactionId_key" ON "silab_payments"("transactionId");

-- CreateIndex
CREATE INDEX "silab_payments_reservationId_idx" ON "silab_payments"("reservationId");

-- CreateIndex
CREATE INDEX "silab_payments_status_idx" ON "silab_payments"("status");

-- CreateIndex
CREATE INDEX "silab_payments_paymentMethod_idx" ON "silab_payments"("paymentMethod");

-- CreateIndex
CREATE INDEX "silab_payments_dueDate_idx" ON "silab_payments"("dueDate");

-- CreateIndex
CREATE INDEX "silab_payments_paymentDate_idx" ON "silab_payments"("paymentDate");

-- CreateIndex
CREATE INDEX "silab_payments_status_paymentMethod_idx" ON "silab_payments"("status", "paymentMethod");

-- CreateIndex
CREATE INDEX "silab_payments_verifiedBy_idx" ON "silab_payments"("verifiedBy");

-- CreateIndex
CREATE INDEX "silab_payments_refundStatus_idx" ON "silab_payments"("refundStatus");

-- CreateIndex
CREATE INDEX "silab_payments_transactionId_idx" ON "silab_payments"("transactionId");

-- CreateIndex
CREATE INDEX "silab_reviews_userId_idx" ON "silab_reviews"("userId");

-- CreateIndex
CREATE INDEX "silab_reviews_laboratoryId_idx" ON "silab_reviews"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_reviews_reservationId_idx" ON "silab_reviews"("reservationId");

-- CreateIndex
CREATE INDEX "silab_reviews_rating_idx" ON "silab_reviews"("rating");

-- CreateIndex
CREATE INDEX "silab_reviews_reviewDate_idx" ON "silab_reviews"("reviewDate");

-- CreateIndex
CREATE INDEX "silab_reviews_isAnonymous_idx" ON "silab_reviews"("isAnonymous");

-- CreateIndex
CREATE INDEX "silab_notifications_userId_idx" ON "silab_notifications"("userId");

-- CreateIndex
CREATE INDEX "silab_notifications_reservationId_idx" ON "silab_notifications"("reservationId");

-- CreateIndex
CREATE INDEX "silab_notifications_type_idx" ON "silab_notifications"("type");

-- CreateIndex
CREATE INDEX "silab_notifications_isRead_idx" ON "silab_notifications"("isRead");

-- CreateIndex
CREATE INDEX "silab_notifications_createdAt_idx" ON "silab_notifications"("createdAt");

-- CreateIndex
CREATE INDEX "silab_operational_hours_laboratoryId_idx" ON "silab_operational_hours"("laboratoryId");

-- CreateIndex
CREATE INDEX "silab_operational_hours_dayOfWeek_idx" ON "silab_operational_hours"("dayOfWeek");

-- CreateIndex
CREATE INDEX "silab_operational_hours_startTime_endTime_idx" ON "silab_operational_hours"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "silab_reservation_histories_reservationId_idx" ON "silab_reservation_histories"("reservationId");

-- CreateIndex
CREATE INDEX "silab_reservation_histories_changedById_idx" ON "silab_reservation_histories"("changedById");

-- CreateIndex
CREATE INDEX "silab_reservation_histories_changeType_idx" ON "silab_reservation_histories"("changeType");

-- CreateIndex
CREATE INDEX "silab_reservation_histories_changedAt_idx" ON "silab_reservation_histories"("changedAt");

-- CreateIndex
CREATE INDEX "silab_category_for_idx" ON "silab_category"("for");

-- CreateIndex
CREATE INDEX "silab_category_name_idx" ON "silab_category"("name");

-- CreateIndex
CREATE INDEX "silab_files_uploadedById_idx" ON "silab_files"("uploadedById");

-- CreateIndex
CREATE INDEX "silab_files_researchPortfolioId_idx" ON "silab_files"("researchPortfolioId");

-- CreateIndex
CREATE INDEX "silab_files_paymentId_idx" ON "silab_files"("paymentId");

-- CreateIndex
CREATE INDEX "silab_files_articleId_idx" ON "silab_files"("articleId");

-- CreateIndex
CREATE INDEX "silab_files_fileType_idx" ON "silab_files"("fileType");

-- CreateIndex
CREATE INDEX "silab_files_uploadedAt_idx" ON "silab_files"("uploadedAt");

-- AddForeignKey
ALTER TABLE "silab_accounts" ADD CONSTRAINT "silab_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_sessions" ADD CONSTRAINT "silab_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_verification_tokens" ADD CONSTRAINT "silab_verification_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_password_reset_requests" ADD CONSTRAINT "silab_password_reset_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_facilities" ADD CONSTRAINT "silab_facilities_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_services" ADD CONSTRAINT "silab_services_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_laboratory_images" ADD CONSTRAINT "silab_laboratory_images_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_laboratory_managers" ADD CONSTRAINT "silab_laboratory_managers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_laboratory_managers" ADD CONSTRAINT "silab_laboratory_managers_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_research_portfolios" ADD CONSTRAINT "silab_research_portfolios_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_category_researchs" ADD CONSTRAINT "silab_category_researchs_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "silab_research_portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_category_researchs" ADD CONSTRAINT "silab_category_researchs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "silab_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_research_portfolio_authors" ADD CONSTRAINT "silab_research_portfolio_authors_researchPortfolioId_fkey" FOREIGN KEY ("researchPortfolioId") REFERENCES "silab_research_portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_research_portfolio_authors" ADD CONSTRAINT "silab_research_portfolio_authors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_articles" ADD CONSTRAINT "silab_articles_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_articles" ADD CONSTRAINT "silab_articles_author_fkey" FOREIGN KEY ("author") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_category_articles" ADD CONSTRAINT "silab_category_articles_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "silab_articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_category_articles" ADD CONSTRAINT "silab_category_articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "silab_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservations" ADD CONSTRAINT "silab_reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservations" ADD CONSTRAINT "silab_reservations_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservations" ADD CONSTRAINT "silab_reservations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "silab_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservations" ADD CONSTRAINT "silab_reservations_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "silab_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_add_ons" ADD CONSTRAINT "silab_add_ons_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservation_add_ons" ADD CONSTRAINT "silab_reservation_add_ons_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "silab_reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservation_add_ons" ADD CONSTRAINT "silab_reservation_add_ons_addOnId_fkey" FOREIGN KEY ("addOnId") REFERENCES "silab_add_ons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_payments" ADD CONSTRAINT "silab_payments_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "silab_reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_payments" ADD CONSTRAINT "silab_payments_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "silab_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reviews" ADD CONSTRAINT "silab_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reviews" ADD CONSTRAINT "silab_reviews_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reviews" ADD CONSTRAINT "silab_reviews_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "silab_reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_notifications" ADD CONSTRAINT "silab_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "silab_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_notifications" ADD CONSTRAINT "silab_notifications_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "silab_reservations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_operational_hours" ADD CONSTRAINT "silab_operational_hours_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "silab_laboratories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservation_histories" ADD CONSTRAINT "silab_reservation_histories_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "silab_reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_reservation_histories" ADD CONSTRAINT "silab_reservation_histories_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "silab_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_files" ADD CONSTRAINT "silab_files_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "silab_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_files" ADD CONSTRAINT "silab_files_researchPortfolioId_fkey" FOREIGN KEY ("researchPortfolioId") REFERENCES "silab_research_portfolios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_files" ADD CONSTRAINT "silab_files_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "silab_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "silab_files" ADD CONSTRAINT "silab_files_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "silab_articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
