import { Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import MicrophoneIcon from "@/assets/icons/skills/microphone-filled";
import { AudioProgress } from "@/components/organisms/audio-progress";
import { InstructionCarousel } from "@/components/organisms/instruction-carousel";
import { Button } from "@/components/ui";
import AudioRipple from "@/components/ui/audioRipple";

declare global {
  interface Window {
    AudioContext: AudioContext;
    webkitAudioContext: AudioContext;
  }
}

const SpeakingPage = () => {
  //TODO: Integrate the speaking page
  // const { skillTestId } = Route.useSearch();
  // const {
  //   position: { part: currentPart, question },
  // } = useSimulatedTestState();
  // const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);

  // useEffect(() => {
  //   if (!isLoading) {
  //     scrollToElementById(`Question-${question}`);
  //   }
  // }, [isLoading, question]);

  const { listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const { t } = useTranslation("simulatedTest");

  useEffect(() => {
    if (isListening) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;
      analyserRef.current = analyser;

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        const updateAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        };
        updateAudioLevel();
      });

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            handleStopTest();
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      dataArrayRef.current = null;
    }
  }, [isListening, setAudioLevel, setProgress]);

  const handleStartTest = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  const handleStopTest = () => {
    SpeechRecognition.stopListening().then(() => {
      resetTranscript();
      setIsListening(false);
      setAudioLevel(0);
    });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#F0FCFF] to-[#C7E1EF]">
      <h4 className="text-heading-4 font-semibold">{t("mode.practice")}</h4>
      <div className="flex flex-col items-center gap-10">
        <InstructionCarousel />
        <div className="flex w-[800px] flex-col items-center gap-8 overflow-visible rounded-lg border border-blue-200 bg-white py-8">
          <div className="relative h-full w-fit overflow-visible">
            {isListening && <AudioRipple audioLevel={audioLevel} />}
            <div className="z-0 overflow-visible">
              <AudioProgress
                value={progress}
                max={100}
                min={0}
                gaugePrimaryColor="#FCE3B4"
                gaugeSecondaryColor="#EFEFEF"
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={listening ? handleStopTest : handleStartTest}
                  className="absolute-center z-10 size-16 rounded-full bg-white shadow-xl transition-colors hover:bg-neutral-50"
                >
                  <MicrophoneIcon />
                </Button>
              </AudioProgress>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>{t("speaking.microphoneTest", { seconds: 10 })}</p>
            <p>{t("speaking.microphonePermission")}</p>
          </div>
          <Button type="submit" className="w-full flex-1 sm:w-fit">
            <div className="flex items-center gap-2">
              <Zap fill="white" strokeWidth={0} className="size-4" />
              {t("startTest")}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
