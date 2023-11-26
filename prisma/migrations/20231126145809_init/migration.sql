/*
  Warnings:

  - Added the required column `anotherBigField` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bigField` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "anotherBigField" STRING NOT NULL;
ALTER TABLE "Users" ADD COLUMN     "bigField" STRING NOT NULL;

-- CreateTable
CREATE TABLE "Car" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "bigField" STRING NOT NULL,
    "ownerId" STRING NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
