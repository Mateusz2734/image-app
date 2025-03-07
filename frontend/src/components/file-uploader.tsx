import * as React from "react";
import Dropzone from "react-dropzone";

import { cn } from "@/lib/utils";

import { FileCard } from "@/components/file-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    files: string[];
    onRemove: (file: string) => void;
}
export function FileUploader({ files, onRemove, ...dropzoneProps }: FileUploaderProps) {
    return (
        <Dropzone>
            {({ getRootProps, isDragActive }) => (
                <div
                    style={{ "--wails-drop-target": "drop" } as React.CSSProperties}
                    {...getRootProps()}
                    className={cn(
                        "group relative grid h-48 place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-[2px] text-center transition",
                        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isDragActive && "border-muted-foreground/50"
                    )}
                    {...dropzoneProps}
                >
                    <div className="flex flex-col items-center justify-center sm:px-2 h-12">
                        <p className="font-bold text-muted-foreground text-xs">
                            {isDragActive ? "Drop here." : "Drag and drop files here. They will be listed below."}
                        </p>
                    </div>
                    <Separator />
                    <ScrollArea className="h-32 w-full overflow-hidden py-[1px]">
                        <div className="flex flex-col h-full gap-2">
                            {files?.map((file, index) => (
                                <FileCard
                                    key={index}
                                    file={file}
                                    onRemove={onRemove}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </Dropzone>
    );
}

