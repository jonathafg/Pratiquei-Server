import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function questoesRoutes(fastify: FastifyInstance) {
  fastify.post("/questoes", async (request, reply) => {
    const createAtividadeBody = z.object({
      atividadesId: z.string(),
      conteudo: z.string(),
      alternativas: z.array(z.string()),
      alternativaCorreta: z.string(),
    });

    const { atividadesId, conteudo, alternativas, alternativaCorreta } =
      createAtividadeBody.parse(request.body);

      const findAtividade = await prisma.atividades.findUnique({
        where: {
          id: atividadesId,
        },
      });
  
      if (!findAtividade) {
        return reply.status(400).send({
          message: "Atividade não encontrada",
        });
      }

    await prisma.questoes.create({
      data: {
        atividadesId,
        conteudo,
        alternativas,
        alternativaCorreta,
      },
    });

    return reply.status(201).send("Atividade cadastrada com sucesso");
  });

  fastify.get("/questoes/:atividadesId", async (request, reply) => {
    const getQuestoesParams = z.object({
        atividadesId: z.string(),
      });
  
      const { atividadesId } = getQuestoesParams.parse(request.params);
  
      const findQuestoes = await prisma.questoes.findMany({
        where: {
          atividadesId: atividadesId,
        },
      });
  
      if (findQuestoes.length <= 0) {
        return reply.status(400).send({
          message: "Sem questões cadastradas",
        });
      }
  
      return reply.status(201).send(findQuestoes);
  });
}
