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
                    {/* <Suspense fallback={<p>loading project .... </p>}> */}
                        <ProjectHeader projectId={projectId} />
                    {/* </Suspense> */}

                    {/* <Suspense fallback={<p>Loading ...</p>}> */}
                        <MessagesContainer projectId={projectId}
                            activeFragment={activeFragment}
                            setActiveFragment={setactiveFragment}
                        />
                    {/* </Suspense> */}
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
                                <TabsTrigger value="preview" className="rounded-md">
                                   <Button variant={"ghost"}  className="focus:border-2 border-b-amber-500"> <EyeIcon />   <span> Demo </span> </Button>

                                </TabsTrigger>
                               
                                <TabsTrigger value="code" className="rounded-md" >
                                <Button variant={"ghost"} className="focus:border-2 border-b-amber-500">  <Code2Icon /> <span> Code </span> </Button>

                                </TabsTrigger>

                            </TabsList>


                            <div className="ml-auto flex items-center gap-x-2">
                                <Button asChild size="sm" variant="tertiary">
                                    <Link href="/pricing">
                                        <CrownIcon />
                                        Upgrade
                                    </Link>
                                </Button>
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


