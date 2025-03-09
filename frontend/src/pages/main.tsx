import { useEffect, useState } from "react";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { getFileName } from "@/lib/utils";
import { validateFile } from "@/lib/validation";
import { main } from "@wails/go/models";
import { EventsEmit, EventsOn, OnFileDrop, OnFileDropOff } from "@wails/runtime";

const formats = Object.keys(main.Format);

function sendToBackend(files: string[]) {
    EventsEmit("req(process)", JSON.stringify(files || []));
}

EventsOn("error", (data: string) => {
    toast.error(data);
});

export default function MainPage() {
    const [files, setFiles] = useState<string[]>([]);

    const onDrop = (_x: number, _y: number, paths: string[]) => {
        const invalidFiles = paths.filter((path) => !validateFile(path));
        invalidFiles.forEach((file) => {
            const fileName = getFileName(file);
            if (fileName) {
                toast.error(`Invalid file: ${fileName}`);
            }
        });

        const validFiles = paths.filter((path) => validateFile(path));

        setFiles((prevFiles) => Array.from(new Set([...validFiles, ...prevFiles])));
    };

    useEffect(() => {
        OnFileDrop(onDrop, true);

        return () => {
            OnFileDropOff();
        };
    });

    return (
        <div className="flex flex-row items-center">
            <div className="w-[24rem]">
                <FileUploader files={files} onRemove={(file) => setFiles((prevFiles) => prevFiles.filter((f) => f !== file))} />
            </div>
            <div className="w-[12rem] flex flex-col items-center justify-between h-full">
                <Select>
                    <SelectTrigger className="w-[11rem]">
                        <SelectValue placeholder="Convert to..." />
                    </SelectTrigger>
                    <SelectContent>
                        {formats.map((format) => (
                            <SelectItem key={format} value={format}>
                                .{main.Format[format as keyof typeof main.Format]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button className="w-[11rem]" disabled={files?.length === 0} onClick={() => { sendToBackend(files); }}>
                    Process
                </Button>
            </div>
        </div>
    );
}
