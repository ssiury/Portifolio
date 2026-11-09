/** Cores da paleta de barras de cor (tokens definidos em tokens.css). */
export type BarColor = 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7'

export interface Channel {
  /** Número do canal no seletor do televisor. */
  number: number
  /** id da seção na página. */
  id: string
  name: string
}

export interface ExternalLink {
  label: string
  href: string
}

export interface Profile {
  firstName: string
  lastName: string
  fullName: string
  role: string
  city: string
  timeZone: string
  email: string
  statement: { before: string; highlight: string; after: string }
  links: { github: ExternalLink; linkedin: ExternalLink }
}

export interface ProcessSlot {
  block: string
  title: string
  description: string
  tags: string[]
}

export interface RoleMonitor {
  channel: string
  title: string
  description: string
  keywords: string
}

export type CaseMockup = 'architecture' | 'dashboard' | 'kanban' | 'pipeline' | 'layers'

export interface CaseStudy {
  kicker: string
  title: string
  description: string
  tags: string[]
  mockup: CaseMockup
}

/** Mês no formato { year, month } com month de 1 a 12. */
export interface YearMonth {
  year: number
  month: number
}

export interface Job {
  title: string
  company: string
  /** Rótulo curto exibido no clipe da linha do tempo. */
  clipLabel: string
  period: string
  start: YearMonth
  /** Ausente quando o trabalho é atual. */
  end?: YearMonth
  color: BarColor
  highlights: string[]
}

export interface StackCredit {
  role: string
  /** Itens em destaque (uso semanal). */
  featured: string[]
  others: string[]
  /** Linha inteira em tom secundário. */
  dimmed?: boolean
}

export interface Fact {
  label: string
  title: string
  detail: string
}
