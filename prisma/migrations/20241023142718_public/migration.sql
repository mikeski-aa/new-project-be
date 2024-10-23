-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isGuest" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "interval" TEXT,
    "customInterval" INTEGER
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "name" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "budget_id_key" ON "budget"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
