"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respostasRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function respostasRoutes(fastify) {
    fastify.post("/respostas", async (request, reply) => {
        const createRespostaBody = zod_1.z.object({
            alunosId: zod_1.z.string(),
            questoesId: zod_1.z.string(),
            respostadoAluno: zod_1.z.string(),
        });
        const { alunosId, questoesId, respostadoAluno } = createRespostaBody.parse(request.body);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunosId,
            },
        });
        const findQuestao = await prisma_1.prisma.questoes.findUnique({
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
        await prisma_1.prisma.respostas.create({
            data: {
                alunosId,
                questoesId,
                respostadoAluno,
            },
        });
        return reply.status(201).send("Resposta registrada");
    });
    fastify.get("/respostas/:alunosId/:questoesId", async (request, reply) => {
        const getRespostaBody = zod_1.z.object({
            alunosId: zod_1.z.string(),
            questoesId: zod_1.z.string(),
        });
        const { alunosId, questoesId } = getRespostaBody.parse(request.params);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunosId,
            },
        });
        const findQuestao = await prisma_1.prisma.questoes.findUnique({
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
        const findResposta = await prisma_1.prisma.respostas.findMany({
            where: {
                alunosId: alunosId,
                questoesId: questoesId,
            },
        });
        return reply.status(201).send(findResposta);
    });
}
exports.respostasRoutes = respostasRoutes;
