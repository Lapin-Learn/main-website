import { useTranslation } from "react-i18next";

import SkillGrid from "@/components/organisms/skill-grid";
import DashboardLayout from "@/components/templates/dashboard-layout";
import { EnumSkill } from "@/lib/enums";
import { Route } from "@/routes/_authenticated/_dashboard/daily-lesson";

import QuestionTypeList from "../../organisms/question-type-list";

export default function DailyLessonPage() {
  const { t } = useTranslation("dailyLesson");
  const { skill } = Route.useSearch();
  const navigate = Route.useNavigate();

  const handleSetCurrentSkill = (skill: EnumSkill) => {
    navigate({
      search: {
        skill: skill,
      },
    });
  };

  return (
    <DashboardLayout>
      <main className="flex flex-col space-y-2 md:space-y-4">
        <p className="inline-flex items-center text-left text-heading-5 font-semibold md:text-heading-4">
          {t("title")} -&nbsp;<span className="capitalize">{skill}</span>
        </p>
        <SkillGrid currentSkill={skill} setCurrentSkill={handleSetCurrentSkill} />
        <QuestionTypeList skill={skill} />
      </main>
    </DashboardLayout>
  );
}
