import { CheckIcon, X } from "lucide-react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-row gap-2">
              {props.variant !== "destructive" ? (
                <div className="relative size-4 shrink-0 rounded-full bg-green-600">
                  <CheckIcon strokeWidth={4} className="absolute-center size-2.5 text-white" />
                </div>
              ) : (
                <div className="relative size-4 shrink-0 rounded-full bg-red-600">
                  <X strokeWidth={4} className="absolute-center size-2.5 text-white" />
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
                {action}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
