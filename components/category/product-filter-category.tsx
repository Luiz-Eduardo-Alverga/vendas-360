'use client'

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'
import { CustomDiamondIcon } from '../icon/custom-diamond-icon'
import { CustomStarIcon } from '../icon/custor-star-icon'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getCategories } from '@/services/categories/get-categories'
import { getPromotions } from '@/services/promotions/get-promotions'
import { getHighlights } from '@/services/highlights/get-highlights'
import { useRouter, useSearchParams } from 'next/navigation'
import { isHighlightActive } from '@/utils/highlights/is-highlights-active'
import { isPromotionActive } from '@/utils/promotion/is-promotion-active'
import { useAuth } from '@/context/AuthContext'

export function ProductFilterByCategory() {
  const { accessToken, isAuthLoading } = useAuth()
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const router = useRouter()

  const searchParams = useSearchParams()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: promotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: highlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const activeHighlights = highlights?.filter(isHighlightActive)
  const activePromotions = promotions?.filter(isPromotionActive)

  const handleCategoryClick = (categoryId: string) => {
    // mantém os filtros (tags, preço etc.)
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/categoria/${categoryId}?${params.toString()}`)
  }

  return (
    <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center p-2 bg-gray-100 justify-between cursor-pointer mb-3 ">
          <h3 className="font-medium">Categorias</h3>
          <ChevronRight
            className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-90' : ''}`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          {activePromotions &&
            activePromotions.map((promotion) => (
              <div key={promotion.id}>
                <Collapsible>
                  <div
                    onClick={() => handleCategoryClick(promotion.id)}
                    className="flex items-center p-1 justify-between hover:bg-zinc-100 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        id={promotion.id}
                        className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <Label className="text-sm cursor-pointer flex gap-2">
                        <div className="p-0.5 rounded-full flex items-center justify-center bg-red-100">
                          <CustomDiamondIcon className="w-5 h-5 text-red-600" />
                        </div>
                        {promotion.title}
                      </Label>
                    </div>
                  </div>
                  <CollapsibleContent className="ml-6 mt-2 space-y-1"></CollapsibleContent>
                </Collapsible>
              </div>
            ))}

          {activeHighlights &&
            activeHighlights.map((highlight) => (
              <div key={highlight.id}>
                <Collapsible>
                  <div
                    onClick={() => handleCategoryClick(highlight.id)}
                    className="flex items-center p-1 justify-between hover:bg-zinc-100 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        id={highlight.id}
                        className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <Label className="text-sm cursor-pointer flex gap-2">
                        <div className="p-0.5 rounded-full flex items-center justify-center bg-yellow-100">
                          <CustomStarIcon className="w-5 h-5 text-yellow-500" />
                        </div>
                        {highlight.title}
                      </Label>
                    </div>
                  </div>
                  <CollapsibleContent className="ml-6 mt-2 space-y-1"></CollapsibleContent>
                </Collapsible>
              </div>
            ))}

          {categories &&
            categories.map((category) => (
              <div key={category.id}>
                <Collapsible>
                  <div className="flex items-center p-1 justify-between hover:bg-zinc-100 cursor-pointer">
                    <div
                      onClick={() => handleCategoryClick(category.id)}
                      className="flex items-center space-x-2"
                    >
                      <div
                        id={category.id}
                        className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <Label className="text-sm cursor-pointer flex gap-2">
                        {category.description}
                      </Label>
                    </div>
                    {category.subcategories.length > 0 && (
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-4 w-4">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </CollapsibleTrigger>
                    )}
                  </div>
                  <CollapsibleContent className="ml-6 mt-2 space-y-1"></CollapsibleContent>
                </Collapsible>
              </div>
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
