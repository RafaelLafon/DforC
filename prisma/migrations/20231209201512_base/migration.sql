-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Server" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Members" TEXT NOT NULL,
    "Admins" TEXT NOT NULL
);
INSERT INTO "new_Server" ("Admins", "Id", "Members", "Name") SELECT "Admins", "Id", "Members", "Name" FROM "Server";
DROP TABLE "Server";
ALTER TABLE "new_Server" RENAME TO "Server";
CREATE TABLE "new_Channel" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Thread" TEXT NOT NULL,
    "Pinned" TEXT NOT NULL,
    "Moderation" BOOLEAN NOT NULL,
    "ServerId" TEXT NOT NULL,
    CONSTRAINT "Channel_ServerId_fkey" FOREIGN KEY ("ServerId") REFERENCES "Server" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Channel" ("Id", "Moderation", "Name", "Pinned", "ServerId", "Thread") SELECT "Id", "Moderation", "Name", "Pinned", "ServerId", "Thread" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
CREATE TABLE "new_User" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
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
INSERT INTO "new_User" ("Amis", "Email", "IsConfigured", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag") SELECT "Amis", "Email", "IsConfigured", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Tag_key" ON "User"("Tag");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
