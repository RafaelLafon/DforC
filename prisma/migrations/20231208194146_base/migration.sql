-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
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
INSERT INTO "new_User" ("Amis", "Email", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag") SELECT "Amis", "Email", "Languages", "Name", "Parameters", "Password", "Serveurs", "Status", "Tag" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Tag_key" ON "User"("Tag");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
