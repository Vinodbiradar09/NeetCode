-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('JavaScript', 'Rust', 'GoLang');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Tle', 'Success', 'Fail');

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "examples" TEXT,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeDetails" (
    "id" TEXT NOT NULL,
    "lang" "Languages" NOT NULL,
    "code" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "output" TEXT,
    "error" TEXT,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "CodeDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeDetails" ADD CONSTRAINT "CodeDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeDetails" ADD CONSTRAINT "CodeDetails_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
