import { createFileRoute } from "@tanstack/react-router";

import ResultPage from "@/components/pages/result";

export const Route = createFileRoute("/_authenticated/_dashboard/practice/simulated-test/result")({
  component: ResultPage,
  errorComponent: () => {
    return <div>Kiểm tra data</div>;
  },
});
