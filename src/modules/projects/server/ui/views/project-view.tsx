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
import { cn } from "@/lib/utils";
import { motion } from "motion/react"


interface props {
    projectId: string,
};


export const ProjectView = ({ projectId }: props) => {

    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [activeFragment, setactiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");
    const { has } = useAuth();
    const hasProAccess = has?.({ plan: "pro" });

    return (


        <div className="h-screen" >



            {/* on small screens */}

            <ResizablePanelGroup direction="vertical">
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
                                <TabsTrigger value="preview" className="rounded-md  ">
                                    <div

                                        className={cn("flex  justify-between  border-2 border-primary rounded-2xl hover:text-primary focus:outline-2")}

                                    > <EyeIcon className="fill-primary stroke-current" /> <span  >Demo</span> </div>

                                </TabsTrigger>

                                <TabsTrigger value="code" className="rounded-md ">
                                    <div

                                        className={cn("flex  justify-between  border-2 border-primary rounded-2xl hover:text-primary focus:outline-2")}

                                    > <Code2Icon className="fill-primary stroke-current" /> <span>Code</span></div>
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
                                <UserControl />
                            </div>
                        </div>


                        <TabsContent value="preview" className="h-screen overflow-auto" >
                            {!!activeFragment ? (<FragmentWeb data={activeFragment} />) : (


                                <div className="flex items-center  flex-col justify-center min-h-screen ">


                                    <motion.p
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}

                                        className="f text-2xl text-primary font-Aladin"
                                    >

                                        "Your magic is on the way—get ready to shine!"</motion.p>

                                    <motion.svg
                                        width="80"
                                        height="80"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-blue-500"
                                    >



                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            stroke="currentColor"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ strokeDasharray: "0, 300", rotate: 0 }}
                                            animate={{
                                                strokeDasharray: ["0, 300", "150, 300", "0, 300"],
                                                rotate: [0, 360],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </motion.svg>
                                </div>




                            )}

                        </TabsContent>


                        <TabsContent value="code" className="h-screen min-h-0" >


                            {!!activeFragment?.file ? (
                                <FileExplorer
                                    files={activeFragment.file as { [path: string]: string }}
                                />) : (









                                <div className="flex items-center  flex-col justify-center min-h-screen ">


                                    <motion.p
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}

                                        className="f text-2xl text-primary font-Aladin"
                                    >

                                        "Your magic is on the way—get ready to shine!"</motion.p>

                                    <motion.svg
                                        width="80"
                                        height="80"
                                        viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-blue-500"
                                    >



                                        <motion.circle
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            stroke="currentColor"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ strokeDasharray: "0, 300", rotate: 0 }}
                                            animate={{
                                                strokeDasharray: ["0, 300", "150, 300", "0, 300"],
                                                rotate: [0, 360],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </motion.svg>
                                </div>






                            )}


                        </TabsContent>





                    </Tabs>

                </ResizablePanel>

      <ResizableHandle className="hover:bg-primary transition-colors" />

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




            </ResizablePanelGroup>


        </div>
    )
}


