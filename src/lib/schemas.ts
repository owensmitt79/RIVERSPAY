import { z } from 'zod';

export const paymentSchema = z.object({
  payerName: z.string().min(2, 'Name must be at least 2 characters'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  service: z.string().min(1, 'Please select a service'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Number is too short').max(20, 'Number is too long').regex(/^[\d\s\-+]+$/, 'Must contain only digits, spaces, or dashes'),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

export const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message is too long'),
});

export type ChatFormData = z.infer<typeof chatSchema>;

export const personalLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type PersonalLoginData = z.infer<typeof personalLoginSchema>;

export const corporateLoginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  organizationId: z.string().min(1, 'Organization ID is required'),
});

export type CorporateLoginData = z.infer<typeof corporateLoginSchema>;

export const personalSignupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  terms: z.boolean().refine(val => val === true, "You must accept terms"),
});

export type PersonalSignupData = z.infer<typeof personalSignupSchema>;

export const corporateSignupSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessType: z.string().min(1, "Please select business type"),
  businessEmail: z.string().email("Invalid business email"),
  businessPhone: z.string().min(10, "Invalid business phone"),
  registrationType: z.string().min(1, "Please select registration type"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  terms: z.boolean().refine(val => val === true, "You must accept terms"),
});

export type CorporateSignupData = z.infer<typeof corporateSignupSchema>;
