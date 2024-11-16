'use client';
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bot } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export const ProjectsList = () => {
    const trpc = useTRPC();
    const {user}=useUser();
    const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());
    
    if(!user) return null ;

    return (
        <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col
         gap-y-6 sm:gap-y-4">
           <h2 className="text-2xl font-semibold">
           
          {user?.firstName}&apos;s projects
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {projects?.length === 0 && (
    <div className="col-span-full muted-text-center">
      <p className="text-sm text-muted-foreground">
        No projects found
      </p>
    </div>
  )}
  {projects?.map((project) => (
    <Button
      key={project.id}
      variant="outline"
      className="font-normal h-auto justify-start w-full text-start p-4"
    >
     <Link href={`/projects/${project.id}`}>
  <div className="flex items-center gap-x-4">
    {/* <Image
      src="/logo.svg"
      alt="Codey"
      width={32}
      height={32}
      className="object-contain"
    /> */}
     <Bot  width={32}  height={32} className="hidden md:block text-primary"/>

    <div className="flex flex-col">
      <h3 className="">
        {project.name}
      </h3>
      <p className="text-sm text-muted-foreground">
  {formatDistanceToNow(project.updatedAt, {
    addSuffix: true,
  })}
</p>
    </div>
  </div>
</Link>
    </Button>
  ))}
</div>
        </div>
    );
};