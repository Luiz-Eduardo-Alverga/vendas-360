import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface Props {
  searchTerm: string
  onChange: (term: string) => void
}

export function ShoppingCartSearchBar({ searchTerm, onChange }: Props) {
  return (
    <div className="p-4 border-b relative">
      <Search className="absolute left-7 top-[38px] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Pesquise um produto no carrinho"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
