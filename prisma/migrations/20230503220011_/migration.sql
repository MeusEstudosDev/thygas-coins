-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registered_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "soft_delete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "stock" DECIMAL NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL DEFAULT '/image/imagenotfound.png'
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
