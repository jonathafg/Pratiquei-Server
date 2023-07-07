import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function professoresRoutes(fastify: FastifyInstance) {
  
  fastify.post("/professores", async (request, reply) => {
    const createProfessorBody = z.object({
      username: z.string(),
      password: z.string(),
      nickname: z.string(),
    });

    const { username, password, nickname } = createProfessorBody.parse(
      request.body
    );

    const findProfessor = await prisma.professores.findUnique({
      where: {
        username: username,
      },
    });

    if (findProfessor) {
      return reply.status(400).send({
        message: "Nome de usuário já cadastrado",
      });
    }

    await prisma.professores.create({
      data: {
        username,
        password,
        nickname,
      },
    });

    return reply.status(201).send("Cadastro realizado com sucesso");
  });

  fastify.get("/professores/:username", async (request, reply) => {
    const getTurmaParams = z.object({
      username: z.string(),
    });

    const { username } = getTurmaParams.parse(request.params);

    const findProfessor = await prisma.professores.findUnique({
      where: {
        username: username,
      },
    });

    return reply.status(201).send(findProfessor);
  });
}
