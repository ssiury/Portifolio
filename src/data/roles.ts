import type { RoleMonitor } from '@/types/content'

export const ROLES: RoleMonitor[] = [
  {
    channel: 'arquitetura',
    title: 'Decisões técnicas',
    description:
      'Monolito modular, camadas com responsabilidade única (controller, aplicação, repositório), SOLID e backend desacoplado para servir web e mobile.',
    keywords: 'ADR · SAD · modelo de dados',
  },
  {
    channel: 'desenvolvimento',
    title: 'Código full-stack',
    description:
      'Desenvolvimento bruto de sistemas internos em Laravel e Vue.js, painéis com Filament e Inertia, APIs com Sanctum, PostgreSQL e Redis.',
    keywords: 'Laravel · Vue · Filament',
  },
  {
    channel: 'gestão',
    title: 'Planejamento ágil',
    description:
      'OKRs, planejamento e refinamento de sprint, quadros Kanban e reuniões de alinhamento com o time e com quem usa o sistema.',
    keywords: 'OKR · Scrum · Kanban',
  },
  {
    channel: 'requisitos',
    title: 'Documentação que guia',
    description:
      'Histórias de usuário, ConOps, documento de visão, SRS e acordos de código que o time e os agentes de IA seguem.',
    keywords: 'HU · SRS · ConOps',
  },
  {
    channel: 'qualidade',
    title: 'Revisão e processo',
    description:
      'Code review cruzando HU e acordos do time, CI/CD no GitLab e desenho do processo de sustentação dos sistemas.',
    keywords: 'GitLab CI · PHPUnit · Pint',
  },
  {
    channel: 'operação',
    title: 'Sistema no ar',
    description:
      'Servidores por SSH, PM2 e systemd, leitura de logs e investigação de erros em produção. Docker para padronizar ambientes.',
    keywords: 'Linux · Docker · PM2',
  },
]
