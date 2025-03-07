import { main } from "@wails/go/models";
import { getFileName } from "@/lib/utils";

const extensions = new Set(Object.values(main.Format).map((format) => `.${format}`));

export function validateFile(file: string) {
  const fileName = getFileName(file);
  const extension = fileName?.split(".").pop();

  if (!extension || !extensions.has(`.${extension}`)) {
    return false;
  }

  return true;
}