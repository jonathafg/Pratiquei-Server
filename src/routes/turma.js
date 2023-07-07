"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turmasRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function turmasRoutes(fastify) {
    fastify.post("/turmas", async (request, reply) => {
        const createTurmaBody = zod_1.z.object({
            name: zod_1.z.string(),
            professorId: zod_1.z.string(),
        });
        const { name, professorId } = createTurmaBody.parse(request.body);
        const findProfessor = await prisma_1.prisma.professores.findUnique({
            where: {
                id: professorId,
            },
        });
        if (!findProfessor) {
            return reply.status(400).send({
                message: "Professor não existe no cadastro",
            });
        }
        await prisma_1.prisma.turmas.create({
            data: {
                name,
                professorId,
            },
        });
        return reply.status(201).send("Turma cadastrada com sucesso");
    });
    fastify.get("/turmas/:professorId", async (request, reply) => {
        const getTurmaParams = zod_1.z.object({
            professorId: zod_1.z.string(),
        });
        const { professorId } = getTurmaParams.parse(request.params);
        const findTurmas = await prisma_1.prisma.turmas.findMany({
            where: {
                professorId: professorId,
            },
            include: {
                Alunos: true
            }
        });
        return reply.status(201).send(findTurmas);
    });
    fastify.get("/turmas/:professorId/:name", async (request, reply) => {
        const getTurmaParams = zod_1.z.object({
            name: zod_1.z.string(),
            professorId: zod_1.z.string(),
        });
        const { name, professorId } = getTurmaParams.parse(request.params);
        const findTurmas = await prisma_1.prisma.turmas.findMany({
            where: {
                professorId: professorId,
                name: name,
            },
            include: {
                Alunos: true
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
exports.turmasRoutes = turmasRoutes;
