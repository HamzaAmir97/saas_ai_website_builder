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
import { Code2Icon, CrownIcon, EyeIcon, SeparatorVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FileExplorer from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/app/error";

interface props {
    projectId: string,
};


export const ProjectView = ({ projectId }: props) => {
    const [activeFragment, setactiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");
    const { has } = useAuth();
    const hasProAccess = has?.({ plan: "pro" });

    return (
        <div className="h-screen" >
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col min-h-0"
                >
                   <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Suspense fallback={<p>loading project .... </p>}>
                            <ProjectHeader projectId={projectId} />
                        </Suspense>
                        
                        <Suspense fallback={<p>Loading ...</p>}>
                            <MessagesContainer projectId={projectId}
                                activeFragment={activeFragment}
                                setActiveFragment={setactiveFragment}
                            />
                        </Suspense>
                        </ErrorBoundary>
                </ResizablePanel>

                <ResizableHandle className="hover:bg-primary transition-colors" />

                <ResizablePanel defaultSize={65} minSize={50}>
                


                <Tabs
                        className="h-full gap-y-0"
                        defaultValue="preview"
                        value={tabState}
                        onValueChange={(value) => setTabState(value as "preview" | "code")}
                    >

                        {/* Header section: triggers + buttons */}
                        <div className="w-full flex items-center p-2 border-b gap-x-2">
                            <TabsList className="h-8 p-0 border rounded-md">
                                <TabsTrigger value="preview" className="rounded-md ">
                                  <div className="flex  justify-between"><EyeIcon /> <span>Demo</span></div> 
                                </TabsTrigger>
                               
                                <TabsTrigger value="code" className="rounded-md ">
                                <div className="flex  justify-between">  <Code2Icon /> <span>Code</span></div>
                                </TabsTrigger>

                            </TabsList>


                            <div className="ml-auto flex items-center gap-x-2">
                            {!hasProAccess && 
                              
                                <Button asChild size="sm" variant="tertiary">
                                    <Link href="/pricing">
                                        <CrownIcon />
                                        Upgrade
                                    </Link>
                                </Button>
                                            }
                                 <UserControl/>
                            </div>
                        </div>

                
                        <TabsContent value="preview" className="h-screen overflow-auto" >
                            {!!activeFragment && <FragmentWeb data={activeFragment} />}

                        </TabsContent>


                        <TabsContent value="code"   className="h-screen overflow-auto" >
                            {!!activeFragment?.file && (
                                <FileExplorer 
                                    files={activeFragment.file as { [path: string]: string }}
                                />
                            )}
                        </TabsContent>
                     




                    </Tabs>

                </ResizablePanel>
            </ResizablePanelGroup>


        </div>
    )
}


