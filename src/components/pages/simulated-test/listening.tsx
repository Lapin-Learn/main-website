import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import AudioPlayer from "@/components/molecules/audio-player";
import QuestionGroupFactory from "@/components/organisms/question-groups";
import AnswerKeys from "@/components/organisms/simulated-test/answer-keys";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSkillTestData, useGetSTSessionDetail } from "@/hooks/react-query/use-simulated-test";
import useSimulatedTestState from "@/hooks/zustand/use-simulated-test";
import { EnumSimulatedTestSessionStatus } from "@/lib/enums";
import { STSkillPageProps } from "@/lib/types/simulated-test.type";
import { scrollToElementById } from "@/lib/utils";
// import questionGroup from "@/lib/mock/mockListening1.json";
// import { QuestionGroup } from "@/lib/types/simulated-test.type";

const ListeningPage = ({ skillTestId, sessionId }: STSkillPageProps) => {
  const {
    position: { part: currentPart, question },
  } = useSimulatedTestState();
  const { data: testContent, isLoading } = useGetSkillTestData(skillTestId, currentPart);
  const { data: session } = useGetSTSessionDetail(sessionId);
  const isFinished = session?.status === EnumSimulatedTestSessionStatus.FINISHED;

  useEffect(() => {
    if (!isLoading) {
      scrollToElementById(`Question-${question}`);
    }
  }, [isLoading, question]);

  return (
    <ScrollArea className="inner-shadow-section relative flex h-full w-screen flex-1 flex-col items-center bg-neutral-50">
      <div className="relative flex h-full w-screen flex-1 flex-col items-center px-4">
        <AudioPlayer
          className="sticky top-4 z-10 m-4 w-full rounded-md border p-4 shadow-background md:w-1/2"
          src={typeof testContent?.content == "string" ? testContent.content : ""}
        />
        <div className="border-md mb-8 flex w-full flex-col gap-4 rounded-xl bg-white p-4 sm:w-3/4 sm:p-8 md:gap-8">
          {/* For dev testing the data */}
          {/* <QuestionGroupFactory questionGroup={questionGroup.questionGroups[0] as QuestionGroup} /> */}
          {testContent && !isLoading ? (
            <>
              {testContent?.questionGroups?.map((questionGroup) => (
                <div className="flex flex-col gap-8">
                  <QuestionGroupFactory
                    key={questionGroup.startQuestionNo}
                    questionGroup={questionGroup}
                    disabled={isFinished}
                  />
                  {isFinished && (
                    <AnswerKeys
                      answerKeys={session.skillTest.answers}
                      startNo={questionGroup.startQuestionNo}
                      endNo={questionGroup.endQuestionNo}
                    />
                  )}
                </div>
              )) ?? <div>This part is not available. Please contact the administrator.</div>}
            </>
          ) : (
            <div className="grid size-full flex-1 place-items-center">
              <Loader2 className="animate-spin text-neutral-300" size={24} />
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ListeningPage;
