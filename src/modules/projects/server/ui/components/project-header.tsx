
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface props {
    projectId: string,
};

const ProjectHeader = ({ projectId}:props) => {
    const trpc = useTRPC();
    const { data: project} = useSuspenseQuery(
        trpc.projects.getOne.queryOptions({id: projectId })
    );

  return (
   <header  className=' p-2 flex justify-between items-center border-b'>
      
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
          <ChevronDownIcon/>
       </DropdownMenuTrigger>


      </DropdownMenu>


   </header>
  )
}

export default ProjectHeader ;