import { getQueryClient, trpc } from '@/trpc/server';
import React from 'react'

 interface props{
    params : Promise<{
      projectId:string,
    }
    >
 }

const page = async ({params}:props) => {
  const {projectId}= await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.messages.getMany.
    queryOptions({  
       projectId,
  })
 )
 void queryClient.prefetchQuery(trpc.projects.getOne.
  queryOptions({  
     id: projectId,
})
)

  return (
    <div>ProjectId: {projectId}</div>
  )
}

export default page