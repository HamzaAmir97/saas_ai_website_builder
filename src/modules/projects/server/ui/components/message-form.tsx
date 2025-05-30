import {useForm} from "react-hook-form";
import {zodResolver}from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface props {
    projectId: string,


};

const formScema = z.object({
    value : z.string()
    .min(1,{message: "Value is required"})
    .max(1000,{message : "Value is too  long"}),

});



const MessageForm = ({ projectId }: props) => {

    const [isFocuesd,setIsFocused]= useState(false);
    const showUsage = false;

     const form = useForm<z.infer<typeof formScema>>({
     resolver:zodResolver(formScema) ,
     defaultValues:{

    value:"",

  }
     });

 const onSubmit= (values:z.infer<typeof formScema>)=>{

   console.log(values);
 }

  return (
    <Form {...form}>
        
     <form
      onSubmit={form.handleSubmit( onSubmit)}
      className={cn("relative border p-4 pt-1 rounded-xl bg-sidebar transition-all",
        isFocuesd && "shadow-xs",
        showUsage&&"rounded-t-none"
      )}
     >


   <FormField
     control={form.control}
     name="value"
     render={({field})=>(
       
        <TextareaAutosize
          {...field}
          onFocus={()=>setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          minRows={2}
          maxRows={8}
        className="pt-4 resize-none border-none w-full outline-none bg-transparent"
        placeholder="what whould you like to build?"
        onKeyDown={(e)=>{
           if(e.key==="Enter"&&(e.ctrlKey || e.metaKey)){
            e.preventDefault();
             form.handleSubmit(onSubmit)(e);
           }

        }}
        />


     )}
   />

  <div className="flex gap-x-2 items-end justify-between pt-2">
     <div className="text-[10px] text-muted-foreground font-mono">
    
    <kbd className="ml-auto pointer-events-auto inline-flex h-5 select-none items-center
       gap-1 rounded border bg-muted  px-1.5 font-mono text=[10px] font-medium ">

        <span>&#8984;</span>Enter
    </kbd>
     &nbsp;to Submit

     </div>


  </div>
     </form>
       

        
        
        
        </Form>


  )
}

export default MessageForm 