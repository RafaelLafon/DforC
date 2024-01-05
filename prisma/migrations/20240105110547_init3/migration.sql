/*
  Warnings:

  - The primary key for the `Server` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `Id` on the `Server` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `ServerId` on the `Channel` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Server" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Members" TEXT NOT NULL,
    "Admins" TEXT NOT NULL
);
INSERT INTO "new_Server" ("Admins", "Id", "Members", "Name") SELECT "Admins", "Id", "Members", "Name" FROM "Server";
DROP TABLE "Server";
ALTER TABLE "new_Server" RENAME TO "Server";
CREATE TABLE "new_User" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tag" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Status" INTEGER NOT NULL,
    "Languages" TEXT NOT NULL,
    "Serveurs" TEXT NOT NULL,
    "Amis" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Parameters" TEXT NOT NULL,
    "IsConfigured" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("Amis", "Email", "Id", "IsConfigured", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag") SELECT "Amis", "Email", "Id", "IsConfigured", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Tag_key" ON "User"("Tag");
CREATE TABLE "new_Channel" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Thread" TEXT NOT NULL,
    "Pinned" TEXT NOT NULL,
    "Moderation" BOOLEAN NOT NULL,
    "ServerId" INTEGER NOT NULL,
    CONSTRAINT "Channel_ServerId_fkey" FOREIGN KEY ("ServerId") REFERENCES "Server" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("Id", "Moderation", "Name", "Pinned", "ServerId", "Thread") SELECT "Id", "Moderation", "Name", "Pinned", "ServerId", "Thread" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
