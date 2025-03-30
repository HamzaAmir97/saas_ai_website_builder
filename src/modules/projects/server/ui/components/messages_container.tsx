import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'


interface props {
    projectId: string,


};

const MessagesContainer = ({ projectId }: props) => {
    const trpc = useTRPC();

    const { data : messages } = useSuspenseQuery(trpc.messages.getMany.queryOptions({
        projectId: projectId ,
    }));

  
    return (
    <div className=' flex flex-col flex-1 min-h-0 '>
        <div className=' flex-1 min-h-0 overflow-y-auto'>
  <div  className='pt-2 pr-1'>
     <MessageCard
       key = {messages.id}
       content= {messages.content}
       role= {messages.role}
       fragment = {messages.fragment }/>


  </div>

        </div>
    </div>
  )
}

export default MessagesContainer