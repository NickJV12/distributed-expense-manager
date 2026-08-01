-- CreateEnum
CREATE TYPE "public"."SplitType" AS ENUM ('EQUAL', 'EXACT');

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "splitType" "public"."SplitType" NOT NULL DEFAULT 'EQUAL';
