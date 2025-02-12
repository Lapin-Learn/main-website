import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

import { Typography } from "../ui";

export function SearchTagsList({ tags }: { tags: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");

  const updateDisplayText = () => {
    const element = ref.current;
    if (!element) return;

    const cloneNode = document.createElement("div");
    Object.assign(cloneNode.style, {
      position: "absolute",
      visibility: "hidden",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(cloneNode);

    let slicedTags = tags.slice(0, 1);
    let remainingTags = 0;

    for (let i = 2; i <= tags.length + 1; i++) {
      cloneNode.innerHTML = renderToString(
        <Typography variant="caption" className="h-fit text-nowrap rounded-md text-gray-500">
          {slicedTags.join(", ")}
        </Typography>
      );

      if (cloneNode.offsetWidth > element.offsetWidth) {
        slicedTags = tags.slice(0, i - 2);
        remainingTags = tags.length - (i - 2);
        break;
      }
      slicedTags = tags.slice(0, i);
    }

    setDisplayText(
      renderToString(
        <Typography variant="caption" className="h-fit text-nowrap rounded-md text-gray-500">
          {slicedTags.join(", ")}
          {remainingTags > 0 && `, +${remainingTags}`}
        </Typography>
      )
    );
    document.body.removeChild(cloneNode);
  };

  useEffect(() => {
    updateDisplayText();
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(updateDisplayText);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [tags]);

  return <div className="w-full" ref={ref} dangerouslySetInnerHTML={{ __html: displayText }} />;
}
