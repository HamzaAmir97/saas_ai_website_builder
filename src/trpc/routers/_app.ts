
import {  createTRPCRouter } from '../init';
import { messagesRouter } from '@/modules/messages/server/proceduers';
export const appRouter = createTRPCRouter({
    messages : messagesRouter,


});
// export type definition of API
export type AppRouter = typeof appRouter;