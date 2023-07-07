"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professoresRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function professoresRoutes(fastify) {
    fastify.post("/professores", async (request, reply) => {
        const createProfessorBody = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
            nickname: zod_1.z.string(),
        });
        const { username, password, nickname } = createProfessorBody.parse(request.body);
        const findProfessor = await prisma_1.prisma.professores.findUnique({
            where: {
                username: username,
            },
        });
        if (findProfessor) {
            return reply.status(400).send({
                message: "Nome de usuário já cadastrado",
            });
        }
        await prisma_1.prisma.professores.create({
            data: {
                username,
                password,
                nickname,
            },
        });
        return reply.status(201).send("Professor cadastrado com sucesso");
    });
    fastify.get("/professores/:username", async (request, reply) => {
        const getTurmaParams = zod_1.z.object({
            username: zod_1.z.string(),
        });
        const { username } = getTurmaParams.parse(request.params);
        const findProfessor = await prisma_1.prisma.professores.findUnique({
            where: {
                username: username,
            },
        });
        return reply.status(201).send(findProfessor);
    });
}
exports.professoresRoutes = professoresRoutes;
