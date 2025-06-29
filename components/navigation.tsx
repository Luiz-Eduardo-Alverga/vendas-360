'use client'

import React, { useState, useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/categories/get-categories'
import { getPromotions } from '@/services/promotions/get-promotions'
import { getHighlights } from '@/services/highlights/get-highlights'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomStarIcon } from './icon/custor-star-icon'
import { CustomDiamondIcon } from './icon/custom-diamond-icon'
import { isHighlightActive } from '@/utils/highlights/is-highlights-active'
import { isPromotionActive } from '@/utils/promotion/is-promotion-active'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon, MenuIcon, MoreHorizontalIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu'
import { useAuth } from '@/context/AuthContext'

type DropdownItem = {
  id: string
  name: string
  type: 'promotion' | 'highlight' | 'category'
}

export function Navigation() {
  const { accessToken, isAuthLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }

  const currentId = pathname.split('/').pop()

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: promotions = [], isLoading: isLoadingPromotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: highlights = [], isLoading: isLoadingHighlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  const activePromotions = promotions.filter(isPromotionActive)
  const activeHighlights = highlights.filter(isHighlightActive)

  const visiblePromos = activePromotions.slice(0, 2)
  const dropdownPromos = activePromotions

  const visibleHighlights = activeHighlights.slice(0, 2)
  const dropdownHighlights = activeHighlights

  const visibleCategories = categories.slice(0, 3)
  const dropdownCategories = categories

  const handleNavigation = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/categoria/${id}?${params.toString()}`)
  }

  const isAnyLoading =
    isLoadingCategories || isLoadingPromotions || isLoadingHighlights

  const groupedItems = useMemo(() => {
    const allItems = [
      ...dropdownPromos.map((item) => ({
        id: item.id,
        name: item.title,
        type: 'promotion' as const,
      })),
      ...dropdownHighlights.map((item) => ({
        id: item.id,
        name: item.title,
        type: 'highlight' as const,
      })),
      ...dropdownCategories.map((item) => ({
        id: item.id,
        name: item.description,
        type: 'category' as const,
      })),
    ]

    const sorted = allItems.sort((a, b) => {
      const priority = { promotion: 0, highlight: 1, category: 2 }
      return priority[a.type] - priority[b.type]
    })

    const grouped: DropdownItem[][] = []
    const itemsPerColumn = 6
    for (let i = 0; i < sorted.length; i += itemsPerColumn) {
      grouped.push(sorted.slice(i, i + itemsPerColumn))
    }

    return grouped
  }, [dropdownPromos, dropdownHighlights, dropdownCategories])

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="relative mx-auto   ">
        <div
          ref={scrollRef}
          className=" scroll-smooth whitespace-nowrap scrollbar-hide "
        >
          <ul className="flex items-center mx-auto  max-w-[1250px] justify-between  flex-1 space-x-6">
            {/* Skeleton */}
            {isAnyLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="w-32 h-6 rounded-md" />
                </li>
              ))}

            {/* Promoções (limitadas) */}
            {visiblePromos.map((promo) => (
              <li key={promo.id}>
                <button
                  onClick={() => handleNavigation(promo.id)}
                  className={`flex cursor-pointer items-center space-x-2 text-sm font-medium hover:opacity-80 ${
                    currentId === promo.id
                      ? 'text-red-700 font-semibold'
                      : 'text-red-600'
                  }`}
                >
                  <div className="p-0.5 rounded-full flex items-center justify-center bg-red-100">
                    <CustomDiamondIcon className="w-5 h-5" />
                  </div>
                  <span>{promo.title}</span>
                </button>
              </li>
            ))}

            {/* Destaques (limitados) */}
            {visibleHighlights.map((highlight) => (
              <li key={highlight.id}>
                <button
                  onClick={() => handleNavigation(highlight.id)}
                  className={`flex cursor-pointer items-center space-x-2 text-sm font-medium hover:opacity-80 ${
                    currentId === highlight.id
                      ? 'text-yellow-600 font-semibold'
                      : 'text-yellow-500'
                  }`}
                >
                  <div className="p-0.5 rounded-full flex items-center justify-center bg-yellow-100">
                    <CustomStarIcon className="w-5 h-5" />
                  </div>
                  <span>{highlight.title}</span>
                </button>
              </li>
            ))}

            {/* Categorias (limitadas) */}
            {visibleCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleNavigation(cat.id)}
                  className={`text-sm cursor-pointer font-medium hover:text-gray-900 ${
                    currentId === cat.id
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-700'
                  }`}
                >
                  {cat.description}
                </button>
              </li>
            ))}

            {/* Três pontos */}
            <li className="text-gray-400">
              <MoreHorizontalIcon className="w-5 h-5" />
            </li>

            {/* Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                    <MenuIcon className="w-4 h-4" />
                    Todas as categorias
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-[1000px] bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden">
                      <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Todas as Categorias
                        </h3>
                        <p className="text-sm text-gray-600">
                          Explore a ampla variedade do nosso catálogo
                        </p>
                      </div>
                      <div className="px-6 py-4 max-h-[500px] overflow-y-auto grid grid-cols-5 gap-4">
                        {groupedItems.map((column, i) => (
                          <div key={i} className="space-y-1">
                            {column.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className="w-full cursor-pointer text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md flex items-center gap-2"
                              >
                                {item.type === 'promotion' && (
                                  <CustomDiamondIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                                )}
                                {item.type === 'highlight' && (
                                  <CustomStarIcon className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                )}
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>
      </div>
    </nav>
  )
}
