import { Link } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useGetLessonList } from "@/hooks/react-query/use-daily-lesson";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson/question-types/$questionTypeId";

const QuestionTypeDetailPage = () => {
  const { questionTypeId } = Route.useParams();
  const { data: list, isSuccess } = useGetLessonList(questionTypeId);
  return (
    <main className="px-40 pt-20">
      {isSuccess && (
        <div className="flex w-full flex-col items-center gap-5">
          {list.lessons.map((lesson) => (
            <Link to={`/daily-lesson/${lesson.id}`} search={{ questionTypeId }}>
              <Card
                key={lesson.id}
                className="w-80 transition-all duration-300 hover:cursor-pointer hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle>{lesson.name}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default QuestionTypeDetailPage;
