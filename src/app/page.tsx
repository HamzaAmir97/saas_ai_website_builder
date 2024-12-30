'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, Toaster } from "sonner";

 
const page = () => {
  const[value,setValue]=useState("");
  const trpc = useTRPC();
  const {data :messages}= useQuery(trpc.messages.getMany.queryOptions());
  const createdMeassge = useMutation(trpc.messages.create.mutationOptions({
     onSuccess : ()=>{

        toast.success("Message created")
     }

  }));
  

  return (
    <div  className='font-bold p-4  text-rose-500'>
      <Input value={value} onChange ={(e)=>setValue(e.target.value)} / >
    <Button disabled={createdMeassge.isPending} onClick={()=> createdMeassge.mutate({value:value})}>
   invok baground

    </Button>
    {JSON.stringify(messages,null,2)}
    <Toaster/>
    </div>
  )
}

export default page