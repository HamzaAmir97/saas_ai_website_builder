
import prisma from '@/lib/db';
import React from 'react'


const page = async () => {
  const posts = await prisma.post.findMany();
  return (
    <div  className='font-bold  text-rose-500'>
       {JSON.stringify(posts,null,2)}
      
    </div>
  )
}

export default page