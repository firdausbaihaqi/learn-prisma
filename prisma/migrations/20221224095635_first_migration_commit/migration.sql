-- CreateTable
CREATE TABLE "Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "completedDateTime" DATETIME,
    "order" INTEGER,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
