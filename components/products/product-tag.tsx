import { ComponentType, SVGProps } from 'react'

export function ProductTag({
  icon: Icon,
  label,
}: {
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  label: string
}) {
  return (
    <div className="flex items-center h-[34px] bg-white/80 rounded px-2 py-1 border border-gray-200">
      {Icon && <Icon className="w-4 h-4 text-black-500 mr-1" />}
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  )
}
