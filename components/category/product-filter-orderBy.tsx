'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const orderMap: Record<string, string> = {
  relevancia: 'Relevance',
  'mais-vendidos': 'BestSellers',
  'mais-recentes': 'Newest',
  desconto: 'Discount',
  'maior-preco': 'PriceDesc',
  'menor-preco': 'PriceAsc',
  'nome-ordem-crescente': 'NameAsc',
  'nome-ordem-decrescente': 'NameDesc',
}

const reverseOrderMap = Object.entries(orderMap).reduce(
  (acc, [label, value]) => {
    acc[value] = label
    return acc
  },
  {} as Record<string, string>,
)

export function ProductFilterOrderBy() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const orderBy = searchParams.get('orderBy') ?? 'Relevance'
  const selectedValue = reverseOrderMap[orderBy] ?? 'relevancia'

  const handleChange = (value: string) => {
    const mapped = orderMap[value]
    const params = new URLSearchParams(searchParams.toString())

    if (mapped) {
      params.set('orderBy', mapped)
    } else {
      params.delete('orderBy')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 items-center font-semibold">
      <p>Ordenar por:</p>
      <Select value={selectedValue} onValueChange={handleChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Ordenar por:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevancia">Relevância</SelectItem>
          <SelectItem value="mais-vendidos">Mais vendidos</SelectItem>
          <SelectItem value="mais-recentes">Mais recentes</SelectItem>
          <SelectItem value="desconto">Desconto</SelectItem>
          <SelectItem value="maior-preco">
            Preço: Do maior para o<br /> menor
          </SelectItem>
          <SelectItem value="menor-preco">
            Preço: Do menor para o <br /> maior
          </SelectItem>
          <SelectItem value="nome-ordem-crescente">
            Nome em ordem <br />
            crescente
          </SelectItem>
          <SelectItem value="nome-ordem-decrescente">
            Nome em ordem <br />
            decrescente
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
