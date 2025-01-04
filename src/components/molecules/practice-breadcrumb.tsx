import { Link, useLocation } from "@tanstack/react-router";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  SimulatedTest,
  SimulatedTestCollection,
  SimulatedTestSession,
} from "@/lib/types/simulated-test.type";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

type PracticeBreadcrumbProps = {
  collection: SimulatedTestCollection;
  session?: SimulatedTestSession;
  simulatedTest?: SimulatedTest;
};

export function PracticeBreadcrumb({
  collection,
  session,
  simulatedTest,
}: PracticeBreadcrumbProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // TODO: Kind of messy and hard to read. Refactor this to make it more readable. :">>> From Panda w luv
  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    if (pathSegments[0] === "practice") {
      breadcrumbs.push({ label: t("navigation.practice"), href: "/practice" });
      if (collection?.name) {
        breadcrumbs.push({ label: collection.name, href: `/practice/${collection.id}` });
      }
      if (session) {
        breadcrumbs.push({
          label: session.skillTest.simulatedIeltsTest.testName,
          href: `/practice/${collection.id}/simulated-test/${session?.skillTest.simulatedIeltsTest.id}`,
        });
      }

      if (pathSegments[2] === "simulated-test" && simulatedTest) {
        breadcrumbs.push({
          label: simulatedTest.testName,
          href: `/practice/${collection.id}/simulated-test/${simulatedTest.id}`,
        });
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
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href} asChild>
                  <Link to={crumb.href} className="underline-offset-2 hover:underline">
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
