import { Fragment, useCallback, useMemo, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import Hint from './hint';
import { Button } from './ui/button';
import { CopyIcon } from 'lucide-react';
import CodeView from './code-view';
import { convertFilesToTreeItems } from '@/lib/utils';
import { TreeItem } from '../../types';
import { TreeView } from './tree-view';
import path from 'path';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';



type FileCollection = { [path: string]: string };

function getLanguageFormExtension(filename: string): string {
    const extnsion = filename.split(".").pop()?.toLocaleLowerCase();
    return extnsion || "text";

};
interface FileBreadcrumbProps {
    filePath: string,

}

const FileBreadcrumb = ({ filePath }: FileBreadcrumbProps) => {
    const pathSegmanets = filePath.split("/");
    const maxSegments = 4;


    const renderBredcrumbItems = () => {
        if (pathSegmanets.length <= maxSegments) {
            //show all segmanets of 4 or less
            return pathSegmanets.map((segment, index) => {
                const isLast = index === pathSegmanets.length - 1;

                return (
                    <Fragment key={index}

                    >
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage className='font-medium'>
                                    {segment}
                                </BreadcrumbPage>

                            ) : (
                                <span className="text-muted-foreground">
                                    {segment}
                                </span>
                            )

                            }
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                )


            })

        }
        else {
            const firstSegment = pathSegmanets[0];
            const lastSegment = pathSegmanets.length - 1;
            return (
                <>
                    <BreadcrumbItem>
                        
                            <span className='text-muted-foreground'>
                                {firstSegment}
                            </span>
                        <BreadcrumbSeparator>
                        <BreadcrumbItem>
                        <BreadcrumbEllipsis/>
                        </BreadcrumbItem>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                        <BreadcrumbPage className='font-medium'>
                        {lastSegment}
                        </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbItem>
                </>
            )

        }
    }
};

interface FileExplorerProps {
    files: FileCollection,

}



const FileExplorer = ({ files }: FileExplorerProps) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(() => {

        const fileKeys = Object.keys(files);
        return fileKeys.length > 0 ? fileKeys[0] : null;
    })
    const treeData = useMemo(() => {
        return convertFilesToTreeItems(files);
    }, [files]);
    const handleFilesSelect = useCallback((filepath: string) => {

        if (files[filepath]) {
            setSelectedFile(filepath);
        }

    }, [files])

    return (

        <ResizablePanelGroup direction="horizontal">

            <ResizablePanel defaultSize={30} minSize={30} className='bg-sidebar'>
                <TreeView
                    data={treeData}
                    value={selectedFile}
                    onSelect={handleFilesSelect} />

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

                        <div className="flex overflow-auto">
                            <CodeView
                                code={files[selectedFile]}
                                lang={getLanguageFormExtension(selectedFile)}

                            />

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