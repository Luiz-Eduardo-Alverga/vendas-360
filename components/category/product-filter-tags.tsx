'use client'

import { useAuth } from '@/context/AuthContext'
import { getTags } from '@/services/tags/get-tags'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function ProductFilterByTags() {
  const { accessToken, isAuthLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tagsOpen, setTagsOpen] = useState(true)

  const selectedTag = searchParams.get('tags')

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedTag === tagName) {
      // Desmarcar a tag
      params.delete('tags')
    } else {
      // Selecionar nova tag
      params.set('tags', tagName)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center p-2 bg-gray-100 justify-between cursor-pointer mb-3">
          <h3 className="font-medium">Etiquetas</h3>
          <ChevronRight
            className={`h-4 w-4 transition-transform ${tagsOpen ? 'rotate-90' : ''}`}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => {
            const isSelected = selectedTag === tag.name
            return (
              <button
                key={tag.id}
                onClick={() => handleTagClick(tag.name)}
                className={`text-xs cursor-pointer px-3 py-1 rounded border transition-colors ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
