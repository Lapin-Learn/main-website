import { Button } from "@/components/ui/button";

const ErrorFallback = () => {
  return (
    <div
      className="flex h-[70vh] w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :(</h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.href)}>
        Refresh
      </Button>
    </div>
  );
};

export default ErrorFallback;
