import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

export function useZodForm<T extends ZodType<any, ZodTypeDef, any>>(schema: T) {
  return useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });
}
