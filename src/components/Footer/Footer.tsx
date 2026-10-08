import { Link } from '@tanstack/react-router';
import { Briefcase, Mail, HelpCircle, BookOpen, Shield } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link to="/" className="inline-flex w-fit">
              <Logo />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Organize e acompanhe suas candidaturas de emprego e estágio em um só lugar.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:suporte@jobtrack.app"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  suporte@jobtrack.app
                </a>
              </li>
              <li>
                <a
                  href="mailto:suporte@jobtrack.app"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  Fale com o suporte
                </a>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Sobre o JobTrack
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Links úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Entrar
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastro"
                  className="inline-flex w-fit items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Criar conta
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} JobTrack. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
