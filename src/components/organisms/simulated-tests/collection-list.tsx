import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { LoadMore } from "@/components/mocules/load-more";
import { Form, FormControl, FormField, FormItem, Input } from "@/components/ui";
import {
  useFilter,
  useGetListSimulatedTestCollection,
} from "@/hooks/react-query/use-simulated-test";
import { useDebounce } from "@/hooks/use-debounce";
import { SIMULATED_TEST_TAGS } from "@/lib/consts";
import { generateKeyword } from "@/lib/utils";

import FormSelect from "../../mocules/form-inputs/form-select";
import {
  CollectionCard,
  SkeletonCollectionCard,
} from "../../mocules/simulated-tests/collection-card";
import SkillsFilter from "../../mocules/skill-filter";

const formSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export const CollectionList = () => {
  const location = useLocation();
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

  useEffect(() => {
    return () => clearFilter();
  }, []);

  return (
    <div className="container flex flex-col items-center gap-2 md:gap-8">
      <SkillsFilter />
      <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="mt-4 text-heading-4 font-semibold md:mt-0 md:text-heading-3">
          {t("collection-list.title")}
        </h2>
        <Form {...form}>
          <form
            className="flex w-full flex-1 items-center justify-end gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full lg:w-auto">
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
            list.map((collection) => (
              <Link to={`/practice/${collection.id}`} search={location.search} key={collection.id}>
                <CollectionCard key={collection.id} {...collection} />
              </Link>
            ))
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
