import { TextRevealCard } from "@/components/ui/text-reveal-card";
import ProjectForm from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { Bot } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          {/* <Image
            src="/logo.svg"
            alt="Vibe"
            width={50}
            height={50}
            className="hidden md:block"
          /> */}
          <Bot  size={50} width={80}  height={80} className="hidden md:block text-primary animate-bounce "/>
          <TextRevealCard 
        text="Let's Create Magic Together"
        revealText="Let's Create Magic Together"
        className=" bg-transparent text-center"  
        
        >   </TextRevealCard>
       
        </div>
       
       
        

        <p className="text-lg md:text-xl text-muted-foreground text-center  mb-2">
    Create apps and websites by chatting with AI Agent
   </p>
  <div className="max-w-3xl mx-auto w-full mt-10">
    <ProjectForm />
</div>
      </section>
      <ProjectsList/>
    </div>
  );
};


export default Page;