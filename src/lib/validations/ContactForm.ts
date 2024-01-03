import { z } from 'zod';

export type FormContactSchemaType = z.infer<typeof contactFormSchema>;
export const contactFormSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
});
