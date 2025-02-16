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
      <main className="flex flex-col space-y-4">
        <p className="text-left text-heading-4 font-semibold">{t("title")}</p>
        <SkillGrid currentSkill={skill} setCurrentSkill={handleSetCurrentSkill} />
        <QuestionTypeList skill={skill} />
      </main>
    </DashboardLayout>
  );
}
