import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function turmasRoutes(fastify: FastifyInstance) {
  fastify.post("/turmas", async (request, reply) => {
    const createTurmaBody = z.object({
      name: z.string(),
      professorId: z.string(),
    });

    const { name, professorId } = createTurmaBody.parse(request.body);

    const findProfessor = await prisma.professores.findUnique({
      where: {
        id: professorId,
      },
    });

    if (!findProfessor) {
      return reply.status(400).send({
        message: "Professor não existe no cadastro",
      });
    }

    await prisma.turmas.create({
      data: {
        name,
        professorId,
      },
    });

    return reply.status(201).send("Turma cadastrada com sucesso");
  });

  fastify.get("/turmas/:professorId", async (request, reply) => {
    const getTurmaParams = z.object({
      professorId: z.string(),
    });

    const { professorId } = getTurmaParams.parse(request.params);

    const findTurmas = await prisma.turmas.findMany({
      where: {
        professorId: professorId,
      },
      include:{
        Alunos:true
      }
    });

    return reply.status(201).send(findTurmas);
  });

  fastify.get("/turmas/:professorId/:name", async (request, reply) => {
    const getTurmaParams = z.object({
      name: z.string(),
      professorId: z.string(),
    });

    const { name, professorId } = getTurmaParams.parse(request.params);

    const findTurmas = await prisma.turmas.findMany({
      where: {
        professorId: professorId,
        name: name,
      },
      include:{
        Alunos:true
      }
    });

    if (!findTurmas) {
      return reply.status(400).send({
        message: "Turma não cadastrada",
      });
    }

    return reply.status(201).send(findTurmas);
  });
}
