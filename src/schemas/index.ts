import { z } from 'zod';

export const applicationSchema = z.object({
  position: z
    .string()
    .min(1, 'Informe o cargo')
    .max(100, 'O cargo deve ter no máximo 100 caracteres'),
  company: z
    .string()
    .min(1, 'Informe a empresa')
    .max(100, 'A empresa deve ter no máximo 100 caracteres'),
  location: z.enum(['Remoto', 'Híbrido', 'Presencial'], {
    message: 'Selecione a localização',
  }),
  contractType: z.enum(['CLT', 'PJ', 'Estágio', 'Freelance', 'Aprendiz'], {
    message: 'Selecione o tipo de contratação',
  }),
  status: z.enum(['interessante', 'candidatado', 'entrevista'], {
    message: 'Selecione o status',
  }),
  applicationDate: z
    .string()
    .min(1, 'Selecione a data da candidatura')
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: 'Data inválida',
    }),
  jobUrl: z
    .string()
    .url('Informe uma URL válida (ex: https://...)')
    .refine((value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === 'http:' || protocol === 'https:';
      } catch {
        return false;
      }
    }, 'A URL deve usar HTTP ou HTTPS.')
    .or(z.literal(''))
    .optional(),
  notes: z.string().max(2000, 'As notas devem ter no máximo 2000 caracteres').optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe seu e-mail')
    .email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Informe sua senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Informe seu nome')
      .max(80, 'O nome deve ter no máximo 80 caracteres'),
    email: z
      .string()
      .min(1, 'Informe seu e-mail')
      .email('E-mail inválido'),
    password: z
      .string()
      .min(1, 'Informe sua senha')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const noteSchema = z.object({
  content: z
    .string()
    .min(1, 'Escreva uma nota')
    .max(2000, 'A nota deve ter no máximo 2000 caracteres'),
});

export type NoteFormData = z.infer<typeof noteSchema>;
