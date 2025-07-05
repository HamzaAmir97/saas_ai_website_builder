import { TreeItem } from "../../types";


interface TreeViewProps {
  data: TreeItem[],
  value: string | null,
  onSelect: (value: string) => void;

}

import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarProvider, SidebarRail } from "./ui/sidebar";
import { ChevronsRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";




export const TreeView = ({ data,
  value,
  onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">

        <SidebarContent>

          <SidebarGroup>

            <SidebarGroupContent>



              <SidebarMenu>

                {data.map((item: TreeItem, index: number) => (
                  <Tree
                    key={index}
                    item={item}
                    SelectedValue={value}
                    onSelect={onSelect}
                    parentPath=""
                  />
                ))}


              </SidebarMenu>


            </SidebarGroupContent>


          </SidebarGroup>


        </SidebarContent>
        <SidebarRail />

      </Sidebar>


    </SidebarProvider>
  )
};

interface TreeProps {

  item: TreeItem,
  SelectedValue?: string | null,
  onSelect?: (value: string) => void,
  parentPath: string,
};



const Tree = ({ item,
  SelectedValue,
  onSelect,
  parentPath, }: TreeProps) => {

    // Handle TreeItem type: string | [string, ...TreeItem[]]
    const name = typeof item === 'string' ? item : item[0];
    const items = typeof item === 'string' ? [] : item.slice(1);
    const currenPath = parentPath ? `${parentPath.replace(/\/$/, "")}/${name}` : name;
    
  if (!items.length) {
    const isSelected = SelectedValue === currenPath;

    return (
      <SidebarMenuButton
  isActive={isSelected}
  className="data-[active=true]:bg-transparent"
  onClick={() => onSelect?.(currenPath)}
>
        <FileIcon />
        <span className="truncate">

          {name}
        </span>
      </SidebarMenuButton>
    )
  }

  //its a folder

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible {&[data-state=open]>button>svg:first-child}:rotate-90}"
        defaultOpen


      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronsRightIcon className="transition-transform" />
            <FolderIcon />
            <span className="truncate">
              {name}
            </span>
          </SidebarMenuButton>
        </CollapsibleTrigger>



        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem: TreeItem, index: number) => (
              <Tree
                key={index}
                item={subItem}
                SelectedValue={SelectedValue}
                onSelect={onSelect}
                parentPath={currenPath}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )

};


