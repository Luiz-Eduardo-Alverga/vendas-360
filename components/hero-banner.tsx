'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getTenant } from '@/services/tenant/get-tenant'
import { useQuery } from '@tanstack/react-query'

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const { data: tenant } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant,
    retry: 1,
  })

  const images = tenant?.banner

  const nextSlide = () => {
    if (!tenant?.banner || tenant.banner.length === 0) return
    setCurrentSlide((prev) => (prev + 1) % tenant.banner.length)
  }

  const prevSlide = () => {
    if (!tenant?.banner || tenant.banner.length === 0) return
    setCurrentSlide(
      (prev) => (prev - 1 + tenant.banner.length) % tenant.banner.length,
    )
  }

  return (
    <div className="relative h-84 overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full">
        {images &&
          images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.imagePath}
                alt={image.id}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 h-16 top-1/2 transform -translate-y-1/2 text-white hover:bg-slate-500/50 hover:text-white z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="!w-6 !h-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute h-16 right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-slate-500/50 hover:text-white z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="!w-6 !h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images &&
          images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
      </div>
    </div>
  )
}
