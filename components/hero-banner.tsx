'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image:
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io%2Ff1730828061383x379431951466084860%2Fslide03.png?w=&auto=compress,&dpr=2&fit=max',
      alt: 'Banner promocional 1',
    },
    {
      id: 2,
      image:
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io%2Ff1730828061383x379431951466084860%2Fslide03.png?w=&auto=compress,&dpr=2&fit=max',
      alt: 'Banner promocional 2',
    },
    {
      id: 3,
      image:
        'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io%2Ff1730828061383x379431951466084860%2Fslide03.png?w=&auto=compress,&dpr=2&fit=max',
      alt: 'Banner promocional 3',
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-84 overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
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
        {slides.map((_, index) => (
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
