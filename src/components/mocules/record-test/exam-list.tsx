import { z } from "zod";
import { ExamCard, ExamCardProps } from "./exam-card";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import SkillsFilter, { Skills } from "../skill-filter";
import { useState } from "react";
import { TestRecordStatus } from "@/lib/enums";

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
];

const formSchema = z.object({
  search: z.string().optional(),
});

type FormInputs = z.input<typeof formSchema>;

export const ExamList = () => {
  const form = useForm<FormInputs>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [skill, setSkill] = useState<Skills>("Tất cả kỹ năng");
  return (
    <div className="container flex flex-col items-center gap-8">
      <SkillsFilter skill={skill} setSkill={setSkill} />
      <div className="flex w-full items-center justify-between">
        <h2 className="text-heading-3 font-semibold">Danh sách các bộ đề</h2>
        <Form {...form}>
          <form className="flex items-center gap-7">
            <div className="grow-1 flex items-center gap-2.5 rounded-lg border bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
              <Search size={24} className="text-neutral-300" />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full border-none bg-transparent text-neutral-300 placeholder:text-neutral-300 focus:outline-none"
                aria-label="Search"
              />
            </div>
            <select className="rounded-lg border bg-white px-3 py-2.5 text-gray-600">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>
          </form>
        </Form>
      </div>

      <div className="flex flex-col gap-8">
        {sampleData.map((exam, index) => (
          <ExamCard key={index} {...exam} />
        ))}
      </div>
    </div>
  );
};
