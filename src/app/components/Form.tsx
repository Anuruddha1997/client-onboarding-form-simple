'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// 1. Zod Schema අර්ථ දැක්වීම
const formSchema = z.object({
  fullName: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name too long')
    .regex(/^[A-Za-z\s'-]+$/, 'Invalid characters'),
  email: z.string().email('Invalid email'),
  company: z.string().min(2, 'Company name required'),
  services: z.array(z.string()).nonempty('Select at least one service'),
  budget: z.number().min(100).max(1000000).optional(),
  startDate: z.date().min(new Date(), 'Date must be in future'),
  terms: z.boolean().refine(val => val, 'Must accept terms')
})

export default function OnboardingForm() {
  // 2. React Hook Form සකස් කිරීම
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  // 3. Submit handler
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      alert(result.message)
    } catch (error) {
      alert('Submission failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6">
      {/* Form fields here */}
    </form>
  )
}