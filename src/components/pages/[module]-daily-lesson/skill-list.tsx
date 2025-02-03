import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui";
import { EnumSkill } from "@/lib/enums";

const SkillListPage = () => {
  return (
    <main className="grid h-screen w-full place-items-center">
      <div className="flex flex-col items-center gap-4">
        {Object.keys(EnumSkill).map((skill) => (
          <Link to="question-types" search={{ skill }} key={skill}>
            <Button className="h-20 w-60" key={skill}>
              <h1 className="text-xl font-bold capitalize">{skill}</h1>
            </Button>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SkillListPage;
