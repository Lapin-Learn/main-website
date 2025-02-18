import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AlertTheme = "success" | "error" | "warning" | "info";

interface CustomAlertProps {
  theme: AlertTheme;
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
}

const themeClasses = {
  success: "border-green-300 bg-green-100 text-green-800",
  error: "border-red-300 bg-red-100 text-red-800",
  warning: "border-yellow-300 bg-yellow-100 text-[#854D0E]",
  info: "border-blue-300 bg-blue-100 text-blue-800",
};

export default function CustomAlert({ theme, title, description, icon }: CustomAlertProps) {
  return (
    <Alert className={cn("flex flex-col gap-1 md:gap-2", themeClasses[theme])}>
      <div className="flex items-center gap-2">
        {icon}
        <AlertTitle className="m-0 text-body font-semibold">{title}</AlertTitle>
      </div>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
