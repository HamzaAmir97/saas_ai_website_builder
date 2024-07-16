


interface HintProps {
    children: React.ReactNode,
    text: string,
    side: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";

}

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import React from 'react'

const Hint = ({ children,
    text,
    side = "top",
    align = "center", }: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>

                   <p>{text}</p>
                </TooltipContent>
            </Tooltip> 
        </TooltipProvider>

    )
}

export default Hint