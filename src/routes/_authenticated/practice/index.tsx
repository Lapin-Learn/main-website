import PracticePage from '@/components/pages/practice'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/practice/')({
  component: PracticePage,
})
