"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnboardingFormData } from "@/lib/schema";
import { useState } from "react";

export default function Home() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<OnboardingFormData>({
      resolver: zodResolver(onboardingSchema),
    });

  const onSubmit = async (data: OnboardingFormData) => {
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Form submit වෙන්නේ නැහැ");

      setSuccess("Form submit වුණා!");
    } catch (err: any) {
      setError(err.message || "Error එකක් වෙලා");
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Client Onboarding Form</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Full Name</label>
          <input {...register("fullName")} className="border p-2 w-full" />
          {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} type="email" className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label>Company Name</label>
          <input {...register("companyName")} className="border p-2 w-full" />
          {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
        </div>

        <div>
          <label>Services Interested In</label>
          {["UI/UX", "Branding", "Web Dev", "Mobile App"].map(service => (
            <label key={service} className="block">
              <input type="checkbox" value={service} {...register("services")} /> {service}
            </label>
          ))}
          {errors.services && <p className="text-red-500">{errors.services.message}</p>}
        </div>

        <div>
          <label>Budget (USD)</label>
          <input type="number" {...register("budgetUsd", { valueAsNumber: true })} className="border p-2 w-full" />
          {errors.budgetUsd && <p className="text-red-500">{errors.budgetUsd.message}</p>}
        </div>

        <div>
          <label>Project Start Date</label>
          <input type="date" {...register("projectStartDate")} className="border p-2 w-full" />
          {errors.projectStartDate && <p className="text-red-500">{errors.projectStartDate.message}</p>}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register("acceptTerms")} /> Accept Terms
          </label>
          {errors.acceptTerms && <p className="text-red-500">{errors.acceptTerms.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </main>
  );
}
