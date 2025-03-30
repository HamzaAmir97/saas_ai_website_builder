import { inngest } from "./client";
import Sandbox from "@e2b/code-interpreter";
import { z } from "zod";
import {
  createAgent,
  openai,
  anthropic,
  gemini,
  createTool,
  createNetwork,
  type Tool,
} from "@inngest/agent-kit";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";

import { PROMPT, PROMPT2, PROMPT3 } from "@/prompt";
import prisma from "@/lib/db";

interface AgentState{
     summary :string,
     files : {[path :string]:string};
};

export const codeAgentFunction = inngest.createFunction(
  { id: "codeAgentFunction" },
  { event: "codeAgentFunction/run" },
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
          const buffers = { stdout: "", stderr: "" }
          try {
            const sandbox = await getSandbox(sandboxId);
            const result = await sandbox.commands.run(command, {
              onStdout: (data: string) => {
                buffers.stdout += data;
              },
              onStderr: (data: string) => {
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
            path: z.string(),
            content: z.string(),

          })
        ),
      }),
      handler: async ({ files }, { step, network } : Tool.Options<AgentState>) =>  {
        const newFiles = await step?.run("createOrUpdateFiles", async () => {

          try {
            const updatedFiles = network.state.data.files || {};

            const sandbox = await getSandbox(sandboxId);
            for (const file of files) {
              await sandbox.files.write(file.path, file.content);
              updatedFiles[file.path] = file.content;
            }

            return updatedFiles;

          } catch (err) {
            console.error('command failed : ${err}');

            return 'command failed : ${err}';
          }
        });

        if (typeof newFiles === "object") {
          network.state.data.files = newFiles;
        }
      },
    });

    //3- create  readFiles  tool

    const readFiles = createTool({
      name: "readFiles",
      description: "readFiles from sandbox",
      parameters: z.object({
        files: z.array(z.string()),
      }),


      handler: async ({ files }, { step }) => {
        return await step?.run("readFiles", async () => {

          try {

            const sandbox = await getSandbox(sandboxId);
            const contents = [];

            for (const file of files) {
              const content = await sandbox.files.read(file);
              contents.push({ path: file, content });
            }

            return JSON.stringify(contents);

          } catch (err) {
            console.error('command failed : ${err}');
            return 'command failed : ${err}';
          }
        });


      },
    });



    // create  openAi agent

    const openAiCodeAgent = createAgent<AgentState>({
      name: "openAiCodeAgent ",
      description: "An expert Coding Agent",
      system: PROMPT,
      model: openai({
        model: "gpt-4o",
      
      }),
      tools: [terminalTool, createOrUpdateFiles, readFiles],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText =
            lastAssistantTextMessageContent(result);
          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText?.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        }
      }
    })



 // create  gemini agent

 const codeAgent = createAgent<AgentState>({
  name: "codeAgent ",
  description: "An expert Coding Agent",
  system: PROMPT3,
  model: gemini({
    model: "gemini-2.5-flash",


  }),
  tools: [terminalTool, createOrUpdateFiles, readFiles],
  lifecycle: {
    onResponse: async ({ result, network }) => {
      const lastAssistantMessageText =
        lastAssistantTextMessageContent(result);
      if (lastAssistantMessageText && network) {
        if (lastAssistantMessageText?.includes("<task_summary>")) {
          network.state.data.summary = lastAssistantMessageText;
        }
      }

      return result;
    }
  }
});


 // create  anthropicCodeAgent

 const anthropicCodeAgent = createAgent<AgentState>({
  name: "anthropicCodeAgent ",
  description: "An expert Coding Agent",
  system: PROMPT2,
  model: anthropic({
    model: "claude-3-5-haiku-latest",
    defaultParameters: { temperature: 0.5, max_tokens: 4096 },



  }),
  tools: [terminalTool, createOrUpdateFiles, readFiles],
  lifecycle: {
    onResponse: async ({ result, network }) => {
      const lastAssistantMessageText =
        lastAssistantTextMessageContent(result);
      if (lastAssistantMessageText && network) {
        if (lastAssistantMessageText?.includes("<task_summary>")) {
          network.state.data.summary = lastAssistantMessageText;
        }
      }

      return result;
    }
  }
});




   // create network
    const network = createNetwork<AgentState>({
      name: "coding-agent-network",
      agents: [codeAgent],
      maxIter: 15,
      router: async ({ network }) => {
        const summary = network.state.data.summary;

        if (summary) {
          return;
        }
        return codeAgent;
      }
    });


    // const { output } = await codeAgent.run(
    //   `write the following snippet: ${event.data.value}`
    // );



    const result = await network.run(event.data.value);



    const isErorr=
    !result.state.data.summary ||
    Object.keys(result.state.data.files || {}).length === 0;
    

    // run the sandbox

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = await sandbox.getHost(3000);
      return `https://${host}`;
    });

    
    await  step.run("save-result",async()=>{
      if (isErorr){
       return await prisma.message.create({
         data:{
          projectId: event.data.projectId,
           content :"somthing went wrong . plese try agian, ",
           role : "ASSISTANCE",
           type :"ERROR",
         }
      })

      }

      //save the result to the database
      return await prisma.message.create({
        data:{
          projectId: event.data.projectId,
          content:result.state.data.summary,
          role: "ASSISTANCE",
          type:"RESULT",
          fragment :{
              create:{
                sandboxUrl : sandboxUrl,
                title : "Fragment",
                 file : result.state.data.files,
          }
        }
      }})


    });


    return {
      url: sandboxUrl,
      title: "Fragment",
      files: result.state.data.summary,


    };

  }
);
