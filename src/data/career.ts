import type { Job, YearMonth } from '@/types/content'

/** Primeiro mês exibido na linha do tempo. */
export const TIMELINE_START: YearMonth = { year: 2023, month: 1 }

export const JOBS: Job[] = [
  {
    title: 'Desenvolvedor Web',
    company: 'Instituto Verbena · UFG',
    clipLabel: 'Desenvolvedor Web · Verbena',
    period: 'out 2024 — atual',
    start: { year: 2024, month: 10 },
    color: 'b2',
    highlights: [
      'Desenvolvimento full-stack de sistemas internos em Laravel e Vue.js',
      'Planejamento com OKRs, Scrum e Kanban; refinamento de HUs e reuniões',
      'Decisões de arquitetura e acordos de código do time',
      'Code review de merge requests e CI/CD no GitLab',
      'Desenho do processo de sustentação',
      'Agentes de IA no fluxo de implementação',
    ],
  },
  {
    title: 'Colaborador de TI',
    company: 'Instituto Verbena · UFG',
    clipLabel: 'Colaborador de TI · Verbena',
    period: 'jun 2024 — nov 2025',
    start: { year: 2024, month: 6 },
    end: { year: 2025, month: 11 },
    color: 'b3',
    highlights: [
      'Manutenção de sistemas legados em PHP',
      'Scripts SQL para consultas analíticas',
      'Suporte à infraestrutura de servidores web locais',
    ],
  },
  {
    title: 'Colaborador de TI',
    company: 'ELO Jr Engenharias',
    clipLabel: 'TI · ELO Jr',
    period: 'out 2023 — set 2024',
    start: { year: 2023, month: 10 },
    end: { year: 2024, month: 9 },
    color: 'b5',
    highlights: [
      'Squad ágil com entregas semanais em Flutter e React',
      'Branches e Pull Requests no GitHub',
      'Prototipação no Figma',
    ],
  },
]
