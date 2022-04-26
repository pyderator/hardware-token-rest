-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_hardwareTokenId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hardwareTokenId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hardwareTokenId_fkey" FOREIGN KEY ("hardwareTokenId") REFERENCES "HardwareToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
