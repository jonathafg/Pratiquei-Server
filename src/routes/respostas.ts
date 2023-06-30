import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function respostasRoutes(fastify: FastifyInstance) {
  fastify.post("/respostas", async (request, reply) => {
    const createRespostaBody = z.object({
      alunosId: z.string(),
      questoesId: z.string(),
      respostadoAluno: z.string(),
    });

    const { alunosId, questoesId, respostadoAluno } = createRespostaBody.parse(
      request.body
    );

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunosId,
      },
    });
    const findQuestao = await prisma.questoes.findUnique({
      where: {
        id: questoesId,
      },
    });

    if (!findAluno) {
      return reply.status(400).send({
        message: "Aluno não encontrado",
      });
    }
    if (!findQuestao) {
      return reply.status(400).send({
        message: "Questão não encontrada",
      });
    }

    await prisma.respostas.create({
      data: {
        alunosId,
        questoesId,
        respostadoAluno,
      },
    });

    return reply.status(201).send("Resposta registrada");
  });

  fastify.get("/respostas/:alunosId/:questoesId", async (request, reply) => {
    const getRespostaBody = z.object({
      alunosId: z.string(),
      questoesId: z.string(),
    });

    const { alunosId, questoesId } = getRespostaBody.parse(request.params);

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunosId,
      },
    });
    const findQuestao = await prisma.questoes.findUnique({
      where: {
        id: questoesId,
      },
    });

    if (!findAluno) {
      return reply.status(400).send({
        message: "Aluno não encontrado",
      });
    }
    if (!findQuestao) {
      return reply.status(400).send({
        message: "Questão não encontrada",
      });
    }

    const findResposta = await prisma.respostas.findMany({
      where: {
        alunosId: alunosId,
        questoesId: questoesId,
      },
    });

    return reply.status(201).send(findResposta);
  });
}
