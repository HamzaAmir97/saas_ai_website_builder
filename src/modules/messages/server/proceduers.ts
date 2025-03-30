import { Input } from "@/components/ui/input";
import { InputOTP } from "@/components/ui/input-otp";
import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";


export const messagesRouter = createTRPCRouter({
  getMany : baseProcedure
  .input(
    z.object({
    
        projectId : z.string().min(1,{message:"project Id is required"}),
    })
 )
  .query(async ({ input })=>{
    const messages = await prisma.message.findMany({
      where : {
       projectId: input.projectId,
      },
      orderBy:{
        updatedAt :"desc",
      },
    });

       return messages;
  }),
  


  create : baseProcedure
     .input(
        z.object({
            value : z.string().min(1,{message: "Message is required"})
            .max(1000,{message : "Value is too long "}),
            projectId : z.string().min(1,{message:"project Id is required"}),
        })
     )
     .mutation(async ({input})=>{
      const createdMessage = await prisma.message.create({
            data : {
                projectId : input.projectId,
                content : input.value,
                role : "USER",
                type : "RESULT",
            }
           
       });



       await inngest.send({
        name: 'codeAgentFunction/run',
          data : {

           value : input.value,
           projectId : input.projectId,
        }

      })
     return createdMessage;
     }),

});