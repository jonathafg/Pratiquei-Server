import Fastify from "fastify";
import cors from "@fastify/cors";
import { professoresRoutes } from "./routes/professor";
import { turmasRoutes } from "./routes/turma";
import { alunosRoutes } from "./routes/aluno";
import { atividadesRoutes } from "./routes/atividade";
import { questoesRoutes } from "./routes/questoes";
import { loginRoutes } from "./routes/login";
import { tentativasRoutes } from "./routes/tentativas";
import { respostasRoutes } from "./routes/respostas";
import { notasRoutes } from "./routes/notas";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });
  
  fastify.register(loginRoutes);
  fastify.register(professoresRoutes);
  fastify.register(turmasRoutes);
  fastify.register(alunosRoutes);
  fastify.register(atividadesRoutes);
  fastify.register(questoesRoutes);
  fastify.register(tentativasRoutes);
  fastify.register(respostasRoutes);
  fastify.register(notasRoutes);

  await fastify.listen({ port: 3333 });
}

bootstrap();
