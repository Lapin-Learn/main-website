import { VariantProps } from "class-variance-authority";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { alertVariants } from "../../ui/alert";

type AlertTheme = VariantProps<typeof alertVariants>["variant"];

interface CustomAlertProps {
  theme: AlertTheme;
  title: string;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
}

export default function CustomAlert({ theme, title, description, icon }: CustomAlertProps) {
  return (
    <Alert className={"flex flex-col gap-1 md:gap-2"} variant={theme}>
      <div className="flex items-center gap-2">
        {icon}
        <AlertTitle className="m-0 text-body font-semibold">{title}</AlertTitle>
      </div>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
