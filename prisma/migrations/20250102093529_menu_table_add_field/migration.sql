-- AlterTable
ALTER TABLE `menu` ADD COLUMN `component` VARCHAR(191) NULL,
    ADD COLUMN `icon` VARCHAR(191) NULL,
    ADD COLUMN `isHidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sort` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Menu_isHidden_idx` ON `Menu`(`isHidden`);
