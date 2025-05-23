import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { Country } from "country-state-city";
import { countriesData } from "@/constants";

/**
 * Converts an ISO country code to the full country name.
 * @param {string} isoCode - The ISO country code.
 * @returns {string} - The full country name or "Unknown" if not found.
 */

export const generatePassword = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789!@#$%&";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export function getCountryNameFromISO(isoCode: string) {
  const country = Country.getCountryByCode(isoCode);
  return country ? country.name : "Unknown";
}

// Function to get the demonym from ISO code
export function getDemonymFromISO(isoCode: string) {
  const country = countriesData.find(
    (c: { country: string; demonym: string }) =>
      c.country === getCountryNameFromISO(isoCode)
  );
  return country ? country.demonym : "Unknown";
}

// Function to calculate age from date of birth
export const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const downloadCSV = (data: any[], filename = "data.csv") => {
  if (!data.length) return;

  const keys = Object.keys(data[0]);
  const csvContent = [
    keys.join(","),
    ...data.map((row) => keys.map((key) => `"${row[key] ?? ""}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

interface ToastConfig {
  variant: "success" | "destructive";
  title: string;
  description: string;
}

type ToastFunction = (config: ToastConfig) => void;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return "Not Provided";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date"; // Ensure the date is valid

  return `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
};

export const formatMonthDay = (inputDate: string): string => {
  // Split the input date string into components
  const [, month, day] = inputDate.split("-").map(Number);

  // List of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Helper function to add ordinal suffix
  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format the day with the ordinal suffix
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  // Get the month name
  const monthName = monthNames[month - 1]; // Convert 1-based month to 0-based index

  // Return the formatted date
  return `${dayWithSuffix} ${monthName}`;
};

export const getErrorMessage = (
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<Record<string, FieldError>>>
    | undefined
): string | undefined => {
  if (!error) return undefined;

  if (typeof error === "string") return error;
  // Type guard to check if error has a message property
  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return undefined;
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
  const initials = nameParts
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
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
  maidenName: z.string().nonempty("Fill N/A if not applicable"),
});

export const step2Schema = z.object({
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
  advancedDegreeType: z.string().optional(),
  graduateType: z.string().optional(),
  advancedCountry: z.string().optional(),
  advancedDegreeClass: z.string().optional(),
  advancedInstitutionName: z.string().optional(),
  advancedCurrentCGPA: z.string().optional(),
  advancedYearAdmitted: z.string().optional(),
  advancedYearGraduated: z.string().optional(),
});

export const step3Schema = z.object({
  profession: z.string().min(2, "Profession is required"),
  sectorOfProfession: z.string().min(2, "Sector of profession is required"),
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
  jobExperiences: z.array(
    z.object({
      workPlaceName: z.string().optional(),
      jobStatus: z
        .enum(["former", "current", ""])
        .transform((val) => val === "former"),
      currentProfessionalStatus: z.string().optional(),
      currentJobTitle: z.string().optional(),
      employmentType: z.string().optional(),
      stateLocation: z.string().optional(),
      countryLocation: z.string().optional(),
      startedDate: z.string().optional(),
      endedDate: z.string().optional(),
      companyDescription: z.string().optional(),
      jobSummary: z.string().optional(),
    })
  ),
});

const relationshipOptions = [
  "father",
  "mother",
  "uncle",
  "aunt",
  "sister",
  "brother",
  "cousin",
  "",
] as const;

const relationshipEnum = z.enum(relationshipOptions).optional();

export const step4Schema = z.object({
  referee1fullname: z.string().optional(),
  referee1email: z.string().optional(),
  referee1phoneNumber: z.string().optional(),
  referee1relationship: relationshipEnum, // Use enum for select field validation
  referee2fullname: z.string().optional(),
  referee2email: z.string().optional(),
  referee2phoneNumber: z.string().optional(),
  referee2relationship: relationshipEnum, // Use enum for select field validation
  // RECOMMENDATION SCHEMA
  recommendation1fullname: z.string().min(1, "Full name is required"),
  recommendation1email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  recommendation1phoneNumber: z.string().min(1, "Phone number is required"),
  recommendation1relationship: z.string().min(1, "Relationship is required"),
  recommendation1organization: z
    .string()
    .min(1, "Organization or company is required"),
  recommendation1job: z.string().min(1, "Job title is required"),

  recommendation2fullname: z.string().min(1, "Full name is required"),
  recommendation2email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  recommendation2phoneNumber: z.string().min(1, "Phone number is required"),
  recommendation2relationship: z.string().min(1, "Relationship is required"),
  recommendation2organization: z
    .string()
    .min(1, "Organization or company is required"),
  recommendation2job: z.string().min(1, "Job title is required"),

  recommendation3fullname: z.string().min(1, "Full name is required"),
  recommendation3email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  recommendation3phoneNumber: z.string().min(1, "Phone number is required"),
  recommendation3relationship: z.string().min(1, "Relationship is required"),
  recommendation3organization: z
    .string()
    .min(1, "Organization or company is required"),
  recommendation3job: z.string().min(1, "Job title is required"),
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

export const onboardSchema2 = z.object({
  membershipStatus: z.string().nonempty("Membership status is required"),
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  surname: z.string().nonempty("Surname is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  whatsappNumber: z.string().nonempty("Whatsapp number is required"),
  gender: z.enum(["Male", "Female"]),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "That's not a valid date",
  }),
  age: z.number().optional(),
  graduateOf: z.enum(["Polytechnic", "University"]),
  kindOfDegree: z.string().nonempty("Kind of degree is required"),

  courseOfStudy: z.string().nonempty("This is required"),

  institutionName: z.string().nonempty("Institution is required"),
  degreeClass: z.string().nonempty("Class of degree is required"),
  specificCGPA: z.string().nonempty("Specific CGPA is required"),
  hasMasters: z.string(),
  mastersDegree: z.string().optional(),
  mastersCourse: z.string().optional(),
  mastersInstitution: z.string().optional(),
  classOfDegreeMasters: z.string().optional(),
  specificCGPAMasters: z.string().optional(),
  typeOfAcademicDegree: z.string().nonempty("This is required"),
  academicProgram: z.string().nonempty("This is required"),
  specificUniversity: z.string().nonempty("This is required"),
  uploadCV: z.string().nonempty("CV upload is required"),
  GMATGRE: z.string().nonempty("This is required"),
  countriesOfInterest: z
    .array(z.string())
    .min(1, "Please select at least one country of interest"),
});

export const acsform1Schema = z.object({
  programType1: z.string().min(1, "Program Type 1 is required"),
  assignedSchool1: z.string().min(1, "Assigned School 1 is required"),
  assignedCourse1: z.string().min(1, "Assigned Course 1 is required"),
  country1: z.string().min(1, "Country is required"),
});

export const acsform2Schema = z.object({
  programType2: z.string().min(1, "Program Type 2 is required"),
  assignedSchool2: z.string().min(1, "Assigned School 2 is required"),
  assignedCourse2: z.string().min(1, "Assigned Course 2 is required"),
  country2: z.string().min(1, "Country is required"),
});
