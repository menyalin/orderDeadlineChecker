-- CreateTable
CREATE TABLE "Invoice" (
    "printNum" TEXT NOT NULL PRIMARY KEY,
    "invoiceNum" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "orderNum" TEXT
);
