/**
 * Idea: using prefix sum
 * @param audioLengths the list of audio lengths fromm the audio files
 * @returns the list of timestamps for each audio file if they were to be concatenated
 */
export function getTimeStamp(audioLengths: number[]) {
  return audioLengths.map((audioLength, index) => {
    if (index) {
      return audioLength + audioLengths[index - 1];
    }
  });
}
