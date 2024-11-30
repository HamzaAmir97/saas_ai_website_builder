import { inngest } from "./client";
import Sandbox, { Result } from "@e2b/code-interpreter";
import { z } from "zod";
import {
  createAgent,
  openai,
  anthropic,
  gemini,
  createTool,
} from "@inngest/agent-kit";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";

import { PROMPT } from "@/prompt";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-template-v2");
      return sandbox.sandboxId;
    });

    

    //1- create  terminal tool

    const terminalTool = createTool({
      name: "terminal",
      description: "Use the terminal to run commands",
      parameters: z.object({
        command: z.string(),
      }),
      handler: async ({ command }, { step }) => {
        return await step?.run("terminal", async () => {
          const buffers = {stdout:"",stderr:""}
          try {
            const sandbox = await getSandbox(sandboxId);
            const result = await sandbox.commands.run(command,{
              onStdout :(data :string)=>{
                   buffers.stdout += data;
              },
              onStderr:(data :string)=>{
                buffers.stderr += data;
              }
            });
            
            return result.stdout;
          } catch (err) {
            console.error('command failed : ${err} \nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}'

            );
            return 'command failed : ${err} \nstdout: ${buffers.stdout}\nstderr: ${buffers.stderr}';
          }
        });
      },
    });


     //2- create  CrateAndUpdate  tool
 
   const createOrUpdateFiles = createTool({
    name: "createOrUpdateFiles",
    description: "create or Update files in the sandbox",
     parameters: z.object({
      files: z.array(
        z.object({
          path : z.string(),
          content:z.string(),

        })
      ),
    }),
    handler: async ({ files}, { step,network }) => {
      const newFiles= await step?.run("createOrUpdateFiles", async () => {
        
        try {
          const updatedFiles = network.state.data.files || {};

          const sandbox = await getSandbox(sandboxId);
           for(const file of files){
             await sandbox.files.write(file.path,file.content);
             updatedFiles[file.path]= file.content;
           }
          
       return updatedFiles;

        } catch (err) {
          console.error('command failed : ${err}');

          return 'command failed : ${err}';
        }
      });

       if (typeof newFiles=== "object"){
        network.state.data.file= newFiles;
       }
    },
  });

     //3- create  readFiles  tool

 const readFiles = createTool({
  name: "readFiles",
  description: "readFiles from sandbox",
   parameters: z.object({
    files: z.array( z.string()),
      }),


  handler: async ({ files}, { step }) => {
    return await step?.run("readFiles", async () => {
    
      try {
      
        const sandbox = await getSandbox(sandboxId);
        const contents =[];

         for(const file of files){
            const content = await sandbox.files.read(file);
            contents.push({path:file ,content});
         }
        
        return JSON.stringify(contents);

      } catch (err) {
        console.error('command failed : ${err}');
        return 'command failed : ${err}';
      }
    });

     
  },
});



    // create agent

    const codeAgent = createAgent({
      name: "Summarizer",
      description :"An expert Coding Agent",
      system:PROMPT,
      model: gemini({ model: "gemini-2.0-flash"
             

       }),
      tools: [terminalTool,createOrUpdateFiles,readFiles],
      lifecycle:{
        onResponse : async ({result,network})=>{
          const lastAssistantMessageText =
          lastAssistantTextMessageContent(result);
          return result;
        }
      }
    });




    const { output } = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );


 // run the sandbox

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = await sandbox.getHost(3000);
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
