
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator, DropdownMenuSub } from '@/components/ui/dropdown-menu';
import { useTRPC } from '@/trpc/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon, ChevronLeftIcon, SunMediumIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface props {
    projectId: string,
};

const ProjectHeader = ({ projectId }: props) => {
    const trpc = useTRPC();
    const { data: project } = useSuspenseQuery(
        trpc.projects.getOne.queryOptions({ id: projectId })
    );

    return (
        <header className=' p-2 flex justify-between items-center border-b'>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="focus-visible:ring-0 hover:bg-transparent hover:opacity-75 
            transition-opacity pl-2!"
                    >

                        <Image
                            src={"/logo.svg"}
                            alt='codey'
                            width={18}
                            height={18}
                        />
                    </Button>
                    <span className='text-sm font-medium'>{project.name}</span>
                    <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent side='bottom' align='start'>
                   <DropdownMenuItem>
                     <Link 
                       href={"/"}
                       >
                      <ChevronLeftIcon/>
                      <span>Go to dashboard</span>
                     </Link>


                   </DropdownMenuItem>
                   <DropdownMenuSeparator/>

                <DropdownMenuSub>

                     <DropdownMenuSubTrigger className='gap-2'>
                        <SunMediumIcon className='size-4 text-muted-foreground' />
                        <span>Appearnce</span>
                     </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                         <DropdownMenuSubContent>

                            <DropdownMenuRadioGroup value='Light' onValueChange={()=>{}}>
                              <DropdownMenuRadioItem value='Light'>
                                <span>Light</span>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value='Dark'>
                                <span>Dark</span>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value='System'>
                                <span>System</span>
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                         </DropdownMenuSubContent>
                     </DropdownMenuPortal>
                </DropdownMenuSub>
                </DropdownMenuContent>

            </DropdownMenu>


        </header>
    )
}

export default ProjectHeader;