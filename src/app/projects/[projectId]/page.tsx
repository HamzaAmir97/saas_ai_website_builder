import React from 'react'

 interface props{
    params : Promise<{
      projectId:string,
    }
    >
 }

const page = async ({params}:props) => {
  const {projectId}= await params;
  return (
    <div>ProjectId: {projectId}</div>
  )
}

export default page