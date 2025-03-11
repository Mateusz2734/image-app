import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PageLayout from "@/pages/page-layout";

import { main } from "@wails/go/models";
import { EventsEmit } from "@wails/runtime";

const formats = main.Format;

function sendToBackend(files: string[], format: main.Format) {
    EventsEmit("req(process)", JSON.stringify({ files: files, format: format }));
}

export default function MainPage() {
    const [files, setFiles] = useState<string[]>([]);
    const [value, setValue] = useState<string>();

    return (
        <PageLayout
            files={files}
            setFiles={setFiles}
            buttonText="Convert"
            buttonDisabled={files.length === 0 || !value}
            process={() => sendToBackend(files, formats[value as keyof typeof formats])}
        >
            <Select onValueChange={(format) => setValue(format)} value={value}>
                <SelectTrigger className="w-[11rem]">
                    <SelectValue placeholder="Convert to..." />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(formats)
                        .filter((format) => format !== "undefined")
                        .map((format) => (
                            <SelectItem key={format} value={format}>
                                .{formats[format as keyof typeof formats]}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </PageLayout>
    );
}
