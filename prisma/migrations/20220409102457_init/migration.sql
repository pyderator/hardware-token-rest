-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hardwareTokenId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HardwareToken" (
    "id" TEXT NOT NULL,
    "productKey" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "HardwareToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_hardwareTokenId_key" ON "User"("hardwareTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "HardwareToken_productKey_key" ON "HardwareToken"("productKey");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hardwareTokenId_fkey" FOREIGN KEY ("hardwareTokenId") REFERENCES "HardwareToken"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
