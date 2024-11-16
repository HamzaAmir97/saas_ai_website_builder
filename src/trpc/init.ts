import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import SuperJSON from 'superjson';
import { isAborted } from 'zod';
export const createTRPCContext = cache(async () => {

  return { auth: await auth()  };
});

export type Context=Awaited<ReturnType<typeof createTRPCContext>>;


const t = initTRPC.context<Context>().create ({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: SuperJSON,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export  const protectedProcedure= t.procedure.use(isAuthed);