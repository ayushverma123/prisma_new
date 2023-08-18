-- CreateTable
CREATE TABLE "HotelManager" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "HotelManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "BossId" INTEGER,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelManager_email_key" ON "HotelManager"("email");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_BossId_fkey" FOREIGN KEY ("BossId") REFERENCES "HotelManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
