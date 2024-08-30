import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";
import { serve } from "inngest/next";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   helloWorld
  ],
});
