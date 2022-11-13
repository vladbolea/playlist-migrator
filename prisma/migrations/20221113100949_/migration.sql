/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Example";

-- CreateTable
CREATE TABLE "ExportedItem" (
    "id" TEXT NOT NULL,
    "export_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ExportedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExportedItem" ADD CONSTRAINT "ExportedItem_export_id_fkey" FOREIGN KEY ("export_id") REFERENCES "Exports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
