import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/_profile/profile/change-password',
)({
  component: () => (
    <div>Hello /_authenticated/_profile/profile/change-password!</div>
  ),
})
