import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import { useToast } from "@/hooks/use-toast";

interface MicrophoneContextType {
  permission: PermissionState;
  stream: MediaStream | null;
  requestPermission: () => Promise<void>;
}

const MicrophoneContext = createContext<MicrophoneContextType | undefined>(undefined);

const MicrophonePermissionProvider = ({ children }: PropsWithChildren) => {
  const [permission, setPermission] = useState<PermissionState>("prompt");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  const requestPermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
        setPermission("granted");
      } catch {
        setPermission("denied");
        toast({
          variant: "destructive",
          title: t("microphone.deniedTitle"),
          description: t("microphone.deniedDescription"),
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: t("microphone.browserNotSupportTitle"),
        description: t("microphone.browserNotSupportDescription"),
      });
    }
  }, [setStream, t, toast]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <MicrophoneContext.Provider value={{ permission, stream, requestPermission }}>
      {children}
    </MicrophoneContext.Provider>
  );
};

const useMicrophone = () => {
  const context = useContext(MicrophoneContext);
  if (context === undefined) {
    throw new Error("useMicrophone must be used within a MicrophonePermissionProvider");
  }
  return context;
};

export default MicrophonePermissionProvider;
export { useMicrophone };
