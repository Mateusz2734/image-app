import { useEffect } from "react";
import { toast } from "sonner";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";

import { getFileName } from "@/lib/utils";
import { validateFile } from "@/lib/validation";
import { OnFileDrop, OnFileDropOff } from "@wails/runtime";


interface PageLayoutProps {
    files: string[];
    setFiles: React.Dispatch<React.SetStateAction<string[]>>;

    children: React.ReactNode;
    process: () => void;
    buttonText: string;
    buttonDisabled?: boolean;
}
export default function PageLayout({ files, setFiles, children, process, buttonText, buttonDisabled }: PageLayoutProps) {
    useEffect(() => {
        OnFileDrop((_x: number, _y: number, paths: string[]) => {
            const invalidFiles = paths.filter((path) => !validateFile(path));
            invalidFiles.forEach((file) => {
                const fileName = getFileName(file);
                if (fileName) {
                    toast.error(`Invalid file: ${fileName}`);
                }
            });

            const validFiles = paths.filter((path) => validateFile(path));

            setFiles((prevFiles) => Array.from(new Set([...validFiles, ...prevFiles])));
        }, true);

        return () => {
            OnFileDropOff();
        };
    });

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="w-[24rem] flex flex-row items-center justify-between h-[4rem]">
                {children}

                <Button className="w-[11rem]" disabled={buttonDisabled} onClick={process}>
                    {buttonText}
                </Button>
            </div>
            <div className="w-[24rem]">
                <FileUploader files={files} onRemove={(file) => setFiles((prevFiles) => prevFiles.filter((f) => f !== file))} />
            </div>
        </div>
    );
}
