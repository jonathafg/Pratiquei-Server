"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function loginRoutes(fastify) {
    fastify.post("/login", async (request, reply) => {
        const createUserBody = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
        });
        const { username, password } = createUserBody.parse(request.body);
        const findProfessor = await prisma_1.prisma.professores.findUnique({
            where: {
                username: username,
            },
        });
        if (!findProfessor) {
            const findAluno = await prisma_1.prisma.alunos.findUnique({
                where: {
                    username: username,
                },
                include: {
                    turma: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (!findAluno) {
                return reply.status(400).send({
                    message: "Usuário não encontrado",
                });
            }
            else {
                if (password === findAluno.password) {
                    return reply.status(201).send({ infs: findAluno, user: "Aluno" });
                }
                else {
                    return reply.status(400).send({
                        message: "Senha invalida",
                    });
                }
            }
        }
        else {
            if (password === findProfessor.password) {
                return reply.status(201).send({ infs: findProfessor, user: "Professor" });
            }
            else {
                return reply.status(400).send({
                    message: "Senha invalida",
                });
            }
        }
    });
}
exports.loginRoutes = loginRoutes;
