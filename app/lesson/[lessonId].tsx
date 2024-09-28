import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import MultipleChoice from '~/components/molecules/exercise/MultipleChoice';
import MultipleChoices from '~/components/molecules/exercise/MultipleChoices';
import { LoadingLesson } from '~/components/molecules/lesson/LoadingLesson';
import { useLessonQuestions } from '~/hooks/react-query/useDailyLesson';
import { ContentTypeEnum } from '~/lib/enums';
import { IQuestion } from '~/lib/interfaces';

export default function Exercise() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { data: questions, isLoading: questionsLoading } = useLessonQuestions({ lessonId: Number(lessonId) });
  const { t } = useTranslation('question');

  if (questionsLoading) {
    return <LoadingLesson />;
  }

  const questionData: IQuestion[] =
    questions?.questionToLessons.map((lessonQuestion) => {
      return lessonQuestion.question;
    }) ?? [];

  const renderQuestionComponent = (contentType: string) => {
    switch (contentType) {
      case ContentTypeEnum.MULTIPLE_CHOICE:
        return <MultipleChoice lesson={Number(lessonId)} data={questionData} />;
      case ContentTypeEnum.MULTIPLE_CHOICES:
        return <MultipleChoices lesson={Number(lessonId)} data={questionData} />;
      default:
        return <Text>{t('general.unsupportedQuestionType')}</Text>;
    }
  };

  return (
    <View>
      {questionData.length > 0 ? (
        renderQuestionComponent(questionData[0].contentType)
      ) : (
        <View className='flex h-full items-center justify-center'>
          <Text>{t('general.noQuestionFound')}</Text>
        </View>
      )}
    </View>
  );
}
