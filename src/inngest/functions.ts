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
    const summarizer = createAgent({
      model: gemini({ model: "gemini-1.5-flash" }),
      name: "Summarizer",
      system: "You are a summarizer...",
    });
    const { output } = await summarizer.run(
      `summarize the following text: ${event.data.value}`
    );
    return { output };
  }
);
