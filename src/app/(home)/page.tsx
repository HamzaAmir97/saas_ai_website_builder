"use client";
import { FlipWords } from "@/components/ui/flip-words";
import TypingAnimatedText from "@/modules/home/ui/components/AnimatedOutlinedBlock";
import PageLoading from "@/modules/home/ui/components/page-loader";
import ProjectForm from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Bot, HeartIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { motion } from "motion/react"
const Page = () => {
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
  const words = [ "beautiful", "modern ", "apps and websites","with no code" ];
  return (
    <>
      {mounted && <PageLoading/>}
      <AnimatePresence>
      <div className="flex flex-col max-w-5xl mx-auto w-full">
        
      < section className="space-y-6 py-[16vh] 2xl:py-48">
      
      <motion.div 
      initial={{scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 3 ,delay :0.5 }}
      className="flex  justify-center">
      <Bot  size={50} width={80}  height={80} className="hidden md:block text-primary animate-bounce "/>

    

      </motion.div>
        <div className="flex flex-col items-center">
          {/* <Image
            src="/logo.svg"
            alt="Vibe"
            width={50}
            height={50}
            className="hidden md:block"
          /> */}


{/*           
          <TextRevealCard 
        text="Hi there I am Codey"
        revealText="Let's Make Some Magic"
        className="font-Aladin  bg-transparent text-center  text-3xl   ml-50"  
        
        >   </TextRevealCard>
       

 */}

           < TypingAnimatedText />
        </div>
       
       
        

        <motion.div
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 2, delay: 1.5 }}
         className="text-lg md:text-xl text-muted-foreground text-center mb-2">
          By chatting with AI Agent Create <FlipWords words={words} />
        </motion.div>
  <motion.div
    initial={{ scale: 0, y: 10 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.5 }}
  
  className="max-w-3xl mx-auto w-full mt-10">
    <ProjectForm />
  </motion.div>
      </section>
      <ProjectsList/>

      {/* <div className="  max-w-2xl gap-2 w-full "> */}

          <div className=" flex justify-center mt-10 ml-0 mr-0 font-Molle  "><b  className="m-0 " >Built with</b> 
            
          <DotLottieReact
          src="/animations/heart.lottie "
          loop
          autoplay
       
          className='w-30  m-0  animate-bounce'
        />
        
            <b className="m-0 " > By Hamzah Amir </b> </div>
      {/* </div> */}
    </div>
    </AnimatePresence>
    </>
  );
};


export default Page;