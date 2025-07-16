import { Fragment } from "@/generated/prisma";

interface props {
    data :Fragment
}

import React from 'react'

const FragmentWeb = ( {data} :props) => {
  return (
    <div className="flex flex-col w-full h-full">
         <iframe 
          className="h-full w-full"
          sandbox="allow-forms allow-scripts allow-same-origin"
          loading="lazy"
          src={data.sandboxUrl}
         />

         

    </div>
  )
}

export default FragmentWeb