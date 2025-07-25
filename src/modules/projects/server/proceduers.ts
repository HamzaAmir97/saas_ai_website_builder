import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import {generateSlug} from "random-word-slugs"
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { consumeCredits } from "@/lib/usage";



export const projectsRouter = createTRPCRouter({
  getOne : protectedProcedure
   .input(z.object({
     id:z.string().min(1, {message:"Id is requierd"}),

   }))
  .query(async ({input,ctx})=>{
    const existingprojects= await prisma.project.findUnique({
     where:{
        id :input.id,
        userId:ctx.auth.userId,
      },
    });
     
      if (!existingprojects){
         throw new TRPCError({code:"NOT_FOUND",message: "Project not found"})
      }
       return existingprojects;
  }),
  
  getMany : protectedProcedure
  .query(async ({ ctx })=>{
    const projects= await prisma.project.findMany({
     where :{
    
             userId : ctx.auth.userId,
     },
      
      orderBy:{
        updatedAt :"desc",
      },
    });

       return projects;
  }),
  


  create : protectedProcedure
     .input(
        z.object({
            value : z.string().min(1,{message: "Value is required"})
            .max(1000,{message : "Value is too  long"}),
           
        })
     )
     .mutation(async ({input, ctx})=>{

      try{
        await consumeCredits();
      }
     catch (err){
         if(err instanceof Error){
           throw new TRPCError({code:"BAD_REQUEST",message:"Something went wrong"})
         }
         else{
          throw new TRPCError({code:"TOO_MANY_REQUESTS",message:"you have no more points"})
  
         }
     }

      const createdProject = await prisma.project.create({
        data : {
          name : generateSlug(2,{
           format: "kebab",
          }),
          userId: ctx.auth.userId!,
          messages :{
            create:{
            content : input.value,
            role : "USER",
            type : "RESULT",

          }
        }
        
      }
     

        });



       await inngest.send({
        name: 'codeAgentFunction/run',
          data : {

           value : input.value,
           projectId : createdProject.id,
        }

      })
     return createdProject
     }),

});