type TagsListProps = {
  tags: string[];
  format?: (tag: string) => string;
};

export default function TagsList({ tags, format }: TagsListProps) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2 align-text-bottom">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
        >
          {format ? format(tag) : tag}
        </span>
      ))}
    </span>
  );
}
