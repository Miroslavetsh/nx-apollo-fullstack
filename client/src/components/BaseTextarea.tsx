import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const textareaVariants = cva(
  "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-y min-h-[100px]",
  {
    variants: {
      error: {
        true: "border-red-500 focus:ring-red-500",
        false: "border-gray-300 focus:ring-blue-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

interface BaseTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  errorMessage?: string;
}

export const BaseTextarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(
  ({ label, error, errorMessage, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(textareaVariants({ error: !!error }), className)}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
);

BaseTextarea.displayName = "BaseTextarea";
