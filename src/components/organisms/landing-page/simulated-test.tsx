import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { CollectionCard } from "@/components/molecules/simulated-tests/collection-card";
import { useGetCollectionIntroduction } from "@/hooks/react-query/use-public";

export const SimulatedTest = () => {
  const { t } = useTranslation("landingPage");
  const { data } = useGetCollectionIntroduction();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 bg-linear-blue py-14 md:gap-10">
      <h3 className="text-heading-5 font-bold md:text-heading-3">{t("simulatedTest.title")}</h3>
      <div className="flex w-full flex-col items-center gap-6 p-4 md:gap-8">
        {data?.map((collection) => {
          const { collectionId, collectionName, totalTests, testNames, ...rest } = collection;
          return (
            <Link to={`/practice/${collectionId}`} search={location.search} key={collectionId}>
              <CollectionCard
                key={collection.collectionId}
                id={collectionId}
                name={collectionName}
                testCount={totalTests}
                simulatedIeltsTests={testNames.map((testName) => ({ testName }))}
                {...rest}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
