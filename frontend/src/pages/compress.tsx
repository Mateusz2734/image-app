import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PageLayout from "@/pages/page-layout";

import { EventsEmit } from "@wails/runtime";
import { main } from "@wails/go/models";

function sendToBackend(files: string[], quality: main.Quality) {
    EventsEmit("req(compress)", JSON.stringify({ files: files, quality: quality }));
}

const qualities = main.Quality;

export default function CompressPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [value, setValue] = useState<string>();

    return (
        <PageLayout
            files={files}
            setFiles={setFiles}
            buttonText="Compress"
            buttonDisabled={files.length === 0}
            process={() => sendToBackend(files, qualities[value as keyof typeof qualities])}
        >
            <Select onValueChange={(format) => setValue(format)} value={value}>
                <SelectTrigger className="w-[11rem]">
                    <SelectValue placeholder="Choose quality" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(qualities)
                        .filter((format) => format !== "undefined")
                        .map((format) => (
                            <SelectItem key={format} value={format}>
                                {format}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </PageLayout>
    );
}
