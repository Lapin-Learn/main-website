import AudioPlayer from "@/components/molecules/audio-player";
import { ScrollArea } from "@/components/ui/scroll-area";

const ListeningPage = () => {
  return (
    <ScrollArea className="relative flex h-full w-screen flex-1 flex-col items-center">
      <div className="relative flex h-full w-screen flex-1 flex-col items-center px-4">
        <AudioPlayer className="sticky top-4 mx-4 mt-4 w-full rounded-md border p-4 md:w-1/2" />
        <div>Content goes here</div>
      </div>
    </ScrollArea>
  );
};

export default ListeningPage;
