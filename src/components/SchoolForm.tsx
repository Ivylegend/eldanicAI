import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SaveBtn from "./SaveBtn";
import { useEffect } from "react";
import { sessionTimelineOptions } from "@/constants";

// Schema and types
export const schoolFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  applicationFee: z.string().min(1, "Please select an option"),
  applicationFeeAmount: z.string().optional(),
  schoolApplicationUrl: z.string().url("Please enter a valid URL"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  applicationSubmitted: z
    .string()
    .min(1, "Application submission date is required"),
  sessionTimeline: z.string().min(1, "Please select a session timeline"),
});

export type SchoolFormData = z.infer<typeof schoolFormSchema>;

interface SchoolFormProps {
  onSubmit: (data: SchoolFormData) => void;
  initialValues?: Partial<SchoolFormData>;
  isLoading?: boolean;
}

export function SchoolForm({
  onSubmit,
  initialValues = {},
  isLoading,
}: SchoolFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      username: "",
      password: "",
      applicationFee: "",
      applicationFeeAmount: "",
      schoolApplicationUrl: "",
      applicationDeadline: "",
      applicationSubmitted: "",
      sessionTimeline: "",
      ...initialValues,
    },
  });

  const mapBackendToFrontend = (data: Record<string, any>): SchoolFormData => ({
    username: data.username || "",
    password: data.password || "",
    applicationFee: data.application_fee || "",
    applicationFeeAmount: data.application_fee_amount || "",
    schoolApplicationUrl: data.school_application_url || "",
    applicationDeadline: data.application_deadline || "",
    applicationSubmitted: data.date_application_submitted || "",
    sessionTimeline: data.session_timeline_for_admission || "",
  });

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      reset(mapBackendToFrontend(initialValues));
    }
  }, [initialValues, reset]);

  const handleDelete = () => {
    reset({
      username: "",
      password: "",
      applicationFee: "",
      applicationFeeAmount: "",
      schoolApplicationUrl: "",
      applicationDeadline: "",
      applicationSubmitted: "",
      sessionTimeline: "",
    });
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register("username")}
          className={errors.username ? "border-red-500" : ""}
        />
        {errors.username && (
          <p className="text-sm font-medium text-destructive">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="text"
          {...register("password")}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm font-medium text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Application Fee</Label>
        <Controller
          name="applicationFee"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={errors.applicationFee ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select application fee option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.applicationFee && (
          <p className="text-sm font-medium text-destructive">
            {errors.applicationFee.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationFeeAmount">Application Fee Amount</Label>
        <Input
          id="applicationFeeAmount"
          {...register("applicationFeeAmount")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="schoolApplicationUrl">School Application URL</Label>
        <Input
          id="schoolApplicationUrl"
          {...register("schoolApplicationUrl")}
          className={errors.schoolApplicationUrl ? "border-red-500" : ""}
        />
        {errors.schoolApplicationUrl && (
          <p className="text-sm font-medium text-destructive">
            {errors.schoolApplicationUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationDeadline">Application Deadline</Label>
        <Input
          id="applicationDeadline"
          type="date"
          {...register("applicationDeadline")}
          className={errors.applicationDeadline ? "border-red-500" : ""}
        />
        {errors.applicationDeadline && (
          <p className="text-sm font-medium text-destructive">
            {errors.applicationDeadline.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationSubmitted">Date Application Submitted</Label>
        <Input
          id="applicationSubmitted"
          type="date"
          {...register("applicationSubmitted")}
          className={errors.applicationSubmitted ? "border-red-500" : ""}
        />
        {errors.applicationSubmitted && (
          <p className="text-sm font-medium text-destructive">
            {errors.applicationSubmitted.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Session Timeline for Admission</Label>
        <Controller
          name="sessionTimeline"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className={errors.sessionTimeline ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select session timeline" />
              </SelectTrigger>
              <SelectContent>
                {sessionTimelineOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.sessionTimeline && (
          <p className="text-sm font-medium text-destructive">
            {errors.sessionTimeline.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          variant="outline"
        >
          {isLoading ? <SaveBtn text="Saving" /> : "Save"}
        </Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}
