"use client";

import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { 
    ResizableHandle,
    ResizablePanelGroup,
    ResizablePanel
} from "@/components/ui/resizable";
import MessagesContainer from "../components/messages_container";
import { Suspense } from "react";

interface props {
    projectId: string,


};


export const ProjectView = ({ projectId }: props) => {
    // const trpc = useTRPC();
    // const { data:project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({
    //     id: projectId,

    //  }));

   

      

    return (
        <div  className="h-screen" >
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                defaultSize={35}
                minSize={20}
                className="flex flex-col min-h-0"
                >
             <Suspense fallback ={<p>Loading ...</p>}>
              <MessagesContainer projectId={projectId}/>
              </Suspense>
            </ResizablePanel>

            <ResizableHandle withHandle/>

            <ResizablePanel
             defaultSize={65}
             maxSize={50}
             >
            TODO : Preview

           </ResizablePanel>
         
          </ResizablePanelGroup>  
        
        </div>
    )
}


