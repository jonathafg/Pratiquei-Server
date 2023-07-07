"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notasRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function notasRoutes(fastify) {
    fastify.post("/notas", async (request, reply) => {
        const createNotaBody = zod_1.z.object({
            alunosId: zod_1.z.string(),
            atividadesId: zod_1.z.string(),
            resultado: zod_1.z.string(),
        });
        const { alunosId, atividadesId, resultado } = createNotaBody.parse(request.body);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunosId,
            },
        });
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
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
        await prisma_1.prisma.notas.create({
            data: {
                alunosId,
                atividadesId,
                resultado,
            },
        });
        return reply.status(201).send("Nota registrada");
    });
    fastify.get("/notas/:alunosId/:atividadesId", async (request, reply) => {
        const getNotaBody = zod_1.z.object({
            alunosId: zod_1.z.string(),
            atividadesId: zod_1.z.string(),
        });
        const { alunosId, atividadesId } = getNotaBody.parse(request.params);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                id: alunosId,
            },
        });
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
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
        const findNota = await prisma_1.prisma.notas.findMany({
            where: {
                alunosId: alunosId,
                atividadesId: atividadesId
            }
        });
        return reply.status(201).send(findNota);
    });
}
exports.notasRoutes = notasRoutes;
