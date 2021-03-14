-- CreateTable
CREATE TABLE "days" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "emoji" INTEGER NOT NULL,
    "userEmail" TEXT,
    FOREIGN KEY ("userEmail") REFERENCES "users" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "days.userEmail_date_unique" ON "days"("userEmail", "date");
