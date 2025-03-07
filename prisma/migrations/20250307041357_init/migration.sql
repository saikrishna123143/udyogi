/*
  Warnings:

  - You are about to drop the column `userId` on the `application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId,email]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_userId_fkey`;

-- DropIndex
DROP INDEX `Application_userId_fkey` ON `application`;

-- AlterTable
ALTER TABLE `application` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Application_jobId_email_key` ON `Application`(`jobId`, `email`);
