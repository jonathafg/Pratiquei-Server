import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function notasRoutes(fastify: FastifyInstance) {
  fastify.post("/notas", async (request, reply) => {
    const createNotaBody = z.object({
      alunosId: z.string(),
      atividadesId: z.string(),
      resultado: z.string(),
    });

    const { alunosId, atividadesId, resultado } = createNotaBody.parse(
      request.body
    );

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunosId,
      },
    });
    const findAtividade = await prisma.atividades.findUnique({
      where: {
        id: atividadesId,
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

    await prisma.notas.create({
      data: {
        alunosId,
        atividadesId,
        resultado,
      },
    });

    return reply.status(201).send("Nota registrada");
  });

  fastify.get("/notas/:alunosId/:atividadesId", async (request, reply) => {
    const getNotaBody = z.object({
      alunosId: z.string(),
      atividadesId: z.string(),
    });

    const { alunosId, atividadesId } = getNotaBody.parse(
      request.params
    );

    const findAluno = await prisma.alunos.findUnique({
      where: {
        id: alunosId,
      },
    });
    const findAtividade = await prisma.atividades.findUnique({
      where: {
        id: atividadesId,
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

    const findNota = await prisma.notas.findMany({
      where:{
        alunosId: alunosId,
        atividadesId:atividadesId
      }
    })

    return reply.status(201).send(findNota);
  });
}
