import { useEffect, useState } from "react";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

import { getFileName } from "@/lib/utils";
import { validateFile } from "@/lib/validation";
import { main } from "@wails/go/models";
import { EventsEmit, EventsOn, OnFileDrop, OnFileDropOff } from "@wails/runtime";

const formats = Object.keys(main.Format);

function sendToBackend(files: string[], quality: number[]) {
    EventsEmit("req(compress)", JSON.stringify({ files: files, quality: quality[0] }));
}

EventsOn("error", (data: string) => {
    toast.error(data);
});

export default function CompressPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [quality, setQuality] = useState<number[]>([50]);

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
                <div className="text-muted-foreground text-sm">Quality (%)
                    <Slider defaultValue={[50]} min={0} max={100} step={1} value={quality} onValueChange={(newValue) => { setQuality(newValue); console.log(newValue); }} className="w-[11rem]" />
                </div>

                <Button className="w-[11rem]" disabled={files?.length === 0} onClick={() => { sendToBackend(files, quality); }}>
                    Process
                </Button>
            </div>
        </div>
    );
}
