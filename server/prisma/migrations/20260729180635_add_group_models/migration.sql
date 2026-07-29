/*
  Warnings:

  - The `role` column on the `GroupMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."GroupRole" AS ENUM ('OWNER', 'MEMBER');

-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_createdBy_fkey";

-- AlterTable
ALTER TABLE "public"."GroupMember" DROP COLUMN "role",
ADD COLUMN     "role" "public"."GroupRole" NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
