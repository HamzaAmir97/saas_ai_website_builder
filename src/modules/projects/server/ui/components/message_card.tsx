import { MessageRole ,Fragment,MessageType} from '@/generated/prisma'

interface  MessageCardPrpos{
    content: string ;
    role:MessageRole;
    fragment: Fragment | null ;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick:(fragment:Fragment)=>void
     type :MessageType;

};

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
    
        <p>Assistance</p>
  )}

     
    return (
      
          <p>User</p>
    )
  
   


};

export default MessageCard ;