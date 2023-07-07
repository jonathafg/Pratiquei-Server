"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tentativasRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function tentativasRoutes(fastify) {
    fastify.post("/tentativas", async (request, reply) => {
        const createAtividadeBody = zod_1.z.object({
            alunoId: zod_1.z.string(),
            atividadeId: zod_1.z.string(),
        });
        const { alunoId, atividadeId } = createAtividadeBody.parse(request.body);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunoId,
            },
        });
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
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
        await prisma_1.prisma.tentativas.create({
            data: {
                alunoId,
                atividadeId,
            },
        });
        return reply.status(201).send("Tentativa contabilizada");
    });
    fastify.get("/tentativas/:alunoId/:atividadeId", async (request, reply) => {
        const createAtividadeBody = zod_1.z.object({
            alunoId: zod_1.z.string(),
            atividadeId: zod_1.z.string(),
        });
        const { alunoId, atividadeId } = createAtividadeBody.parse(request.params);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunoId,
            },
        });
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
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
        const findTentativa = await prisma_1.prisma.tentativas.findMany({
            where: {
                alunoId: alunoId,
                atividadeId: atividadeId,
            },
        });
        return reply.status(201).send(findTentativa.length);
    });
}
exports.tentativasRoutes = tentativasRoutes;
