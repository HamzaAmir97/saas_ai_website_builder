import { Card } from '@/components/ui/card';
import { MessageRole ,Fragment,MessageType} from '@/generated/prisma'
import { cn } from '@/lib/utils';
import { format } from 'date-fns';


interface  MessageCardPrpos{
    content: string ;
    role:MessageRole;
    fragment: Fragment | null ;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick:(fragment:Fragment)=>void
     type :MessageType;

};

interface UserMessageProps{
    content : string;
}


interface AssistanceMessageProps{
       
    content:string,
    fragment:Fragment | null;
    createdAt:Date;
    isActiveFragment:boolean;
    onFragmentClick:(fragment :Fragment)=>void
    type:MessageType,
}



const UserMessage=({content}:UserMessageProps)=>{
      return(
   <div className=' flex justify-end pb-4 pr-2 pl-10'>
    <Card className='rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%
    break-words'>

        {content}


    </Card>

   </div>

      )
}


const AssistanceMessage =({
  
 content,
 fragment,
 createdAt,
isActiveFragment,
 onFragmentClick,
 type,
}:AssistanceMessageProps)=>{

  return(

   <div  className={cn(
      "flex flex-col group px-2 pb-4",
      type ==="ERROR"&&"text-red-700 dark:text-red-500",
   )}>
  <div className="flex items-center gap-2 pl-2 mb-2">
      <span className='text-sm font-medium'> Codey</span>
      <span className='text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100'> 
        {format(createdAt , "HH:mm ' on' MMM dd , yyy")}

      </span>

  </div>
   <div className="pl-8.5 flex flex-col gap-y-4">

   <span>{content}</span>

   </div>
   </div>

  )

}

const MessageCard = ({
    content,
    role,
    fragment,
    createdAt,
    isActiveFragment,
    onFragmentClick,
     type ,}
     :MessageCardPrpos
) => {

    if(role === "ASSISTANCE"){
  return (
    
        <AssistanceMessage 
       
        content={content}
       
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
        />
  )}

     
    return (
      
          <UserMessage content={content}/>
    )
  
   


};

export default MessageCard ;