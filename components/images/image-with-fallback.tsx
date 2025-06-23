'use client'

import Image, { ImageProps, StaticImageData } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData | null | undefined
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  fallbackSrc = '/placeholder.png', // Imagem fallback local na pasta /public
  ...rest
}: ImageWithFallbackProps) {
  const safeSrc: string | StaticImageData =
    src && typeof src === 'string' && src.trim() !== '' ? src : fallbackSrc

  return <Image src={safeSrc} {...rest} alt="" />
}
