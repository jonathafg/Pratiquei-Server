import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function alunosRoutes(fastify: FastifyInstance) {
  fastify.post("/alunos", async (request, reply) => {
    const createAlunoBody = z.object({
      username: z.string(),
      password: z.string(),
      nickname: z.string(),
      turmaId: z.string(),
    });

    const { username, password, nickname, turmaId } = createAlunoBody.parse(
      request.body
    );

    const findAluno = await prisma.alunos.findUnique({
      where: {
        username: username,
      },
    });

    if (findAluno) {
      return reply.status(400).send({
        message: "Nome de usuário já cadastrado",
      });
    }

    await prisma.alunos.create({
      data: {
        username,
        password,
        nickname,
        turmaId,
      },
    });

    return reply.status(201).send("Aluno cadastrado com sucesso");
  });

  fastify.get("/alunos/:nickname", async (request, reply) => {
    const getAlunoParams = z.object({
      nickname: z.string(),
    });

    const { nickname } = getAlunoParams.parse(request.params);

    const findAlunos = await prisma.alunos.findMany({
      where: {
        nickname: nickname,
      },
      include: {
        turma: {
          select: {
            name: true,
          },
        },
      },
    });

    if (findAlunos.length <= 0) {
      return reply.status(400).send({
        message: "Aluno(a) não cadastrado(a)",
      });
    }

    return reply.status(201).send(findAlunos);
  });
}
