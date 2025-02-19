import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { LoadMore } from "@/components/molecules/load-more";
import { Form, FormControl, FormField, FormItem } from "@/components/ui";
import { useSearchCollection } from "@/hooks/react-query/use-public";
import {
  useGetListSimulatedTestCollection,
  useSearch,
} from "@/hooks/react-query/use-simulated-test";
import { useDebounce } from "@/hooks/use-debounce";
import { SimulatedTestCollection } from "@/lib/types/simulated-test.type";
import { generateKeyword } from "@/lib/utils";

import { AutoComplete, AutocompleteOption } from "../molecules/autocomplete";
import { SearchTagsList } from "../molecules/search-tags-list";
import {
  CollectionCard,
  SkeletonCollectionCard,
} from "../molecules/simulated-tests/collection-card";
import SkillsFilter from "../molecules/skill-filter";

const formSchema = z.object({
  search: z.string().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export const CollectionList = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("practice");

  const form = useForm<FormInputs>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(formSchema),
  });
  const searchText = useDebounce(form.watch("search"), 300);

  const { list, loadMoreProps, isLoading } = useGetListSimulatedTestCollection();
  const { data: searchResponse, isLoading: isSearching } = useSearchCollection();
  const { setSearch: setFilter, clearSearch: clearFilter } = useSearch();

  useEffect(() => {
    setFilter({ keyword: generateKeyword({ searchText: searchText || "" }) });
  }, [searchText]);

  useEffect(() => {
    return () => clearFilter();
  }, []);

  const onSelectedValueChange = (value: string) => {
    setSelectedValue(value);

    navigate({
      to: `/practice/${value}`,
    });
  };

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
                <FormItem className="w-full lg:w-64">
                  <FormControl>
                    <AutoComplete
                      selectedValue={selectedValue}
                      onSelectedValueChange={onSelectedValueChange}
                      placeholder={t("search.placeholder")}
                      inputClassName="h-9 w-full bg-white placeholder:text-neutral-300 focus:outline-none"
                      StartIcon={Search}
                      searchValue={field.value || ""}
                      onSearchValueChange={field.onChange}
                      items={
                        searchResponse?.map((collection) => {
                          const { id: value, name: label, ...rest } = collection;
                          return {
                            label,
                            value: String(value),
                            data: { ...rest },
                          };
                        }) || []
                      }
                      isLoading={isSearching}
                      renderItem={renderSearchItem}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="mb-8 mt-4 flex w-full flex-col gap-4 md:mt-0 md:gap-8">
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

const renderSearchItem = (
  item: AutocompleteOption<Omit<SimulatedTestCollection, "id" | "name">>
) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span>{item.label}</span>
      <SearchTagsList tags={item.data.tags} />
    </div>
  );
};
