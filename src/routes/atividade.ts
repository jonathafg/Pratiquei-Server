import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function atividadesRoutes(fastify: FastifyInstance) {
  fastify.post("/atividades", async (request, reply) => {
    const createAtividadeBody = z.object({
      name: z.string(),
      professorId: z.string(),
      enunciado: z.string(),
    });

    const { name, professorId, enunciado } = createAtividadeBody.parse(
      request.body
    );

    const findProfessor = await prisma.professores.findUnique({
      where: {
        id: professorId,
      },
    });

    if (!findProfessor) {
      return reply.status(400).send({
        message: "Professor não encontrado",
      });
    }

    await prisma.atividades.create({
      data: {
        name,
        professorId,
        enunciado,
      },
    });

    return reply.status(201).send("Atividade cadastrada com sucesso");
  });

  fastify.get("/atividades/:professorId", async (request, reply) => {
    const getAtividadeParams = z.object({
      professorId: z.string(),
    });

    const { professorId } = getAtividadeParams.parse(request.params);

    const findAtividades = await prisma.atividades.findMany({
      where: {
        professorId: professorId,
      },
      include: {
        Questoes: true,
        AtividadesdasTurmas: {
          include: {
            turma: {
              select: {
                id:true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!findAtividades) {
      return reply.status(400).send({
        message: "Sem atividades cadastradas",
      });
    }

    return reply.status(201).send(findAtividades);
  });

  fastify.get("/atividades/:professorId/:name", async (request, reply) => {
    const getAtividadeParams = z.object({
      professorId: z.string(),
      name: z.string(),
    });

    const { professorId, name } = getAtividadeParams.parse(request.params);

    const findAtividades = await prisma.atividades.findMany({
      where: {
        professorId: professorId,
        name: name,
      },
      include: {
        Questoes: true,
        AtividadesdasTurmas: {
          include: {
            turma: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!findAtividades) {
      return reply.status(400).send({
        message: "Sem atividades cadastradas",
      });
    }

    return reply.status(201).send(findAtividades);
  });

  fastify.post("/atividades/:atividadeId/:turmaId", async (request, reply) => {
    const getAtividadeParams = z.object({
      atividadeId: z.string(),
      turmaId: z.string(),
    });

    const { turmaId, atividadeId } = getAtividadeParams.parse(request.params);

    const findAtividades = await prisma.atividades.findUnique({
      where: {
        id: atividadeId,
      },
    });

    if (!findAtividades) {
      return reply.status(400).send({
        message: "Atividade não encontrada",
      });
    }

    const findTurmas = await prisma.turmas.findMany({
      where: {
        id: turmaId,
      },
    });

    if (!findTurmas) {
      return reply.status(400).send({
        message: "Turma não encontrada",
      });
    }

    await prisma.atividadesdasTurmas.create({
      data: {
        turmasId: turmaId,
        atividadesId: atividadeId,
      },
    });

    return reply
      .status(201)
      .send("Atividade está desponivel para a turma selecionada");
  });

  fastify.get("/atividades/turma/:turmaId", async (request, reply) => {
    const getAtividadeParams = z.object({
      turmaId: z.string(),
    });

    const { turmaId } = getAtividadeParams.parse(request.params);

    const findTurmas = await prisma.turmas.findMany({
      where: {
        id: turmaId,
      },
    });

    if (!findTurmas) {
      return reply.status(400).send({
        message: "Turma não encontrada",
      });
    }

    const findAtividades = await prisma.atividadesdasTurmas.findMany({
      where: {
        turmasId: turmaId,
      },
      include: {
        atividade: {
          select: {
            id:true,
            name: true,
            enunciado: true,
            Questoes: true,
            Tentativas:true,
          },
        },
      },
    });

    return reply.status(201).send(findAtividades);
  });

  fastify.get("/atividades/atividade/:atividadeId", async (request, reply) => {
    const getAtividadeParams = z.object({
      atividadeId: z.string(),
    });

    const { atividadeId } = getAtividadeParams.parse(request.params);

    const findAtividade = await prisma.atividades.findUnique({
      where: {
        id: atividadeId,
      },
      include:{
        Questoes:true
      }
    });

    if (!findAtividade) {
      return reply.status(400).send({
        message: "Atividade não encontrada",
      });
    }

    return reply.status(201).send(findAtividade);
  });
}
