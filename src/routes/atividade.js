"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atividadesRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function atividadesRoutes(fastify) {
    fastify.post("/atividades", async (request, reply) => {
        const createAtividadeBody = zod_1.z.object({
            name: zod_1.z.string(),
            professorId: zod_1.z.string(),
            enunciado: zod_1.z.string(),
        });
        const { name, professorId, enunciado } = createAtividadeBody.parse(request.body);
        const findProfessor = await prisma_1.prisma.professores.findUnique({
            where: {
                id: professorId,
            },
        });
        if (!findProfessor) {
            return reply.status(400).send({
                message: "Professor não encontrado",
            });
        }
        await prisma_1.prisma.atividades.create({
            data: {
                name,
                professorId,
                enunciado,
            },
        });
        return reply.status(201).send("Atividade cadastrada com sucesso");
    });
    fastify.get("/atividades/:professorId", async (request, reply) => {
        const getAtividadeParams = zod_1.z.object({
            professorId: zod_1.z.string(),
        });
        const { professorId } = getAtividadeParams.parse(request.params);
        const findAtividades = await prisma_1.prisma.atividades.findMany({
            where: {
                professorId: professorId,
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
    fastify.get("/atividades/:professorId/:name", async (request, reply) => {
        const getAtividadeParams = zod_1.z.object({
            professorId: zod_1.z.string(),
            name: zod_1.z.string(),
        });
        const { professorId, name } = getAtividadeParams.parse(request.params);
        const findAtividades = await prisma_1.prisma.atividades.findMany({
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
        const getAtividadeParams = zod_1.z.object({
            atividadeId: zod_1.z.string(),
            turmaId: zod_1.z.string(),
        });
        const { turmaId, atividadeId } = getAtividadeParams.parse(request.params);
        const findAtividades = await prisma_1.prisma.atividades.findUnique({
            where: {
                id: atividadeId,
            },
        });
        if (!findAtividades) {
            return reply.status(400).send({
                message: "Atividade não encontrada",
            });
        }
        const findTurmas = await prisma_1.prisma.turmas.findMany({
            where: {
                id: turmaId,
            },
        });
        if (!findTurmas) {
            return reply.status(400).send({
                message: "Turma não encontrada",
            });
        }
        await prisma_1.prisma.atividadesdasTurmas.create({
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
        const getAtividadeParams = zod_1.z.object({
            turmaId: zod_1.z.string(),
        });
        const { turmaId } = getAtividadeParams.parse(request.params);
        const findTurmas = await prisma_1.prisma.turmas.findMany({
            where: {
                id: turmaId,
            },
        });
        if (!findTurmas) {
            return reply.status(400).send({
                message: "Turma não encontrada",
            });
        }
        const findAtividades = await prisma_1.prisma.atividadesdasTurmas.findMany({
            where: {
                turmasId: turmaId,
            },
            include: {
                atividade: {
                    select: {
                        name: true,
                        enunciado: true,
                        Questoes: true,
                        Tentativas: true,
                    },
                },
            },
        });
        return reply.status(201).send(findAtividades);
    });
    fastify.get("/atividades/atividade/:atividadeId", async (request, reply) => {
        const getAtividadeParams = zod_1.z.object({
            atividadeId: zod_1.z.string(),
        });
        const { atividadeId } = getAtividadeParams.parse(request.params);
        const findAtividade = await prisma_1.prisma.atividades.findUnique({
            where: {
                id: atividadeId,
            },
            include: {
                Questoes: true
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
exports.atividadesRoutes = atividadesRoutes;
