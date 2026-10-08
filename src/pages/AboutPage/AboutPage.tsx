import { Link } from '@tanstack/react-router';
import {
  Target,
  Layers,
  Search,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonLinkBase =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 select-none h-12 px-6 text-base rounded-lg';
const primaryButtonLink =
  'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm';
const outlineButtonLink =
  'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700';

const features = [
  {
    icon: Layers,
    title: 'Organização visual',
    description: 'Acompanhe suas candidaturas em um quadro Kanban intuitivo com colunas para cada etapa do processo.',
  },
  {
    icon: Search,
    title: 'Busca e filtros',
    description: 'Encontre rapidamente qualquer candidatura por cargo, empresa, localização ou tipo de contratação.',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhe seu progresso',
    description: 'Mova candidaturas entre colunas, altere status e veja onde você está em cada processo seletivo.',
  },
  {
    icon: ShieldCheck,
    title: 'Armazenamento local',
    description: 'Suas informações ficam salvas no armazenamento local do navegador, neste dispositivo.',
  },
];

const steps = [
  'Crie uma candidatura com cargo, empresa, localização e tipo de contratação.',
  'Adicione o link da vaga e notas importantes sobre o processo seletivo.',
  'Mova as candidaturas entre as colunas conforme avança em cada processo.',
  'Pesquise e filtre para encontrar rapidamente qualquer candidatura.',
];

export function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 dark:bg-primary-950/40 px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 mb-4">
              <Target className="h-4 w-4" />
              Sobre o JobTrack
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Nunca mais perca o controle das suas candidaturas
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              Quem está procurando emprego ou estágio pode se candidatar a dezenas de vagas
              e perder completamente o controle. O JobTrack resolve isso: um sistema moderno
              para organizar e acompanhar todas as suas candidaturas em um só lugar.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/" className={cn(buttonLinkBase, primaryButtonLink)}>
                Começar agora
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/cadastro" className={cn(buttonLinkBase, outlineButtonLink)}>
                Criar conta
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-lg">
              <div className="space-y-3">
                {[
                  { label: 'Interessantes', count: 3, color: 'bg-amber-400' },
                  { label: 'Candidatado', count: 5, color: 'bg-primary-500' },
                  { label: 'Entrevistas', count: 2, color: 'bg-secondary-500' },
                ].map((col) => (
                  <div
                    key={col.label}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 p-3"
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {col.label}
                    </span>
                    <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
                      {col.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Frontend Developer
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tech Solutions • Remoto • CLT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
            Tudo o que você precisa para organizar sua busca
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-950/40 mb-4">
                    <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
          Como funciona
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white font-bold text-sm mb-3">
                {i + 1}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-12 right-0 h-px bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Pronto para organizar sua busca por emprego?
          </h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            Comece agora e tenha todas as suas candidaturas em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className={cn(
                buttonLinkBase,
                outlineButtonLink,
                'bg-white border-white text-primary-700 hover:bg-primary-50',
              )}
            >
              Ir para o dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/cadastro"
              className={cn(
                buttonLinkBase,
                'bg-primary-900 text-white hover:bg-primary-950 shadow-sm border border-primary-400/30',
              )}
            >
              <CheckCircle2 className="h-5 w-5" />
              Criar conta gratuita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
