import { SpeakingServiceResponse } from "@/lib/types/daily-lesson.type";

import { FetchingData } from "../lib/types/pagination.type";
import api from "./kyInstance";

type SpeakingEvaluation = {
  original: string;
  uri: string;
};

export const evaluateSpeaking = async (params: SpeakingEvaluation) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: params.uri,
      name: "recording.wav",
      type: "audio/wav",
    } as unknown as Blob);
    formData.append("original", params.original);

    const response = (
      await api
        .post<FetchingData<SpeakingServiceResponse>>(`api/ai/speech-evaluation`, {
          body: formData,
        })
        .json()
    ).data;
    return response;
  } catch (error) {
    console.error("Error evaluating speaking:", error);
    throw error;
  }
};
