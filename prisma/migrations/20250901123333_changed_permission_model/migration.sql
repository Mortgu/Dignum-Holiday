/*
  Warnings:

  - You are about to drop the column `displayName` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `permissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."permissions_url_key";

-- AlterTable
ALTER TABLE "public"."permissions" DROP COLUMN "displayName",
DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "public"."permissions"("name");
