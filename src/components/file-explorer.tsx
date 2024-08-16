import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import Hint from './hint';
import { Button } from './ui/button';
import { CopyIcon } from 'lucide-react';
import CodeView from './code-view';



type FileCollection = { [path: string]: string };

function getLanguageFormExtension(filename: string): string {
    const extnsion = filename.split(".").pop()?.toLocaleLowerCase();
    return extnsion || "text";

}

interface FileExplorerProps {
    files: FileCollection,

}



const FileExplorer = ({ files }: FileExplorerProps) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(() => {

        const fileKeys = Object.keys(files);
        return fileKeys.length > 0 ? fileKeys[0] : null;
    })
    return (

        <ResizablePanelGroup direction="horizontal">

            <ResizablePanel defaultSize={30} minSize={30} className='bg-sidebar'>
                <p>TODO :TREE VIEW</p>

            </ResizablePanel>


            <ResizableHandle className="hover:bg-primary transition-colors" />


            <ResizablePanel defaultSize={70} minSize={50} >

                {selectedFile && files[selectedFile] ? (

                    <div className="h-full w-full flex-col">

                        <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">

                            <Hint text="copy to clipboard" side="bottom">
                                <Button
                                    variant={"outline"}
                                    size="icon"
                                    className='ml-auto'
                                    disabled={false}
                                    onClick={() => { }}
                                >
                                    <CopyIcon />
                                </Button>
                            </Hint>

                        </div>
                       


                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        Select a file to view its content
                    </div>
                )}


            </ResizablePanel>


        </ResizablePanelGroup>
    )
}

export default FileExplorer