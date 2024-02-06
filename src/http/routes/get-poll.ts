import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollsId", async (request, reply) => {
    const getPollParams = z.object({
      pollsId: z.string().uuid(),
    });

    const { pollsId } = getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollsId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        }
      }
    });

    return reply.send({ poll });
  });
}
