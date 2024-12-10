import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, Input } from "@/components/ui";
import { TestRecordStatus } from "@/lib/enums";

import FormSelect from "../form-inputs/form-select";
import SkillsFilter from "../skill-filter";
import { ExamCard, ExamCardProps } from "./exam-card";

const sampleData: ExamCardProps[] = [
  {
    id: 1,
    thumbnail_id: "1",
    name: "Road to IELTS",
    tags: ["Academic", "Dự đoán", "+2"],
    keyword: "Road to IELTS",
    description:
      "Road to IELTS là bộ tài liệu luyện thi IELTS chính thức từ British Council, được thiết kế để hỗ trợ các",
    tests: [
      {
        id: 1,
        collection_id: 1,
        order: "1",
        test_name: "Road to IELTS - Test 1",
        keyword: "Road to IELTS - Test 1",
        record: {
          id: 1,
          test_id: 1,
          learner_id: 1,
          score: 7.5,
          status: TestRecordStatus.Completed,
        },
      },
      {
        id: 2,
        collection_id: 1,
        order: "2",
        test_name: "Road to IELTS - Test 2",
        keyword: "Road to IELTS - Test 2",
        record: {
          id: 2,
          test_id: 2,
          learner_id: 1,
          score: 6.5,
          status: TestRecordStatus.Completed,
        },
      },
      {
        id: 3,
        collection_id: 1,
        order: "3",
        test_name: "Road to IELTS - Test 3",
        keyword: "Road to IELTS - Test 3",
        record: {
          id: 3,
          test_id: 3,
          learner_id: 1,
          score: null,
          status: TestRecordStatus.InProgress,
        },
      },
    ],
  },
  {
    id: 2,
    thumbnail_id: "2",
    name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 (Full Test)",
    tags: ["Academic", "Dự đoán"],
    keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 (Full Test)",
    description:
      "Bộ đề dự đoán IELTS Speaking Quý I/2024 để hỗ trợ các thí sinh chuẩn bị toàn diện cho kỳ thi IELTS.",
    tests: [
      {
        id: 3,
        collection_id: 2,
        order: "1",
        test_name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 1",
        keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 1",
        record: {
          id: 3,
          test_id: 3,
          learner_id: 1,
          score: null,
          status: TestRecordStatus.InProgress,
        },
      },
      {
        id: 4,
        collection_id: 2,
        order: "2",
        test_name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 2",
        keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 2",
        record: {
          id: 4,
          test_id: 4,
          learner_id: 1,
          score: null,
          status: TestRecordStatus.NotStarted,
        },
      },
    ],
  },
  {
    id: 3,
    thumbnail_id: "2",
    name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 (Full Test)",
    tags: ["Academic", "Dự đoán"],
    keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 (Full Test)",
    description:
      "Bộ đề dự đoán IELTS Speaking Quý I/2024 để hỗ trợ các thí sinh chuẩn bị toàn diện cho kỳ thi IELTS.",
    tests: [
      {
        id: 3,
        collection_id: 2,
        order: "1",
        test_name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 1",
        keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 1",
        record: {
          id: 3,
          test_id: 3,
          learner_id: 1,
          score: null,
          status: TestRecordStatus.InProgress,
        },
      },
      {
        id: 4,
        collection_id: 2,
        order: "2",
        test_name: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 2",
        keyword: "Bộ đề dự đoán IELTS Speaking Quý I/2024 - Test 2",
        record: {
          id: 4,
          test_id: 4,
          learner_id: 1,
          score: null,
          status: TestRecordStatus.NotStarted,
        },
      },
    ],
  },
];

const formSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export const ExamList = () => {
  const { t } = useTranslation("practice");
  const location = useLocation();

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
      <SkillsFilter />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-heading-5 font-semibold md:text-heading-3">{t("exam-list.title")}</h2>
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

      <div className="flex flex-col gap-8">
        {sampleData.map((exam, index) => (
          <Link to={`/practice/${index}`} search={location.search}>
            <ExamCard key={index} {...exam} />
          </Link>
        ))}
      </div>
    </div>
  );
};
