import { Clipboard, ClipboardCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";

const JsonDisplayWithCopy = ({ jsonString }: { jsonString: string }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(jsonString)
      .then(() => setCopySuccess("Copied to clipboard!"))
      .catch(() => setCopySuccess("Failed to copy!"));
    setTimeout(() => setCopySuccess(""), 2000);
  };

  let parsedJson;
  try {
    parsedJson = JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch (error) {
    parsedJson = "Invalid JSON";
  }

  return (
    <div className="font-mono mx-auto w-full">
      <ScrollArea className="relative h-96">
        <pre className="w-full overflow-x-auto rounded bg-gray-100 p-4">{parsedJson}</pre>
        <Button
          variant="outline"
          className="absolute right-4 top-4 size-8 p-0"
          onClick={handleCopy}
        >
          {copySuccess ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
        </Button>
        {copySuccess && (
          <div className="absolute right-4 top-16 text-xs text-green-700">Copy successfully!</div>
        )}
      </ScrollArea>
    </div>
  );
};

export default JsonDisplayWithCopy;
