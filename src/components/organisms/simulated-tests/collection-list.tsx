import { z } from "zod";
import { CollectionCard } from "../../mocules/simulated-tests/collection-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import SkillsFilter from "../../mocules/skill-filter";
import { useEffect, useState } from "react";
import { EnumSkill } from "@/lib/enums";
import { FormControl, FormField, FormItem, Input, Form } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import FormSelect from "../../mocules/form-inputs/form-select";
import { useGetListSimulatedTestCollection } from "@/hooks/react-query/use-simulated-test";
import { LoadMore } from "@/components/mocules/load-more";

const formSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export const CollectionList = () => {
  const { list, loadMoreProps } = useGetListSimulatedTestCollection({});
  const [skill, setSkill] = useState<EnumSkill>(EnumSkill.allSkills);
  const { t } = useTranslation("practice");

  useEffect(() => {
    console.log(list);
  }, [list]);
  const form = useForm<FormInputs>({
    defaultValues: {
      search: "",
      filter: "newest",
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: FormInputs) {
    console.log(data);
  }

  return (
    <div className="container flex flex-col items-center gap-8">
      <SkillsFilter skill={skill} setSkill={setSkill} />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-heading-5 font-semibold md:text-heading-3">
          {t("collection-list.title")}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("search.placeholder")}
                      className="h-9 w-full bg-white text-neutral-300 placeholder:text-neutral-300 focus:outline-none"
                      StartIcon={Search}
                      {...field}
                      onBlur={() => form.handleSubmit(onSubmit)()}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormSelect
              name="filter"
              options={[
                { label: t("filter.newest", { ns: "practice" }), value: "newest" },
                { label: t("filter.oldest", { ns: "practice" }), value: "oldest" },
              ]}
            />
          </form>
        </Form>
      </div>

      <div className="mb-8 flex flex-col gap-8">
        {list && list.map((collection) => <CollectionCard key={collection.id} {...collection} />)}
        {loadMoreProps.hasNextPage && <LoadMore {...loadMoreProps} />}
      </div>
    </div>
  );
};
