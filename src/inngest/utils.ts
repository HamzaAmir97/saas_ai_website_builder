import Sandbox from "@e2b/code-interpreter";
import { TextMessage, AgentResult } from "@inngest/agent-kit";


export async function getSandbox(sandboxId :string) {
   
    const sandbox =await Sandbox.connect(sandboxId);

    return sandbox;
};
export function lastAssistantTextMessageContent(result : AgentResult){
   const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant",
   );
   const message = result.output[lastAssistantTextMessageIndex] as
   |TextMessage
   |undefined;
   
   return message?.content?typeof message.content === "string"
   ?message.content
   :message.content.map((c)=>c.text).join("")
   :undefined;
}