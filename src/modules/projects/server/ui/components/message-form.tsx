"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Usage } from "./usage";

interface props {
    projectId: string,


};

const formScema = z.object({
    value: z.string()
        .min(1, { message: "Value is required" })
        .max(1000, { message: "Value is too  long" }),

});



const MessageForm = ({ projectId }: props) => {
    
    const queryClient = useQueryClient();
    const trpc = useTRPC();
   
    const { data: usage } = useQuery(trpc.usage.status.queryOptions());
 

    const form = useForm<z.infer<typeof formScema>>({
        resolver: zodResolver(formScema),
        defaultValues: {
            value: "",
        }
    });

    const createMessage = useMutation(trpc.messages.create.mutationOptions({
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries(
                trpc.messages.getMany.queryOptions({
                    projectId: projectId,
                })
            )
            //TODO Invaidate usage statues

        },

        onError: () => {
            //todo : redirect to pricing page if specifc
            toast.error("error");
        }
    }))
    const onSubmit = async (values: z.infer<typeof formScema>) => {
        
        await createMessage.mutateAsync({
            value: values.value,
            projectId,
        })
    }
    
    
      const isPending = createMessage.isPending;
      const isButtonDisbled = isPending || !form.formState.isValid;
      const [isFocuesd, setIsFocused] = useState(false);
      const showUsage = !!usage;

    return (
        <Form {...form}>
            {showUsage && (
                <Usage
                    points={0}
                    msBeforeNext={0}
                />
            )}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("relative border p-4 pt-1 rounded-xl bg-sidebar transition-all",
                    isFocuesd && "shadow-xs",
                    showUsage && "rounded-t-none"
                )}
            >


                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (

                        <TextareaAutosize
                            {...field}
                            disabled={isPending}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            minRows={2}
                            maxRows={8}
                            className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                            placeholder="what whould you like to build?"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
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

                    <Button
                        disabled={isButtonDisbled}
                        className={cn("size-8 rounded-full",
                            isButtonDisbled && "bg-muted-foreground border"
                        )}>
                        {isPending ? (<Loader2Icon
                            className="size-4 animate-spin" />) :
                            (
                                <ArrowUpIcon />

                            )


                        }


                    </Button>
                </div>
            </form>





        </Form>


    )
}

export default MessageForm 