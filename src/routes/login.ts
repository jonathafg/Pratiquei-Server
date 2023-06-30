import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function loginRoutes(fastify: FastifyInstance) {
  fastify.post("/login", async (request, reply) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);

    const findProfessor = await prisma.professores.findUnique({
      where: {
        username: username,
      },
      
    });

    if (!findProfessor) {
      const findAluno = await prisma.alunos.findUnique({
        where: {
          username: username,
        },
        include: {
          turma: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!findAluno) {
        return reply.status(400).send({
          message: "Usuário não encontrado",
        });
      } else {
        if (password === findAluno.password) {
          return reply.status(201).send({infs:findAluno, user:"Aluno"})
        } else {
          return reply.status(400).send({
            message: "Senha invalida",
          });
        }
      }
    } else {
      if (password === findProfessor.password) {
        return reply.status(201).send({infs:findProfessor, user:"Professor"});
      } else {
        return reply.status(400).send({
          message: "Senha invalida",
        });
      }
    }          
  });
}
