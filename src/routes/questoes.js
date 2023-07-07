"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questoesRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function questoesRoutes(fastify) {
    fastify.post("/questoes", async (request, reply) => {
        const createAtividadeBody = zod_1.z.object({
            atividadesId: zod_1.z.string(),
            conteudo: zod_1.z.string(),
            alternativas: zod_1.z.array(zod_1.z.string()),
            alternativaCorreta: zod_1.z.string(),
        });
        const { atividadesId, conteudo, alternativas, alternativaCorreta } = createAtividadeBody.parse(request.body);
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
            where: {
                id: atividadesId,
            },
        });
        if (!findAtividade) {
            return reply.status(400).send({
                message: "Atividade não encontrada",
            });
        }
        await prisma_1.prisma.questoes.create({
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
        const getQuestoesParams = zod_1.z.object({
            atividadesId: zod_1.z.string(),
        });
        const { atividadesId } = getQuestoesParams.parse(request.params);
        const findQuestoes = await prisma_1.prisma.questoes.findMany({
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
exports.questoesRoutes = questoesRoutes;
