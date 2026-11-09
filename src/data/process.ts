import type { ProcessSlot } from '@/types/content'

export const PROCESS: ProcessSlot[] = [
  {
    block: 'Bloco 1',
    title: 'Planejar',
    description:
      'OKRs do ciclo, planejamento e refinamento de sprint, histórias de usuário bem quebradas e reuniões de alinhamento com quem usa o sistema.',
    tags: ['OKR', 'Scrum', 'Kanban', 'HUs'],
  },
  {
    block: 'Bloco 2',
    title: 'Arquitetar',
    description:
      'Estrutura decidida antes do código: monolito modular, camadas com responsabilidade única, SOLID e decisões registradas em ADR.',
    tags: ['ADR', 'SRS', 'SAD'],
  },
  {
    block: 'Bloco 3',
    title: 'Construir',
    description:
      'Desenvolvimento full-stack em Laravel e Vue.js, com testes, acordos de código do time e agentes de IA no fluxo de implementação das HUs.',
    tags: ['Laravel', 'Vue.js', 'PHPUnit', 'Claude Code'],
  },
  {
    block: 'Bloco 4',
    title: 'Sustentar',
    description:
      'Code review de merge requests, pipeline no GitLab, deploy e acompanhamento em produção por SSH, PM2 e logs.',
    tags: ['GitLab CI', 'Docker', 'Linux'],
  },
]
