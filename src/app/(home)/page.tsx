import { FlipWords } from "@/components/ui/flip-words";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import ProjectForm from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { Bot, HeartIcon } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const words = [ "beautiful", "modern ", "apps and websites","with no code" ];
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
        text="Hi there I am Codey"
        revealText="Let's Make Th Magic Together"
        className=" bg-transparent text-center  font-semibold font-serif ml-10"  
        
        >   </TextRevealCard>
       
        </div>
       
       
        

        <div className="text-lg md:text-xl text-muted-foreground text-center mb-2">
          By chatting with AI Agent Create <FlipWords words={words} />
        </div>
  <div className="max-w-3xl mx-auto w-full mt-10">
    <ProjectForm />
</div>
      </section>
      <ProjectsList/>

      {/* <div className="  max-w-2xl gap-2 w-full "> */}

          <p className=" flex justify-center mt-20  "><b>Built with</b> <span className="text-3xl mx-1 mb-0 animate-bounce">❤️</span>  <b> By Hamzah Amir </b> </p>
      {/* </div> */}
    </div>
    
  );
};


export default Page;