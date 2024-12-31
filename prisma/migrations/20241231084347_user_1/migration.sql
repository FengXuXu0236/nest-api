/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `article` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_authorId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `activatedAt` DATETIME(3) NULL,
    ADD COLUMN `avatarUrl` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `disabledAt` DATETIME(3) NULL,
    ADD COLUMN `frozenAt` DATETIME(3) NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `idCard` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isDisabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isFrozen` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isMuted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isSpecial` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `mutedAt` DATETIME(3) NULL,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `role` ENUM('ADMIN', 'USER', 'MODERATOR') NOT NULL DEFAULT 'USER',
    ADD COLUMN `secretKey` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `specialAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `email` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `article`;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNumber_key` ON `User`(`phoneNumber`);

-- CreateIndex
CREATE INDEX `User_isActive_idx` ON `User`(`isActive`);

-- CreateIndex
CREATE INDEX `User_isDeleted_idx` ON `User`(`isDeleted`);

-- CreateIndex
CREATE INDEX `User_isDisabled_idx` ON `User`(`isDisabled`);

-- CreateIndex
CREATE INDEX `User_isFrozen_idx` ON `User`(`isFrozen`);

-- CreateIndex
CREATE INDEX `User_isSpecial_idx` ON `User`(`isSpecial`);

-- CreateIndex
CREATE INDEX `User_isMuted_idx` ON `User`(`isMuted`);
