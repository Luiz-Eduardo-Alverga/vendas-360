'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/categories/get-categories'
import { getPromotions } from '@/services/promotions/get-promotions'
import { getHighlights } from '@/services/highlights/get-highlights'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomStarIcon } from './icon/custor-star-icon'
import { CustomDiamondIcon } from './icon/custom-diamond-icon'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { slugify } from '@/utils/slugify'
import { isHighlightActive } from '@/utils/highlights/is-highlights-active'
import { isPromotionActive } from '@/utils/promotion/is-promotion-active'

export function Navigation() {
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
  })

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
  })

  const { data: highlights, isLoading: isLoadingHighlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
  })

  const [hasOverflow, setHasOverflow] = useState(false)

  const checkScrollOverflow = () => {
    const container = scrollRef.current
    if (!container) return
    setHasOverflow(container.scrollWidth > container.clientWidth)
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    checkScrollOverflow()

    const resizeObserver = new ResizeObserver(() => checkScrollOverflow())
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [])

  const activePromotions = promotions?.filter(isPromotionActive)
  const activeHighlights = highlights?.filter(isHighlightActive)

  const isAnyLoading =
    isLoadingCategories || isLoadingPromotions || isLoadingHighlights

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const checkScroll = () => {
    const container = scrollRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    setShowLeft(scrollLeft > 0)
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1) // Pequena margem para evitar erro de arredondamento
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    checkScroll()

    const handleScroll = () => checkScroll()
    container.addEventListener('scroll', handleScroll)

    const resizeObserver = new ResizeObserver(() => checkScroll())
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollLeftStart.current = scrollRef.current?.scrollLeft ?? 0
  }

  const handleMouseLeave = () => {
    isDown.current = false
  }

  const handleMouseUp = () => {
    isDown.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="relative mx-auto max-w-[1150px]">
        {/* Seta esquerda */}
        {showLeft && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-md z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

        {/* Área scrollable */}
        <div
          ref={scrollRef}
          className="
            overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-hide
            cursor-grab active:cursor-grabbing select-none pr-16
          "
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <ul
            className={`
              flex items-center space-x-8
              ${hasOverflow ? '' : 'justify-center'}
            `}
          >
            {/* Skeleton */}
            {isAnyLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="py-0.5">
                  <Skeleton className="w-32 h-6 rounded-md" />
                </li>
              ))}

            {/* PROMOÇÕES */}
            {!isLoadingPromotions &&
              activePromotions?.map((promo) => (
                <li key={promo.id}>
                  <a
                    href={`#${slugify(promo.title)}`}
                    className="flex items-center space-x-2 text-sm font-medium hover:opacity-80 text-red-600"
                  >
                    <div className="p-0.5 rounded-full flex items-center justify-center bg-red-100">
                      <CustomDiamondIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <span>{promo.title}</span>
                  </a>
                </li>
              ))}

            {/* DESTAQUES */}

            {!isLoadingHighlights &&
              activeHighlights?.map((highlight) => (
                <li key={highlight.id}>
                  <a
                    href={`#${slugify(highlight.title)}`}
                    className="flex items-center space-x-2 text-sm font-medium hover:opacity-80 text-yellow-500"
                  >
                    <div className="p-0.5 rounded-full flex items-center justify-center bg-yellow-100">
                      <CustomStarIcon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <span>{highlight.title}</span>
                  </a>
                </li>
              ))}

            {/* CATEGORIAS */}
            {!isLoadingCategories &&
              categories?.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${slugify(category.description)}`}
                    className="flex items-center space-x-2 text-sm font-medium hover:opacity-80 text-gray-700"
                  >
                    <span>{category.description}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Seta direita */}
        {showRight && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-md z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </nav>
  )
}
