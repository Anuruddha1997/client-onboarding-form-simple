import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string()
    .min(2, "නම්ය අවම වශයෙන් අකුරු 2ක් විය යුතුයි")
    .max(80, "නම්ය උපරිම වශයෙන් අකුරු 80ක් විය යුතුයි")
    .regex(/^[A-Za-z\s'\-]+$/, "අකුරු, හිස්තැන්, ' සහ - පමණක් ලබාදිය හැක"),
  
  email: z.string().email("සැබෑ email එකක් යොදන්න"),
  
  companyName: z.string().min(2).max(100),
  
  services: z.array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "අවම වශයෙන් සේවාවක් එකක්වත් තෝරන්න"),
  
  budgetUsd: z
    .number()
    .refine(val => !isNaN(val), { message: "Budget එක අංකයක් විය යුතුයි" })
    .int()
    .min(100, "අවම budget $100")
    .max(1000000, "උපරිම budget $1,000,000")
    .optional(),
  
  projectStartDate: z.string().refine(
    (date) => new Date(date) >= new Date(new Date().toDateString()),
    "ආරම්භ දිනය අද හෝ ඉදිරියට විය යුතුයි"
  ),
  
  acceptTerms: z.literal(true).refine(val => val === true, {
    message: "නියමයන් පිළිගන්න"
  })
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
