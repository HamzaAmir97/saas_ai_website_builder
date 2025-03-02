import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import {generateSlug} from "random-word-slugs"
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";



export const projectsRouter = createTRPCRouter({
  getMany : baseProcedure
  .query(async ()=>{
    const projects= await prisma.project.findMany({
      orderBy:{
        updatedAt :"desc",
      },
    });

       return projects;
  }),
  


  create : baseProcedure
     .input(
        z.object({
            value : z.string().min(1,{message: "Message is required"})
        })
     )
     .mutation(async ({input})=>{
      const createdProject = await prisma.project.create({
        data : {
          name : generateSlug(2,{
           format: "kebab",
          }),
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