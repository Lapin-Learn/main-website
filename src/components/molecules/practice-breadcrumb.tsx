import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { SimulatedTestCollection, SimulatedTestSession } from "@/lib/types/simulated-test.type";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function PracticeBreadcrumb({
  collection,
  session,
}: {
  collection: SimulatedTestCollection;
  session?: SimulatedTestSession;
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    if (pathSegments[0] === "practice") {
      breadcrumbs.push({ label: t("navigation.practice"), href: "/practice" });
      if (collection?.name) {
        breadcrumbs.push({ label: collection.name, href: `/practice/${collection.id}` });
      }
      if (location.search.skill) {
        const skillName =
          location.search.skill.charAt(0).toUpperCase() + location.search.skill.slice(1);
        breadcrumbs.push({
          label: skillName,
          href: `/practice/${collection.id}?skill=${location.search.skill}`,
        });
      }
      if (pathSegments[1] === "simulated-test" && pathSegments[2] === "result") {
        if (session?.skillTest?.skill) {
          const skillName =
            session.skillTest.skill.charAt(0).toUpperCase() + session.skillTest.skill.slice(1);
          breadcrumbs.push({
            label: skillName,
            href: `/practice/${collection.id}?skill=${session.skillTest.skill}`,
          });
        }
        breadcrumbs.push({ label: t("navigation.result") });
      }
    }
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
