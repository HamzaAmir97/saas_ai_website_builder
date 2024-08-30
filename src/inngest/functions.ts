import { inngest } from "./client";
import {
  createNetwork,
  createAgent,
  openai,
  anthropic,
  gemini,
} from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      model: gemini({ model: "gemini-2.0-flash" }),
      name: "Summarizer",
      system: "You are an expert next js developer. you write  readable mantainable code.you write simple next js & react snippets.",
    });
    const { output } = await codeAgent.run(
      `write the following sippet: ${event.data.value}`
    );
    return { output };
  }
);
