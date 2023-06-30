import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const professor1 = await prisma.professores.create({
    data: {
      username: "Leonardin",
      password: "12345",
      nickname: "Leozin",
    },
  });

  const aluno1 = await prisma.alunos.create({
    data: {
      username: "MatSouza",
      password: "12345",
      nickname: "Matheus",

      turma: {
        create: {
          name: "321",
          professorId: professor1.id,
        },
      },
    },
  });
}

main();
