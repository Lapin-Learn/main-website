import parse from "html-react-parser";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetSkillTestData } from "@/hooks/react-query/use-simulated-test";
import { EnumSkill } from "@/lib/enums";
import { SpeakingSession } from "@/lib/types/simulated-test-session.type";
import type { STCriteriaEvaluation } from "@/lib/types/simulated-test.type";

import AudioPlayer from "../molecules/audio-player";
import { Button, Typography } from "../ui";
import CriteriaScoreList from "./criteria-score-list";

type SpeakingSubmissionProps = {
  evaluationResults?: STCriteriaEvaluation[];
  userSubmissions: SpeakingSession["responses"];
  skillTestId: number;
  partDetails: string[][];
};

function SpeakingSubmission(props: SpeakingSubmissionProps) {
  const { userSubmissions, skillTestId, partDetails, evaluationResults } = props;

  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {userSubmissions?.map((submission, index) => (
        <SubmissionAccordionItem
          key={index}
          submission={submission}
          skillTestId={skillTestId}
          partDetail={
            submission.questionNo <= partDetails.length
              ? partDetails[submission.questionNo - 1]
              : [""]
          }
          evaluationResult={evaluationResults && evaluationResults[submission.questionNo - 1]}
        />
      ))}
    </Accordion>
  );
}

type SubmissionAccordionItemProps = {
  submission: SpeakingSession["responses"][0];
  skillTestId: number;
  partDetail: string[];
  evaluationResult?: STCriteriaEvaluation;
};

function SubmissionAccordionItem(props: SubmissionAccordionItemProps) {
  const { submission, skillTestId, partDetail, evaluationResult } = props;
  const { data, isLoading } = useGetSkillTestData(skillTestId, submission.partNo);

  return (
    <AccordionItem
      value={submission.questionNo.toString()}
      className="flex flex-col gap-4 rounded-xl border-none bg-white p-5"
    >
      <AccordionTrigger
        className="justify-between py-0 text-lg font-semibold uppercase hover:underline"
        iconPosition="right"
      >
        Part {submission.questionNo}:&nbsp;{partDetail.join(", ")}
      </AccordionTrigger>
      <AccordionContent className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-8">
        <div className="col-span-3 flex flex-col gap-4 pb-0">
          {data &&
            !isLoading &&
            Array.isArray(data.content) &&
            data.content.map((question: string, index: number) => (
              <UserAnswer
                key={index}
                question={question}
                no={index + 1}
                partNo={submission.partNo}
              />
            ))}
        </div>
        {evaluationResult ? (
          <CriteriaScoreList evaluationResult={evaluationResult} skill={EnumSkill.speaking} />
        ) : (
          <div className="col-span-3 grid h-full place-items-center content-center gap-2 text-muted-foreground">
            <Typography variant="h6" className="italic">
              Not evaluated yet
            </Typography>
            <Button variant="secondary" size="sm">
              Evaluate now
            </Button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function UserAnswer({ question, no, partNo }: { question: string; no: number; partNo: number }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {partNo == 2 ? (
        <>
          <strong>Question {no}:</strong>
          <p>{parse(question)}</p>
        </>
      ) : (
        <p>
          <strong>Question {no}:</strong>&nbsp;{question}
        </p>
      )}
      <AudioPlayer src="" className="rounded-lg border px-5 py-3" />
      {/* Transcript, calling browser API */}
      <div className="border-l-2 border-neutral-100 pl-4">
        <p className="text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  );
}

export default SpeakingSubmission;
