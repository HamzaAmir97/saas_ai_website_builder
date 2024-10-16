'use client';
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const ProjectsList = () => {
    const trpc = useTRPC();
    const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());
    
    return (
        <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col
         gap-y-6 sm:gap-y-4">
           <h2 className="text-2xl font-semibold">

           projects
           </h2>
        </div>
    );
};