import { TIMELINE_START } from '@/data/career'
import type { Job, YearMonth } from '@/types/content'

const monthIndex = ({ year, month }: YearMonth) =>
  (year - TIMELINE_START.year) * 12 + (month - TIMELINE_START.month)

/**
 * Escala da linha do tempo em meses, de TIMELINE_START até o fim do ano atual.
 * O fim de cada trabalho inclui o mês inteiro.
 */
export function useTimeline(today = new Date()) {
  const lastYear = Math.max(today.getFullYear(), TIMELINE_START.year + 3)
  const years = Array.from(
    { length: lastYear - TIMELINE_START.year + 1 },
    (_, i) => TIMELINE_START.year + i,
  )
  const total = years.length * 12
  const now = Math.min(
    total,
    monthIndex({ year: today.getFullYear(), month: today.getMonth() + 1 }) + today.getDate() / 31,
  )

  const span = (job: Job) => {
    const start = monthIndex(job.start)
    const end = job.end ? monthIndex(job.end) + 1 : now
    return {
      left: `${(start / total) * 100}%`,
      width: `${((end - start) / total) * 100}%`,
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const timecode = `TC ${today.getFullYear()}:${pad(today.getMonth() + 1)}:${pad(today.getDate())}`

  return { years, total, now, nowRatio: now / total, span, timecode }
}
