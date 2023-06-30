import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function tentativasRoutes(fastify: FastifyInstance) {
  fastify.post("/tentativas", async (request, reply) => {
    const createAtividadeBody = z.object({
      alunoId: z.string(),
      atividadeId: z.string(),
    });

    const { alunoId, atividadeId } = createAtividadeBody.parse(request.body);

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunoId,
      },
    });
    const findAtividade = await prisma.atividades.findUnique({
      where: {
        id: atividadeId,
      },
    });

    if (!findAluno) {
      return reply.status(400).send({
        message: "Aluno não encontrado",
      });
    }
    if (!findAtividade) {
      return reply.status(400).send({
        message: "Atividade não encontrada",
      });
    }

    await prisma.tentativas.create({
      data: {
        alunoId,
        atividadeId,
      },
    });

    return reply.status(201).send("Tentativa contabilizada");
  });

  fastify.get("/tentativas/:alunoId/:atividadeId", async (request, reply) => {
    const createAtividadeBody = z.object({
      alunoId: z.string(),
      atividadeId: z.string(),
    });

    const { alunoId, atividadeId } = createAtividadeBody.parse(request.params);

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunoId,
      },
    });
    const findAtividade = await prisma.atividades.findUnique({
      where: {
        id: atividadeId,
      },
    });

    if (!findAluno) {
      return reply.status(400).send({
        message: "Aluno não encontrado",
      });
    }
    if (!findAtividade) {
      return reply.status(400).send({
        message: "Atividade não encontrada",
      });
    }

    const findTentativa = await prisma.tentativas.findMany({
      where: {
        alunoId: alunoId,
        atividadeId: atividadeId,
      },
    });

    return reply.status(201).send(findTentativa.length);
  });
}
