import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface ToastConfig {
  variant: "success" | "destructive";
  title: string;
  description: string;
}

type ToastFunction = (config: ToastConfig) => void;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
): any | undefined => {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  return error.message;
};

export const copyToClipboard = async (
  text: string,
  toast: ToastFunction
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      variant: "success",
      title: "Text copied",
      description: `Copied: ${text}`,
    });
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to copy text.",
    });
  }
};

export const calculateYearsOfExperience = (
  startDate: string,
  endDate: string
) => {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  return endYear - startYear;
};

export const getInitials = (name: string) => {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part[0]).join("");
  return initials.toUpperCase();
};

export const authFormSchema = () =>
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

export const step1Schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  surname: z.string().nonempty("Surname is required"),
  preferredName: z.string().optional(),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  cityOfBirth: z.string().nonempty("City of birth is required"),
  stateOfBirth: z.string().nonempty("State of birth is required"),
  countryOfBirth: z.string().nonempty("Country of birth is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  countryOfResidence: z.string().nonempty("Country of residence is required"),
  stateOfResidence: z.string().nonempty("State of residence is required"),
  cityOfResidence: z.string().nonempty("City of residence is required"),
  postalAddress: z.string().nonempty("Postal address is required"),
  houseAddress: z.string().nonempty("House address is required"),
});

// Define a base schema for common fields
const baseSchema = z.object({
  currentStatus: z.string().min(1, { message: "Current status is required" }),
  degreeType: z.string().min(1, { message: "Degree type is required" }),
  countryOfEducation: z.string().min(1, { message: "Country is required" }),
  courseOfStudy: z.string().min(1, { message: "Course of study is required" }),
  institutionName: z
    .string()
    .min(1, { message: "Name of institution is required" }),
  degreeClass: z.string().min(1, { message: "Class of degree is required" }),
  currentCGPA: z.string().min(1, { message: "Current CGPA is required" }),
  yearAdmitted: z
    .string()
    .min(4, { message: "Year admitted must be a positive integer" }),
  yearGraduated: z
    .string()
    .min(4, { message: "Year graduated must be a positive integer" }),
  advancedDegree: z.enum(["yes", "no"]).transform((val) => val === "yes"),
});

// Define a schema for users with an advanced degree
const advancedDegreeSchema = z.object({
  advancedDegreeType: z
    .string()
    .min(1, { message: "Advanced Degree Type is required" }),
  graduateType: z.string().min(1, { message: "Graduate Type is required" }),
  advancedCountry: z.string().min(1, { message: "Country is required" }),
  advancedDegreeClass: z
    .string()
    .min(1, { message: "Class of degree is required" }),
  advancedInstitutionName: z
    .string()
    .min(1, { message: "Name of tertiary institution is required" }),
  advancedCurrentCGPA: z
    .string()
    .min(1, { message: "Current CGPA is required" }),
  advancedYearAdmitted: z
    .string()
    .min(4, { message: "Year admitted must be a positive integer" }),
  advancedYearGraduated: z
    .string()
    .min(4, { message: "Year graduated must be a positive integer" }),
});

// Combine the base schema with the conditional advanced degree schema
export const step2Schema = baseSchema.refine(
  (data) => {
    if (data.advancedDegree === true) {
      try {
        advancedDegreeSchema.safeParse(data);
        return true;
      } catch {
        return false;
      }
    }
    return true; // If 'advancedDegree' is 'no', no need to check advanced fields
  },
  {
    path: ["advancedDegree"], // Show error on the 'advancedDegree' field if validation fails
    message: "All advanced degree fields are required when 'Yes' is selected",
  }
);

export const step3Schema = z.object({
  profession: z.string().min(2, "Profession is required"),
  sectorOfProfession: z.string().min(2, "Sector of profession is required"),
  technicalSkill: z.string().min(2, "Technical skill is required"),
  careerInterest: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Each career interest must be at least 2 characters long"),
      })
    )
    .min(1, "At least one career interest is required"),
  yearsOfProfessionalExperiencePostFirstDegree: z
    .string()
    .min(1, "Must be a positive number"),
  yearsOfProfessionalExperiencePriorToGraduation: z
    .string()
    .min(1, "Must be a positive number"),
  jobsToShowcase: z
    .string()
    .min(1, "Must be at least 1")
    .max(1, "Must be no more than 3"),
  workPlaceName: z.string().min(2, "Name of work place is required"),
  currentProfessionalStatus: z
    .string()
    .min(2, "Current professional status is required"),
  currentJobTitle: z.string().min(2, "Current job title is required"),
  employmentType: z.string().min(2, "Employment type is required"),
  stateLocation: z.string().min(2, "State/Province location is required"),
  countryLocation: z.string().min(2, "Country location is required"),
  startedDate: z.string().min(2, "Start date is required"),
  endedDate: z.string().min(2, "End date is required"),
  jobStatus: z.string().min(2, "Job status is required"),
  companyDescription: z.string().min(2, "Company description is required"),
  jobSummary: z.string().min(2, "Job summary is required"),
});

// Define the allowed values for relationships
const relationshipOptions = [
  "father",
  "mother",
  "uncle",
  "aunt",
  "sister",
  "brother",
  "cousin",
] as const;

// Create an enum schema for relationship fields
const relationshipEnum = z.enum(relationshipOptions);

// Define the step4 schema with the enum validation for relationship fields
export const step4Schema = z.object({
  referee1fullname: z.string().min(1, "Referee 1 full name is required"),
  referee1email: z.string().email("Invalid email address"),
  referee1phoneNumber: z.string().min(1, "Phone number is required"),
  referee1relationship: relationshipEnum, // Use enum for select field validation
  referee2fullname: z.string().min(1, "Referee 2 full name is required"),
  referee2email: z.string().email("Invalid email address"),
  referee2phoneNumber: z.string().min(1, "Phone number is required"),
  referee2relationship: relationshipEnum, // Use enum for select field validation
});

export const step5Schema = z.object({
  document1: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document2: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document3: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document4: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document5: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document6: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document7: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document8: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document9: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
  document10: z
    .custom((file) => file instanceof File || file === undefined, {
      message: "Invalid file",
    })
    .optional(),
});
