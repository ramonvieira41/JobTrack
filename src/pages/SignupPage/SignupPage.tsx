import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { signupSchema, type SignupFormData } from '@/schemas';
import { useAuthContext } from '@/hooks/useAuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    signup(data.name, data.email);
    navigate({ to: '/' });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Crie sua conta</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Comece a organizar suas candidaturas agora.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-[38px] h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="Seu nome completo"
              error={errors.name?.message}
              className="pl-9"
              {...register('name')}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-[38px] h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              error={errors.email?.message}
              className="pl-9"
              {...register('email')}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-[38px] h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              id="password"
              type="password"
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              className="pl-9"
              {...register('password')}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-[38px] h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirmar senha"
              placeholder="Repita sua senha"
              error={errors.confirmPassword?.message}
              className="pl-9"
              {...register('confirmPassword')}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            <UserPlus className="h-5 w-5" />
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
