import type { CaseStudy } from '@/types/content'

export const CASES: CaseStudy[] = [
  {
    kicker: 'Freelance · solo, de ponta a ponta',
    title: 'Sistema de processos seletivos',
    description:
      'Portal de inscrição e painel administrativo para o Colégio Militar Tiradentes XIV (MA). Arquitetura em monolito modular, documentação formal (ConOps, SRS, SAD, ADRs), contrato, cronograma e desenvolvimento, preparado para picos de acesso no dia do edital.',
    tags: ['Laravel', 'Filament', 'Vue + Inertia', 'Redis', 'Docker'],
    mockup: 'architecture',
  },
  {
    kicker: 'Instituto Verbena · UFG',
    title: 'Sistemas internos do instituto',
    description:
      'Sistemas que as equipes usam todo dia, como a gestão de colaboradores, com HUs, acordos de código e revisão de merge requests entre o time.',
    tags: ['Laravel', 'Vue.js', 'GitLab'],
    mockup: 'dashboard',
  },
  {
    kicker: 'Instituto Verbena · processo',
    title: 'Processo de sustentação',
    description:
      'Estruturação do processo que mantém os sistemas de pé: subprocessos de disponibilidade, suporte e manutenção, cada um com diagrama de atividades e tarefas no Notion.',
    tags: ['Processos', 'Notion', 'Kanban'],
    mockup: 'kanban',
  },
  {
    kicker: 'Engenharia com IA',
    title: 'Agentes para implementar HUs',
    description:
      'Fluxo de agentes no Claude Code que lê a história de usuário, implementa, revisa, corrige e é calibrado com retroalimentação, até o merge request.',
    tags: ['Claude Code', 'HUs', 'Git'],
    mockup: 'pipeline',
  },
  {
    kicker: 'Landing page + API',
    title: 'Igreja Viva',
    description:
      'Do design da landing page a uma aplicação Laravel + Vue em camadas, com backend totalmente separado do front, pronto para servir um app mobile, em containers Docker.',
    tags: ['SOLID', 'PostgreSQL', 'Docker'],
    mockup: 'layers',
  },
]
