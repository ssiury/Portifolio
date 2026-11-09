import type { Profile } from '@/types/content'

export const PROFILE: Profile = {
  firstName: 'Iury',
  lastName: 'Sousa',
  fullName: 'Iury Sousa dos Santos',
  role: 'Desenvolvedor de software full-stack · Instituto Verbena, UFG',
  city: 'Goiânia',
  timeZone: 'America/Sao_Paulo',
  email: 'santosiurysousa@gmail.com',
  statement: {
    before: 'Planejo, arquiteto, codifico e sustento sistemas que mudam a rotina do ',
    highlight: 'Instituto Verbena',
    after:
      '. Estou nas decisões do começo ao fim: do OKR e da sprint até o merge request e o servidor em produção.',
  },
  links: {
    github: { label: 'GitHub', href: 'https://github.com/ssiury' },
    linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ss-iury' },
  },
}
