import { z } from "zod";

export const ResumeStep1Schema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  // country: z.string().nonempty("Country is required"),
  profession: z.string().nonempty("Profession is required"),
});

export const ResumeStep2Schema = z.object({
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string(),
  nationality: z.string().nonempty("Nationality is required"),
  interest: z.array(
    z.string().min(2, "Each career interest must be at least 2 characters long")
  ),
});

export const ResumeStep3Schema = z.object({
  kindOfDegree: z.string().nonempty("Kind of degree is required"),
  tertiaryInstitutionAttended: z
    .string()
    .nonempty("Tertiary institution attended is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  course: z.string().nonempty("Course is required"),
  country: z.string().nonempty("Country is required"),
  classOfDegree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const ResumeStep4Schema = z.object({
  jobExperiences: z.array(
    z.object({
      nameOfCompany: z.string().nonempty("Name of company is required"),
      jobTitle: z.string().nonempty("Job title is required"),
      companyDescription: z.string().optional(),
      jobDescription: z.string().nonempty("Job description is required"),
      mode: z.string().nonempty("Mode is required"),
      location: z.string().nonempty("Location is required"),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
});

export const ResumeStep5Schema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});
