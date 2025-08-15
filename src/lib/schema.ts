import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string()
    .min(2, "The name must be at least 2 letters long.")
    .max(80, "The name should be a maximum of 80 characters.")
    .regex(/^[A-Za-z\s'\-]+$/, "Only letters, spaces, ' and - can be entered."),
  
  email: z.string().email("Use a real email"),
  
  companyName: z.string().min(2).max(100),
  
  services: z.array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "Please select at least one service."),
  
  budgetUsd: z
    .number()
    .refine(val => !isNaN(val), { message: "Budget should be a single number." })
    .int()
    .min(100, "Minimum budget $100")
    .max(1000000, "Maximum budget $1,000,000")
    .optional(),
  
  projectStartDate: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().toDateString()),
    "Start date must be today or later."
  ),
  
  acceptTerms: z.literal(true).refine(val => val === true, {
    message: "Accept the terms"
  })
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
