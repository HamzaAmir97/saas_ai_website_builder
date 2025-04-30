
import {
    ResizableHandle,
    ResizablePanelGroup,
    ResizablePanel
} from "@/components/ui/resizable";
import MessagesContainer from "../components/messages_container";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "../components/project-header";

interface props {
    projectId: string,


};


export const ProjectView = ({ projectId }: props) => {
    const [activeFragment, setactiveFragment] = useState<Fragment | null>(null);




    return (
        <div className="h-screen" >
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0"
                > 
                   <Suspense fallback={<p>loading project .... </p>}>
                    <ProjectHeader projectId={projectId} />
                    </Suspense>
                   
                    <Suspense fallback={<p>Loading ...</p>}>
                        <MessagesContainer projectId={projectId}
                            activeFragment={activeFragment}
                            setActiveFragment={setactiveFragment}
                        />
                    </Suspense>
                </ResizablePanel>

                <ResizableHandle withHandle />

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


