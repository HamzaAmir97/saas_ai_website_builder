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
                        <div className="w-full flex items-c p-2 border-b gap-x-2">
                            <TabsList className="h-8 p-0 border rounded-md">
                                <TabsTrigger value="preview" className="rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3">
                                   <EyeIcon /> <span>Demo</span>
                                </TabsTrigger>
                               
                                <TabsTrigger value="code" className="rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3">
                                   <Code2Icon /> <span>Code</span>
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

                
                        <TabsContent value="preview" >
                            {!!activeFragment && <FragmentWeb data={activeFragment} />}

                        </TabsContent>


                        <TabsContent value="code" className="min-h-0">
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


