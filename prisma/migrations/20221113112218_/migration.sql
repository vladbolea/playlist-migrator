/*
  Warnings:

  - You are about to drop the column `artist` on the `ExportedItem` table. All the data in the column will be lost.
  - Added the required column `channel` to the `ExportedItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playlist_id` to the `Exports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExportedItem" DROP COLUMN "artist",
ADD COLUMN     "channel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Exports" ADD COLUMN     "playlist_id" TEXT NOT NULL;
