'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { err } from "inngest/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";


 
const page = () => {
  const router = useRouter();
  const[value,setValue]=useState("");
  const trpc = useTRPC();
  // const {data :messages}= useQuery(trpc.messages.getMany.queryOptions());
  const createdProject= useMutation(trpc.projects.create.mutationOptions({
     onError: ()=>{

        toast.error(err.name);
     },
     onSuccess:(data)=>{
      router.push(`/projects/${data.id}`)
      toast.success("start your building now>>>>>")
     }

  }));
  

  return (
    <div  className=' flex  justify-center items-center  h-screen  w-screen '>
     <div className="max-w-7xl m-auto flex items-center flex-col  gap-y-4 justify-center">
      <Input value={value} onChange ={(e)=>setValue(e.target.value)} / >
    <Button className="text-white bg-rose-500 rounded-2xl size-xl"  disabled={createdProject.isPending} onClick={()=> createdProject.mutate({value:value})}>
    Start Buliding my app

    </Button>
    {/* {JSON.stringify(messages,null,2)} */}
    <Toaster/>
    </div>
    </div>
  )
}

export default page