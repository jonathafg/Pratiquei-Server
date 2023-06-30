-- CreateTable
CREATE TABLE "Professores" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "Professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alunos" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,

    CONSTRAINT "Alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turmas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professoreId" TEXT NOT NULL,

    CONSTRAINT "Turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividades" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "professoreId" TEXT NOT NULL,
    "enunciado" TEXT,

    CONSTRAINT "Atividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questoes" (
    "id" TEXT NOT NULL,
    "atividadesId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "alternativas" TEXT[],
    "alternativaCorreta" TEXT NOT NULL,

    CONSTRAINT "Questoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tentativas" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "atividadeId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "Tentativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtividadesdasTurmas" (
    "turmasId" TEXT NOT NULL,
    "atividadesId" TEXT NOT NULL,

    CONSTRAINT "AtividadesdasTurmas_pkey" PRIMARY KEY ("turmasId","atividadesId")
);

-- CreateTable
CREATE TABLE "Respostas" (
    "id" TEXT NOT NULL,
    "alunosId" TEXT NOT NULL,
    "questoesId" TEXT NOT NULL,
    "respostadoAluno" TEXT NOT NULL,

    CONSTRAINT "Respostas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notas" (
    "id" TEXT NOT NULL,
    "alunosId" TEXT NOT NULL,
    "atividadesId" TEXT NOT NULL,
    "resultado" TEXT NOT NULL,

    CONSTRAINT "Notas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professores_username_key" ON "Professores"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos_username_key" ON "Alunos"("username");

-- AddForeignKey
ALTER TABLE "Alunos" ADD CONSTRAINT "Alunos_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turmas" ADD CONSTRAINT "Turmas_professoreId_fkey" FOREIGN KEY ("professoreId") REFERENCES "Professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividades" ADD CONSTRAINT "Atividades_professoreId_fkey" FOREIGN KEY ("professoreId") REFERENCES "Professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questoes" ADD CONSTRAINT "Questoes_atividadesId_fkey" FOREIGN KEY ("atividadesId") REFERENCES "Atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tentativas" ADD CONSTRAINT "Tentativas_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "Atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tentativas" ADD CONSTRAINT "Tentativas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadesdasTurmas" ADD CONSTRAINT "AtividadesdasTurmas_turmasId_fkey" FOREIGN KEY ("turmasId") REFERENCES "Turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadesdasTurmas" ADD CONSTRAINT "AtividadesdasTurmas_atividadesId_fkey" FOREIGN KEY ("atividadesId") REFERENCES "Atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_alunosId_fkey" FOREIGN KEY ("alunosId") REFERENCES "Alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_questoesId_fkey" FOREIGN KEY ("questoesId") REFERENCES "Questoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notas" ADD CONSTRAINT "Notas_alunosId_fkey" FOREIGN KEY ("alunosId") REFERENCES "Alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notas" ADD CONSTRAINT "Notas_atividadesId_fkey" FOREIGN KEY ("atividadesId") REFERENCES "Atividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
