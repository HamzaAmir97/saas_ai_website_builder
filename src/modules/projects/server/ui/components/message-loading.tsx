"use client";

import { Bot } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const ShimerMessages = () => {
    const messages = [
        "Thinking...",
        "Loading ...",
        "Just a sec...",
        "Fetching magic...",
        "Spinning up some thoughts...",
        "Unpacking ideas...",
        "Hold tight, good things take time...",
        "Cooking up a response...",
        "Crunching some data...",
        "Almost there..."
      ];
    const [currentMessageIndex,setcurrentMessageIndex]= useState(0);
    useEffect(()=>{
    const interval = setInterval(()=>{
     setcurrentMessageIndex((prev)=>(prev+1) % messages.length);

    },2000)

   return()=> clearInterval(interval);

    },[]);
  
    return (
    <div className='flex items-center gap-2'>
        <span className='text-base text-muted-foreground animate-pulse'>
          {messages[currentMessageIndex]}
        </span></div>
  )
}

export const MessageLoading =()=>{
  
    return(

        <div className=' flex flex-col group px-2 pb-4'>
            <div className='flex items-center gap-2 pt-2 mb-2'>
               {/* <Image 
               
               src={"/logo.svg"}
               alt ="codey"
               width={18}
               height={18}
               className='shrink-0S'
               /> */}
                             <Bot  size={18} width={18}  height={18} className="hidden md:block text-primary"/>

              <span className='text-sm font-medium'> Codey</span>
            </div>
            <div className=' pt-8.5 flex flex-col gap-y-4'>

                       <ShimerMessages/>
            </div>
        </div>
    )


}