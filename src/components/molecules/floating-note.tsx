import { Button, Card } from "@components/ui";
import { Textarea } from "@components/ui/textarea.tsx";
import { NotebookPenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Rnd } from "react-rnd";

export function FloatingNote() {
  const { t } = useTranslation("simulatedTest");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const noteRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        noteRef.current &&
        !noteRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="absolute bottom-28 right-5 z-50">
        <Button
          ref={buttonRef}
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="group flex size-full items-center justify-center overflow-hidden rounded-full px-4 py-3 shadow-lg hover:gap-2"
        >
          <span className="w-0 translate-x-0 transition-all duration-200 ease-in-out group-hover:w-fit md:translate-x-full md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
            {t("noteBtn.title")}
          </span>
          <NotebookPenIcon size={16} />
        </Button>
      </div>

      {isOpen && (
        <Rnd
          default={{
            x: window.innerWidth - 350,
            y: window.innerHeight - 350,
            width: 300,
            height: 200,
          }}
          minWidth={250}
          minHeight={150}
          bounds="window"
          className="z-50"
        >
          <div ref={noteRef} className="size-full">
            <Card className="relative size-full border bg-white p-4 shadow-lg">
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("noteBtn.placeholder")}
                className="size-full resize-none focus-visible:ring-0"
              />
            </Card>
          </div>
        </Rnd>
      )}
    </>
  );
}
