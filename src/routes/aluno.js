"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alunosRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function alunosRoutes(fastify) {
    fastify.post("/alunos", async (request, reply) => {
        const createAlunoBody = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
            nickname: zod_1.z.string(),
            turmaId: zod_1.z.string(),
        });
        const { username, password, nickname, turmaId } = createAlunoBody.parse(request.body);
        const findAluno = await prisma_1.prisma.alunos.findUnique({
            where: {
                username: username,
            },
        });
        if (findAluno) {
            return reply.status(400).send({
                message: "Nome de usuário já cadastrado",
            });
        }
        await prisma_1.prisma.alunos.create({
            data: {
                username,
                password,
                nickname,
                turmaId,
            },
        });
        return reply.status(201).send("Aluno cadastrado com sucesso");
    });
    fastify.get("/alunos/:nickname", async (request, reply) => {
        const getAlunoParams = zod_1.z.object({
            nickname: zod_1.z.string(),
        });
        const { nickname } = getAlunoParams.parse(request.params);
        const findAlunos = await prisma_1.prisma.alunos.findMany({
            where: {
                nickname: nickname,
            },
            include: {
                turma: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (findAlunos.length <= 0) {
            return reply.status(400).send({
                message: "Aluno(a) não cadastrado(a)",
            });
        }
        return reply.status(201).send(findAlunos);
    });
}
exports.alunosRoutes = alunosRoutes;
