
// import prisma from '@/lib/db';
import { useTRPC } from '@/trpc/client'
import React from 'react'



const page = () => {
  // const posts = await prisma.post.findMany();
  const trpc =useTRPC();
  trpc.creatAI.queryOptions({text:"Hello"});
  
  return (
    <div  className='font-bold  text-rose-500'>
       {/* {JSON.stringify(posts,null,2)} */}
      
    </div>
  )
}

export default page