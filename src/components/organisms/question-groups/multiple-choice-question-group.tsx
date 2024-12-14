import { Checkbox, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { QuestionGroupMultipleChoice } from "@/lib/types/simulated-test.type";

export default function MultipleChoiceQuestionGroup({
  questionCard,
  questions,
}: QuestionGroupMultipleChoice) {
  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      {/* TODO DICUSSION: hard code here base on type or store in dtb, there may be a difference YES NO NG */}
      {/* <ul className="pl-4 pt-2">
        <li>TRUE - if the statement agrees with the information</li>
        <li>FALSE - if the statement contradicts the information </li>
        <li>NOT GIVEN - if there is no information on this</li>
      </ul> */}
      {questions.map((question) => (
        <div key={question.questionNo[0]} className="mt-4">
          {question.questionNo.length == 1 ? (
            <p>
              <strong className="mr-2" id={`Question-${question.questionNo.toString()}`}>
                {question.questionNo[0]}.
              </strong>
              {question.question}
            </p>
          ) : (
            <>
              {question.questionNo.map((no) => (
                <span id={`Question-${no}`} key={no} />
              ))}
              <strong>{question.question}</strong>
            </>
          )}
          <div className="mt-2">
            {question.questionNo.length > 1 ? (
              <div className="mt-2 flex flex-col gap-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-baseline">
                    <Checkbox value={option} id={`${question.questionNo}-${option}`} />
                    <Label
                      className="ml-2 text-base font-normal"
                      htmlFor={`${question.questionNo}-${option}`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup>
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem value={option} id={`${question.questionNo}-${option}`} />
                    <Label
                      className="ml-2 text-base font-normal"
                      htmlFor={`${question.questionNo}-${option}`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
