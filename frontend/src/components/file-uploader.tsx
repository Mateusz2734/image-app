import * as React from "react";
import Dropzone from "react-dropzone";

import { cn } from "@/lib/utils";

export function FileUploader({ ...dropzoneProps }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Dropzone>
            {({ getRootProps, isDragActive }) => (
                <div
                    style={{ "--wails-drop-target": "drop" } as React.CSSProperties}
                    {...getRootProps()}
                    className={cn(
                        "group relative grid h-32 place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition",
                        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isDragActive && "border-muted-foreground/50"
                    )}
                    {...dropzoneProps}
                >
                    {isDragActive ? (
                        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                            <p className="font-medium text-muted-foreground">
                                Drop the files here
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                            <div className="flex flex-col gap-px">
                                <p className="font-medium text-muted-foreground">
                                    Drag {`'n'`} drop files here
                                </p>
                                <p className="text-sm text-muted-foreground/70">
                                    You can upload multuple files
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Dropzone>
    );
}

