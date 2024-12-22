import { useState } from "react";

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
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "monospace" }}>
      <pre
        style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "4px", overflowX: "auto" }}
      >
        {parsedJson}
      </pre>
      <button onClick={handleCopy} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Copy to Clipboard
      </button>
      {copySuccess && <p style={{ color: "green" }}>{copySuccess}</p>}
    </div>
  );
};

export default JsonDisplayWithCopy;
