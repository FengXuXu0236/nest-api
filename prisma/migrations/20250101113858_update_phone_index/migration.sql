-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `user`;

-- CreateIndex
CREATE INDEX `User_phoneNumber_idx` ON `User`(`phoneNumber`);
