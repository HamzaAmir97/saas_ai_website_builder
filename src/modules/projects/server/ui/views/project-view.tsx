"use client";

import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";


interface props {
    projectId: string,


};


export const ProjectView = ({ projectId }: props) => {
    const trpc = useTRPC();
    const { data:project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({
        id: projectId,

     }));

    const { data : messages } = useSuspenseQuery(trpc.messages.getMany.queryOptions({
        projectId: projectId ,
    }));

      

      

    return (
        <div>{JSON.stringify(project)}
        {JSON.stringify(messages,null,2)}</div>
    )
}


