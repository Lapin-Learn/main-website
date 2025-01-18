import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

type CriteriaScoreCardSimpleProps = {
  criteria: string;
  evaluate: string;
  score: number;
};

function CriteriaScoreCardSimple({ criteria, evaluate, score }: CriteriaScoreCardSimpleProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="flex flex-row justify-between px-4 pb-2 pt-4 text-base text-primary-700">
        <CardTitle className="inline-flex items-center">{criteria}</CardTitle>
        <CardTitle>{score}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 text-justify text-sm font-normal text-muted-foreground">
        {evaluate}
      </CardContent>
    </Card>
  );
}

export default CriteriaScoreCardSimple;
