/*
  Warnings:

  - Added the required column `email` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `email` VARCHAR(191) NOT NULL;
