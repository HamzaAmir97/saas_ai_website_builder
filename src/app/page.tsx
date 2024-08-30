'use client';

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

 
const page = () => {
  const trpc = useTRPC();
  const invok = useMutation(trpc.invoke.mutationOptions({}));
  

  return (
    <div  className='font-bold p-4  text-rose-500'>
    <Button  onClick={()=>invok.mutate({text:'hamza'})}>
   invok baground

    </Button>
    </div>
  )
}

export default page