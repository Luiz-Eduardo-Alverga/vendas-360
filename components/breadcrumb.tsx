import { Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbProps {
  firtsDescription: string | undefined
  secondDescription: string | undefined
}

export function Breadcrumb({
  firtsDescription,
  secondDescription,
}: BreadcrumbProps) {
  return (
    <div className="flex items-center text-sm text-gray-500 space-x-2">
      <Link href="/">
        <Home />
      </Link>
      <span>›</span>
      <span>{firtsDescription}</span>
      <span>›</span>
      <span className="text-gray-900">{secondDescription}</span>
    </div>
  )
}
