import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { QuestionGroupMultipleChoice } from "@/lib/types/simulated-test.type";

export default function MultipleChoiceQuestionGroup({
  questionCard,
  questions,
}: QuestionGroupMultipleChoice) {
  return (
    <div>
      <h6 className="font-bold">{questionCard}</h6>
      <ul className="pl-4 pt-2">
        {/* TODO DICUSSION: hard code here base on type or store in dtb, there may be a difference YES NO NG */}
        <li>TRUE - if the statement agrees with the information</li>
        <li>FALSE - if the statement contradicts the information </li>
        <li>NOT GIVEN - if there is no information on this</li>
      </ul>
      {questions.map((question) => (
        <div
          key={question.questionNo}
          className="mt-6"
          id={`Question-${question.questionNo.toString()}`}
        >
          <p>
            <strong className="mr-2">{question.questionNo}.</strong>
            {question.question}
          </p>
          <div className="mt-2">
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
          </div>
        </div>
      ))}
    </div>
  );
}
