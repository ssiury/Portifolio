import type { StackCredit } from '@/types/content'

export const STACK: StackCredit[] = [
  {
    role: 'Back-end',
    featured: ['Laravel', 'PHP'],
    others: ['Filament', 'Inertia', 'Sanctum', 'PHPUnit'],
  },
  {
    role: 'Front-end',
    featured: ['Vue.js', 'JavaScript'],
    others: ['React', 'Bootstrap', 'HTML & CSS'],
  },
  { role: 'Dados', featured: ['PostgreSQL'], others: ['MySQL', 'Redis'] },
  {
    role: 'Infra & entrega',
    featured: ['Git', 'GitLab CI'],
    others: ['Docker', 'Linux', 'SSH', 'PM2', 'GitHub'],
  },
  {
    role: 'Arquitetura',
    featured: ['SOLID'],
    others: ['monolito modular', 'camadas', 'ADRs', 'SRS & SAD'],
  },
  { role: 'Direção & gestão', featured: ['Scrum', 'Kanban'], others: ['OKR', 'Notion', 'XP'] },
  { role: 'Efeitos especiais', featured: ['Claude Code'], others: ['n8n'] },
  {
    role: 'Mobile & arte',
    featured: [],
    others: ['Flutter', 'React Native', 'Figma'],
    dimmed: true,
  },
]
