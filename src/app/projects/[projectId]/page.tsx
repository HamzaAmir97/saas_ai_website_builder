
import React, { Suspense } from 'react'
import { ProjectView } from '@/modules/projects/server/ui/views/project-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@/app/error';
import ErrorFallback from '@/app/error';

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
    <HydrationBoundary state={ dehydrate(queryClient)}>
     
       <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<p>Loading...</p>}>
     < ProjectView projectId= {projectId} / >
     </Suspense>
     </ErrorBoundary>
      </HydrationBoundary>
  )
}

export default page