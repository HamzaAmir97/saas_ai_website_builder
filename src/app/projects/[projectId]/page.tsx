import React from 'react'

 interface props{
    prams : Promise<{
      projectId:string,
    }
    >
 }

const page = async ({prams}:props) => {
  const {projectId}= await prams;
  return (
    <div>ProjectId: {projectId}</div>
  )
}

export default page