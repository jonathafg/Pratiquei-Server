/*
  Warnings:

  - You are about to drop the column `professoreId` on the `Atividades` table. All the data in the column will be lost.
  - You are about to drop the column `professoreId` on the `Turmas` table. All the data in the column will be lost.
  - Added the required column `professorId` to the `Atividades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `Turmas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Atividades" DROP CONSTRAINT "Atividades_professoreId_fkey";

-- DropForeignKey
ALTER TABLE "Turmas" DROP CONSTRAINT "Turmas_professoreId_fkey";

-- AlterTable
ALTER TABLE "Atividades" DROP COLUMN "professoreId",
ADD COLUMN     "professorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Turmas" DROP COLUMN "professoreId",
ADD COLUMN     "professorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Turmas" ADD CONSTRAINT "Turmas_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividades" ADD CONSTRAINT "Atividades_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
