import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string({ required_error: 'Nome é obrigatório' }).min(1, 'Nome é obrigatório'),
    email: z.string({ required_error: 'E-mail é obrigatório' }).email('E-mail inválido'),
    password: z.string({ required_error: 'Senha é obrigatória' }).min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string({ required_error: 'Confirme sua senha' })
      .min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
