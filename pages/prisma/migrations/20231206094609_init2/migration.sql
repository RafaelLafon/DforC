/*
  Warnings:

  - You are about to drop the column `Epingle` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `Nom` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `MDP` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Parametres` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Membres` on the `Server` table. All the data in the column will be lost.
  - You are about to drop the column `Nom` on the `Server` table. All the data in the column will be lost.
  - Added the required column `Name` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Pinned` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Parameters` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Members` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Channel" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Thread" TEXT NOT NULL,
    "Pinned" TEXT NOT NULL,
    "Moderation" BOOLEAN NOT NULL,
    "ServerId" TEXT NOT NULL,
    CONSTRAINT "Channel_ServerId_fkey" FOREIGN KEY ("ServerId") REFERENCES "Server" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("Id", "Moderation", "ServerId", "Thread") SELECT "Id", "Moderation", "ServerId", "Thread" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE UNIQUE INDEX "Channel_Id_key" ON "Channel"("Id");
CREATE TABLE "new_User" (
    "Tag" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Status" INTEGER NOT NULL,
    "Languages" TEXT NOT NULL,
    "Serveurs" TEXT NOT NULL,
    "Amis" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Parameters" TEXT NOT NULL
);
INSERT INTO "new_User" ("Amis", "Languages", "Serveurs", "Status", "Tag") SELECT "Amis", "Languages", "Serveurs", "Status", "Tag" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Tag_key" ON "User"("Tag");
CREATE TABLE "new_Server" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Members" TEXT NOT NULL,
    "Admins" TEXT NOT NULL
);
INSERT INTO "new_Server" ("Admins", "Id") SELECT "Admins", "Id" FROM "Server";
DROP TABLE "Server";
ALTER TABLE "new_Server" RENAME TO "Server";
CREATE UNIQUE INDEX "Server_Id_key" ON "Server"("Id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
