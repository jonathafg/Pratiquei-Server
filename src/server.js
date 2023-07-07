"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const professor_1 = require("./routes/professor");
const turma_1 = require("./routes/turma");
const aluno_1 = require("./routes/aluno");
const atividade_1 = require("./routes/atividade");
const questoes_1 = require("./routes/questoes");
const login_1 = require("./routes/login");
const tentativas_1 = require("./routes/tentativas");
const respostas_1 = require("./routes/respostas");
const notas_1 = require("./routes/notas");
async function bootstrap() {
    const fastify = (0, fastify_1.default)({
        logger: true,
    });
    await fastify.register(cors_1.default, {
        origin: true,
    });
    fastify.register(login_1.loginRoutes);
    fastify.register(professor_1.professoresRoutes);
    fastify.register(turma_1.turmasRoutes);
    fastify.register(aluno_1.alunosRoutes);
    fastify.register(atividade_1.atividadesRoutes);
    fastify.register(questoes_1.questoesRoutes);
    fastify.register(tentativas_1.tentativasRoutes);
    fastify.register(respostas_1.respostasRoutes);
    fastify.register(notas_1.notasRoutes);
    await fastify.listen({ port: 3333 });
}
bootstrap();
