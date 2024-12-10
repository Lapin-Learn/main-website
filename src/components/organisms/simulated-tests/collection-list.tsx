import { z } from "zod";
import {
  CollectionCard,
  SkeletonCollectionCard,
} from "../../mocules/simulated-tests/collection-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import SkillsFilter from "../../mocules/skill-filter";
import { useEffect, useState } from "react";
import { EnumSkill } from "@/lib/enums";
import { FormControl, FormField, FormItem, Input, Form } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import FormSelect from "../../mocules/form-inputs/form-select";
import {
  useFilter,
  useGetListSimulatedTestCollection,
} from "@/hooks/react-query/use-simulated-test";
import { LoadMore } from "@/components/mocules/load-more";
import { SIMULATED_TEST_TAGS } from "@/lib/consts";
import { useDebounce } from "@/hooks/use-debounce";
import { generateKeyword } from "@/lib/utils";

const formSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export const CollectionList = () => {
  const [skill, setSkill] = useState<EnumSkill>(EnumSkill.allSkills);
  const { t } = useTranslation("practice");

  const form = useForm<FormInputs>({
    defaultValues: {
      search: "",
      filter: "",
    },
    resolver: zodResolver(formSchema),
  });
  const searchText = useDebounce(form.watch("search"), 300);
  // TODO: update multiple filter
  const tag = form.watch("filter") || "";

  const { list, loadMoreProps, isLoading } = useGetListSimulatedTestCollection();
  const { setFilter, clearFilter } = useFilter();

  useEffect(() => {
    setFilter({ keyword: generateKeyword({ tag, searchText: searchText || "" }) });
  }, [searchText, tag]);

  console.log("list");

  useEffect(() => {
    return () => clearFilter();
  }, []);

  return (
    <div className="container flex flex-col items-center gap-2 md:gap-8">
      <SkillsFilter skill={skill} setSkill={setSkill} />
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <h2 className="mt-4 text-heading-5 font-semibold md:mt-0 md:text-heading-3">
          {t("collection-list.title")}
        </h2>
        <Form {...form}>
          <form className="flex w-full flex-1 items-center justify-end gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full md:w-auto">
                  <FormControl>
                    <Input
                      placeholder={t("search.placeholder")}
                      className="h-9 w-full bg-white placeholder:text-neutral-300 focus:outline-none"
                      StartIcon={Search}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormSelect
              name="filter"
              inputClassName="bg-white h-9"
              placeholder={t("collection-list.tagPlaceholder")}
              options={SIMULATED_TEST_TAGS.map(({ value, labelKey }) => {
                return {
                  label: t(`collection-list.tags.${labelKey}`, { ns: "practice" }),
                  value,
                };
              })}
            />
          </form>
        </Form>
      </div>

      <div className="mb-8 flex w-full flex-col gap-4 md:gap-8">
        {list && !isLoading ? (
          list.length > 0 ? (
            list.map((collection) => <CollectionCard key={collection.id} {...collection} />)
          ) : (
            <div className="grid h-96 place-items-center text-center text-xl text-neutral-500">
              {t("search.noResults")}
            </div>
          )
        ) : (
          Array.from({ length: 3 }).map((_, id) => <SkeletonCollectionCard key={id} />)
        )}
        {loadMoreProps.hasNextPage && <LoadMore {...loadMoreProps} />}
      </div>
    </div>
  );
};
