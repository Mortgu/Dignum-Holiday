/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" TIMESTAMP(3) NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "vacationEntitlement" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_id_key" ON "public"."Roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "public"."Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- AddForeignKey
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_role_fkey" FOREIGN KEY ("role") REFERENCES "public"."Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
