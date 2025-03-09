import { LuX as X } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { getFileName, inverseTruncate } from "@/lib/utils";

interface FileCardProps {
    file: string;
    onRemove: (file: string) => void;
}

export function FileCard({ file, onRemove }: FileCardProps) {
    return (
        <div className="relative flex items-center">
            <div className="flex flex-1">
                <div className="flex w-full flex-col">
                    <div className="flex flex-col gap-px">
                        <p className="line-clamp-1 text-xs font-medium text-start text-foreground/80 truncate">
                            {inverseTruncate(getFileName(file), 48)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center pr-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={() => onRemove(file)}
                >
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        </div>
    );
}