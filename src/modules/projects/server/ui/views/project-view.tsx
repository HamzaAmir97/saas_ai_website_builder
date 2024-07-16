"use client";

import {
    ResizableHandle,
    ResizablePanelGroup,
    ResizablePanel
} from "@/components/ui/resizable";
import MessagesContainer from "../components/messages_container";
import { Suspense, useState } from "react";
import ProjectHeader from "../components/project-header";
import FragmentWeb from "../components/fragmentweb";
import { Fragment } from "@/generated/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Code2Icon, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface props {
    projectId: string,


};


export const ProjectView = ({ projectId }: props) => {
    const [activeFragment, setactiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");



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

                <ResizablePanel defaultSize={65} maxSize={50}>
                    <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}
                    >
                     

                                   {/* Header section: triggers + buttons */}
                        <div className="w-full flex items-center p-2 border-b gap-x-2">
                            <TabsList className="h-8 p-0 border rounded-md">
                                <TabsTrigger value="preview" className="rounded-md">
                                    <EyeIcon />
                                    <span>Demo</span>
                                </TabsTrigger>

                                <TabsTrigger value="code" className="rounded-md">
                                    <Code2Icon />
                                    <span><code>Code</code></span>
                                </TabsTrigger>
                                </TabsList>


                            <div className="ml-auto flex items-center gap-x-2">
                                <Button asChild size="sm" variant="default">
                                    <Link href="/pricing">
                                        <CrownIcon />
                                        Upgrade
                                    </Link>
                                </Button>
                            </div>
                        </div>


                        <TabsContent value="preview">
                        {!!activeFragment && <FragmentWeb data={activeFragment} />}

                         </TabsContent>


                        <TabsContent value="code">
                            <p>TODO//code</p>
                        </TabsContent>
                    
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}


