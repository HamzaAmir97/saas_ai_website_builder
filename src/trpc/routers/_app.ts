
import { projectsRouter } from '@/modules/projects/server/proceduers';
import {  createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/proceduers';
import { usageRouter } from '@/modules/usage/server/procedure';
export const appRouter = createTRPCRouter({
    usage: usageRouter,
    messages : messagesRouter,
    projects : projectsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;