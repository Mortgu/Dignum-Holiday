/*
  Warnings:

  - Added the required column `user` to the `holidays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."holidays" ADD COLUMN     "user" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."holidays" ADD CONSTRAINT "holidays_user_fkey" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
