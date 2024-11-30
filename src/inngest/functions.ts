import { inngest } from "./client";
import Sandbox from "@e2b/code-interpreter";
import {
  createNetwork,
  createAgent,
  openai,
  anthropic,
  gemini,
} from "@inngest/agent-kit";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event ,step}) => {
    const sandboxId = await step.run("get-sandbox-id",async()=>{
       const sandbox = await Sandbox.create("vibe-nextjs-template-v2");
     
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
     
       //  await sandbox.setTimeout(() => {
        
      //  }, timeout);

   return sandbox.sandboxId;
    })
    const codeAgent = createAgent({
      model: gemini({ model: "gemini-2.0-flash" }),
      name: "Summarizer",
      system: "You are an expert next js developer. you write  readable mantainable code.you write simple next js & react snippets.",
    });
    const { output } = await codeAgent.run(
      `write the following sippet: ${event.data.value}`
    );
    
    const sandboxUrl = await step.run("get-sandbox-url",async()=>{
     
      const sandbox = await getSandbox(sandboxId);

     const host = sandbox.getHost(3000);
       
     return 'https://${host}';

    })
     
    return { output ,sandboxUrl };
  }
);
