import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { loginSchema, type LoginFormData } from '@/schemas';
import { useAuthContext } from '@/hooks/useAuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data.email);
    navigate({ to: '/' });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Bem-vindo de volta</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Entre para acompanhar suas candidaturas.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              placeholder="••••••••"
              error={errors.password?.message}
              className="pl-9"
              {...register('password')}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            <LogIn className="h-5 w-5" />
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Não tem uma conta?{' '}
          <Link
            to="/cadastro"
            className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
