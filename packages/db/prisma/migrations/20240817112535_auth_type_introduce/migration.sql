/*
  Warnings:

  - Added the required column `auth_type` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('google_auth', 'github_auth');

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "auth_type" "AuthType" NOT NULL;
