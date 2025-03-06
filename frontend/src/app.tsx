import { EventsEmit, OnFileDrop } from "@wails/runtime";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { cn } from "@/lib/utils";

import { FileUploader } from "./components/file-uploader";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "./components/ui/slider";

function sendToBackend(files: string[]) {
  if (files.length === 0) {
    toast.error("Nothing to process. Please upload some files.");
    return;
  }

  EventsEmit("process-request", files);
}

export default function App() {
  const [files, setFiles] = useState<string[]>([]);

  const onDrop = (_x: number, _y: number, paths: string[]) => {
    setFiles((prevFiles) => Array.from(new Set([...paths, ...prevFiles])));
  };

  useEffect(() => {
    OnFileDrop(onDrop, true);
  }, []);

  return (
    <div className="flex flex-row items-center">
      <div className="w-[12rem]">
        <FileUploader files={files} onRemove={(file) => setFiles((prevFiles) => prevFiles.filter((f) => f !== file))} />
      </div>
      <div className="w-[12rem] flex flex-col items-center justify-between h-full">
        <Select>
          <SelectTrigger className="w-[11rem]">
            <SelectValue placeholder="Image type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JPEG">JPEG</SelectItem>
            <SelectItem value="EBP">EBP</SelectItem>
            <SelectItem value="PNG">PNG</SelectItem>
            <SelectItem value="TIFF">TIFF</SelectItem>
            <SelectItem value="GIF">GIF</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="SVG">SVG</SelectItem>
            <SelectItem value="MAGICK">MAGICK</SelectItem>
            <SelectItem value="HEIF">HEIF</SelectItem>
            <SelectItem value="AVIF">AVIF</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-muted-foreground text-sm">Quality (%)
          <Slider defaultValue={[50]} min={0} max={100} step={1} className="w-[11rem]" />
        </div>

        <Button className="w-[11rem]" disabled={files?.length === 0} onClick={() => { sendToBackend(files); }}>
          Process
        </Button>
      </div>

      <div className="w-[12rem]">
        <div
          style={{ "--wails-drop-target": "drop" } as React.CSSProperties}
          className={cn(
            "group relative grid h-48 place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-2 py-2 text-center transition",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
        >
        </div>
      </div>
    </div>
  );
}
