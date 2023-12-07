-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "Server" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Members" TEXT NOT NULL,
    "Admins" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Channel" (
    "Id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Thread" TEXT NOT NULL,
    "Pinned" TEXT NOT NULL,
    "Moderation" BOOLEAN NOT NULL,
    "ServerId" TEXT NOT NULL,
    CONSTRAINT "Channel_ServerId_fkey" FOREIGN KEY ("ServerId") REFERENCES "Server" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Tag_key" ON "User"("Tag");

-- CreateIndex
CREATE UNIQUE INDEX "Server_Id_key" ON "Server"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_Id_key" ON "Channel"("Id");
