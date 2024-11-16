import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import {generateSlug} from "random-word-slugs"
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";



export const projectsRouter = createTRPCRouter({
  getOne : protectedProcedure
   .input(z.object({
     id:z.string().min(1, {message:"Id is requierd"}),

   }))
  .query(async ({input})=>{
    const existingprojects= await prisma.project.findUnique({
     where:{
        id :input.id,
      },
    });
     
      if (!existingprojects){
         throw new TRPCError({code:"NOT_FOUND",message: "Project not found"})
      }
       return existingprojects;
  }),
  
  getMany : protectedProcedure
  .query(async ()=>{
    const projects= await prisma.project.findMany({
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