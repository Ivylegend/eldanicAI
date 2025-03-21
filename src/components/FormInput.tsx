import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  asterisks?: string,
  placeholder: string;
  className?: string;
  type: "input" | "select" | "number" | "file";
  options?: { value: string; label: string }[];
  validation?: z.ZodType;
  renderInput?: (inputProps: ControllerRenderProps<T>) => React.ReactElement;
  children?: (field: ControllerRenderProps<T>) => React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

const FormInput = <T extends FieldValues>({
  control,
  asterisks,
  name,
  label,
  placeholder,
  className,
  type = "input",
  options,
  validation,
  renderInput,
  children,
  disabled,
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={
        validation
          ? {
              validate: (value) => {
                try {
                  validation.parse(value);
                  return true;
                } catch (error) {
                  return error instanceof z.ZodError
                    ? error.errors[0].message
                    : "Invalid input";
                }
              },
            }
          : undefined
      }
      render={({ field }) => {
        // Explicitly handle different input types
        const inputProps = {
          ...field,
          value: type === "file" ? undefined : field.value,
          // For file inputs, remove the value prop entirely
          ...(type === "file" && { value: undefined }),
        };

        return (
          <div className={className}>
            <div className="flex items-center gap-1 mb-2">
            <FormLabel className="form-label">{label}</FormLabel>
            <span className="text-red">{asterisks}</span>
            </div>
            <div className="flex w-full flex-col">
              {type === "file" ? (
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file type and size
                          const maxSize = 5 * 1024 * 1024; // 5MB
                          const allowedTypes = [
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          ];

                          if (!allowedTypes.includes(file.type)) {
                            toast({
                              variant: "destructive",
                              title: "Error",
                              description:
                                "Please upload a PDF or Word document.",
                            });
                            e.target.value = ""; // Clear the input
                            return;
                          }

                          if (file.size > maxSize) {
                            toast({
                              title: "Error",
                              variant: "destructive",
                              description: "File size should not exceed 5MB.",
                            });
                            e.target.value = ""; // Clear the input
                            return;
                          }

                          field.onChange(file.name);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    {field.value && (
                      <p className="text-sm text-gray-500">
                        Selected: {field.value}
                      </p>
                    )}
                  </div>
                </FormControl>
              ) : type === "select" ? (
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              ) : (
                <FormControl>
                  {children ? (
                    children(field)
                  ) : renderInput ? (
                    renderInput(field)
                  ) : (
                    <Input
                      {...inputProps}
                      type={type === "number" ? "number" : "text"}
                      placeholder={placeholder}
                      disabled={disabled}
                    />
                  )}
                </FormControl>
              )}
              <FormMessage />
            </div>
          </div>
        );
      }}
    />
  );
};

export default FormInput;
