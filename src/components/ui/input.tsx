import React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  loading?: boolean;
  StartIcon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, StartIcon, loading = false, ...props }, ref) => {
    return (
      <div className="relative">
        {loading ? (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-[#D1D5DB] py-1 pl-3 pr-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#6B7280] focus-visible:border-primary focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:placeholder-muted-foreground",
              className,
              error && "border-destructive",
              StartIcon && "pl-9"
            )}
            value="---"
            readOnly={true}
          />
        ) : (
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-[#D1D5DB] py-1 pl-3 pr-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#6B7280] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:placeholder-muted-foreground",
              className,
              error && "border-destructive",
              StartIcon && "pl-9"
            )}
            ref={ref}
            {...props}
          />
        )}
        {StartIcon && (
          <StartIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6B7280]" />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
