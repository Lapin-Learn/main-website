import React, { Fragment, PropsWithChildren } from "react";

import TagsList, { TagsListProps } from "../molecules/tags-list";
import { Separator } from "../ui";
import { Skeleton } from "../ui/skeleton";

type TestHeaderLayoutContextType = {
  breadcrumbItems?: string[];
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  tags?: string[];
  description?: string | React.ReactNode;
  isLoading?: boolean;
};

const TestHeaderLayoutContext = React.createContext<TestHeaderLayoutContextType | undefined>(
  undefined
);

const TestHeaderLayout = (
  props: PropsWithChildren<
    TestHeaderLayoutContextType & {
      className?: string;
    }
  >
) => {
  if (props.isLoading) return <HeaderSkeleton />;
  return (
    <TestHeaderLayoutContext.Provider value={props}>
      <div className={props.className}>{props.children}</div>
    </TestHeaderLayoutContext.Provider>
  );
};

const useTestHeaderLayoutContext = () => {
  const context = React.useContext(TestHeaderLayoutContext);
  if (!context) {
    throw new Error("useTestHeaderLayoutContext must be used within a TestHeaderLayout");
  }
  return context;
};

const Image = () => {
  const { imageSrc, imageAlt } = useTestHeaderLayoutContext();
  return (
    <img
      src={imageSrc}
      alt={imageAlt}
      className="h-40 w-60 overflow-hidden rounded-lg object-cover md:h-60 md:w-72"
    />
  );
};

const Title = () => {
  const { title } = useTestHeaderLayoutContext();
  return <span className="mr-2 text-lg font-bold md:text-xl md:leading-8">{title}</span>;
};

const ContentWrapper = ({ children }: PropsWithChildren) => {
  useTestHeaderLayoutContext();
  return <div className="mb-2 flex h-fit flex-row gap-5 md:h-60">{children}</div>;
};

const TagList = ({ format }: Pick<TagsListProps, "format">) => {
  const { tags } = useTestHeaderLayoutContext();
  if (!tags) return null;
  return <TagsList tags={tags} format={format} />;
};

const Description = () => {
  const { description } = useTestHeaderLayoutContext();
  return (
    <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-300 sm:line-clamp-2 md:line-clamp-3">
      {description}
    </p>
  );
};

type AchievementProps = {
  title: string;
  description: string | React.ReactNode;
  align?: "center" | "left" | "right";
};
const Achievement = ({ title, description, align }: AchievementProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium text-neutral-300">{title}</span>
    <div
      className="flex flex-row items-center gap-2 text-2xl font-semibold"
      style={{ alignItems: align ?? "center" }}
    >
      {description}
    </div>
  </div>
);
const AchievementList = ({ children }: PropsWithChildren) => {
  const {} = useTestHeaderLayoutContext();
  const childrenArray = React.Children.toArray(children);
  return (
    <div className="flex w-full flex-row items-center justify-evenly gap-5 pt-3 sm:w-fit sm:justify-normal">
      {childrenArray.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <Separator orientation="vertical" className="flex h-full min-h-12 bg-neutral-200" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

function HeaderSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <Skeleton className="h-5 w-52" />
      <div className="mb-2 flex h-40 flex-row gap-5 md:h-60">
        <Skeleton className="h-40 w-60 md:h-60 md:w-72" />
        <div className="flex w-full flex-col gap-6 py-4">
          <div className="flex h-fit w-full flex-row items-start justify-between gap-8">
            <div className="flex w-full flex-col gap-y-3">
              <span className="mr-2 h-8 w-52 bg-neutral-50 text-lg font-bold md:text-xl md:leading-8" />
              <span className="inline-flex flex-wrap items-center gap-2 align-text-bottom">
                <div className="h-6 w-20 rounded-md bg-neutral-50" />
              </span>
              <p className="line-clamp-1 truncate text-wrap text-sm font-normal text-neutral-300 sm:line-clamp-2 md:line-clamp-3">
                <div className="h-12 w-full bg-neutral-50" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TestHeaderLayout.Image = Image;
TestHeaderLayout.Title = Title;
TestHeaderLayout.TagList = TagList;
TestHeaderLayout.Description = Description;
TestHeaderLayout.Achievement = Achievement;
TestHeaderLayout.AchievementList = AchievementList;
TestHeaderLayout.ContentWrapper = ContentWrapper;
TestHeaderLayout.Skeleton = HeaderSkeleton;

export default TestHeaderLayout;
