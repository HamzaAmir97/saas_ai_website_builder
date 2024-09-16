import { TreeItem } from "../../types";


interface TreeViewProps {
    data:TreeItem,
    value : string |null,
    onSelect: (value : string) => void;

}

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";
import { FileIcon } from "lucide-react";
import { Collapsible } from "@radix-ui/react-collapsible";

const TreeView = ({data,
    value,
   onSelect}:TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar>

       <SidebarContent>

          <SidebarGroup>

    <SidebarGroupContent>



    <SidebarMenu>
   
   <SidebarMenuItem>


   </SidebarMenuItem>


    </SidebarMenu>


    </SidebarGroupContent>


          </SidebarGroup>


       </SidebarContent>


      </Sidebar>


    </SidebarProvider>
  )
};

interface   TreeProps {
   
    item : TreeItem,
    SelectedValue ? : string |null,
    onSelect?: (value :string )=> void,
    parentPath : string ,
};



const Tree = ({item, 
    SelectedValue,
    onSelect,
   parentPath,}:TreeProps) => {

    const [name ,...items] = Array.isArray(item) ? item : [item];
    const currenPath= parentPath ? `${parentPath}/name` : name;
 
    if(!items.length){
    const isSelected = SelectedValue === currenPath;
   
    return (
    <SidebarMenuButton
    isActive={isSelected}
    className="data-[active=true]:bg-transparent"
    onClick={(()=>{})}>
         <FileIcon/>
         <span className="trancate">

            {name}
         </span>
    </SidebarMenuButton>
  )
}

    //its a folder
    
    return (
        <SidebarMenuItem>
         <Collapsible>
         
         
         </Collapsible>
        </SidebarMenuItem>
      )
    
};

export default Tree
