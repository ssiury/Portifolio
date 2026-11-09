import type { Channel } from '@/types/content'

/** Cada seção da página é um canal do televisor. */
export const CHANNELS: readonly Channel[] = [
  { number: 1, id: 'inicio', name: 'Início' },
  { number: 2, id: 'processo', name: 'Processo' },
  { number: 3, id: 'atuacao', name: 'Atuação' },
  { number: 4, id: 'casos', name: 'Casos' },
  { number: 5, id: 'trajetoria', name: 'Trajetória' },
  { number: 6, id: 'stack', name: 'Stack' },
  { number: 7, id: 'sobre', name: 'Sobre' },
  { number: 8, id: 'contato', name: 'Contato' },
]

/** Total de posições do seletor (9–12 sem sinal). */
export const TOTAL_CHANNELS = 13
/** Canal escondido com o minijogo. */
export const SECRET_CHANNEL = 13

export const channelByNumber = (n: number): Channel | undefined =>
  CHANNELS.find((c) => c.number === n)

export const channelName = (n: number): string =>
  channelByNumber(n)?.name ?? (n === SECRET_CHANNEL ? '???' : 'Sem sinal')

export const padChannel = (n: number): string => String(n).padStart(2, '0')
