'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

 
const page = () => {
  const[value,setValue]=useState("");
  const trpc = useTRPC();
  const invok = useMutation(trpc.invoke.mutationOptions({
     onSuccess : ()=>{

        toast.success("Baground job started")
     }

  }));
  

  return (
    <div  className='font-bold p-4  text-rose-500'>
      <Input value={value} onChange ={(e)=>setValue(e.target.value)} / >
    <Button  onClick={()=>invok.mutate({value:value})}>
   invok baground

    </Button>
    </div>
  )
}

export default page