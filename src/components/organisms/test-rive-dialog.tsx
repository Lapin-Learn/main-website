import { EventType, RiveEventType, useRive } from "@rive-app/react-canvas";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

const TestRiveDialog = () => {
  const { t } = useTranslation("milestone");
  const { rive, RiveComponent } = useRive({
    src: "/level_up.riv",
    artboard: "Level",
    stateMachines: "main",
  });
  const [progress, setProgress] = useState(0);
  const [dialog, setDialog] = useState(true);

  useEffect(() => {
    const progressChanging = setInterval(() => {
      setProgress((prev) => {
        if (prev < 300) {
          return prev + 1;
        }
        return prev;
      });
    }, 2);
    return () => {
      clearInterval(progressChanging);
    };
  }, []);

  useEffect(() => {
    if (rive) {
      const progressWidth = rive
        .stateMachineInputs("main")
        .find((input) => input.name === "progress");
      if (progressWidth) {
        progressWidth.value = (progress / 500) * 300; // Set the progress value as needed
      }
    }
  }, [progress, rive]);

  useEffect(() => {
    if (rive) {
      const textValues = [
        { key: "levelUpText", value: t("gain-new-level") },
        { key: "level", value: `${t("level.label", { ns: "gamification" })} ${5}` },
        { key: "levelNumber", value: "5" },
        { key: "rank", value: `${t(`rank.${"gold"}`, { ns: "gamification" })}` },
        { key: "exp", value: `${450}/${500} ${t("level.exp", { ns: "gamification" })}` },
        { key: "textBtn", value: t("button.next"), path: "main button" },
        { key: "textBtn", value: t("button.share"), path: "share button" },
      ];

      rive.play();
      textValues.forEach(({ key, value, path }) => {
        if (path) {
          rive.setTextRunValueAtPath(key, value, path);
        } else {
          rive.setTextRunValue(key, value);
        }
      });

      const stateMachineInputs = [
        { name: "withRank", value: false },
        { name: "badgeVariant", value: 2 },
      ];

      stateMachineInputs.forEach(({ name, value }) => {
        const input = rive.stateMachineInputs("main")?.find((input) => input.name === name);
        if (input) {
          input.value = value;
        }
      });
    }
    return () => {};
  }, [rive]);

  const onClick = () => {
    console.log("Click Main");
    setDialog(false);
  };

  const onShare = () => {
    console.log("Click Share");
    setDialog(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRiveEventReceived = (riveEvent: any) => {
    const eventData = riveEvent.data;
    if (eventData.type === RiveEventType.General) {
      if (eventData.name === "share") {
        onShare();
      } else if (eventData.name === "act") {
        onClick();
      }
    }
  };

  // Wait until the rive object is instantiated before adding the Rive
  // event listener
  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
    }
  }, [rive]);

  return (
    <Dialog open={dialog}>
      <DialogTitle />
      <DialogContent
        className="flex h-[672px] max-w-2xl flex-col-reverse overflow-hidden rounded-3xl border-none p-0 "
        showClose={false}
      >
        <RiveComponent />
      </DialogContent>
    </Dialog>
  );
};

export default TestRiveDialog;
