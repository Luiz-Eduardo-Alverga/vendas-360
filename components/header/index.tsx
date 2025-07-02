'use client'

import { HeartIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserDropDown } from './user-dropdown'
import { ShoppingCartSheet } from '../shoppingCart/shopping-cart'
import { useQuery } from '@tanstack/react-query'
import { getTenant } from '@/services/tenant/get-tenant'
import { ImageWithFallback } from '../images/image-with-fallback'
import { Skeleton } from '../ui/skeleton'
import { useRef, useState } from 'react'
import { AuthModal } from './auth-modal'
import { useAuth } from '@/context/AuthContext'
import { SearchModal } from '../searchProducts/search-modal'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { FavoritesDropdown } from '../favorites/favorites-dropdonw'

export function Header() {
  const favoritesRef = useRef<HTMLButtonElement>(null)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { accessToken, isAuthLoading } = useAuth()
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  useKeyboardShortcut('k', () => setIsSearchModalOpen(true), { ctrl: true })

  const handleFavoritesToggle = () => {
    setIsFavoritesOpen(!isFavoritesOpen)
  }

  const { data: tenant, isLoading } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  return (
    <TooltipProvider>
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-20">
          <Link href="/" className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton className="rounded-full w-10 h-10 bg-zinc-200" />
            ) : tenant?.logoPath ? (
              <ImageWithFallback
                src={tenant.logoPath}
                alt="Logo da empresa"
                width={40}
                height={40}
              />
            ) : (
              <ImageWithFallback
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731339139265x190794429300539900/Logo.svg"
                alt="Logo padrão"
                width={160}
                height={40}
              />
            )}

            {isLoading ? (
              <Skeleton className="w-42 h-4 bg-zinc-200"></Skeleton>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {tenant?.name}
              </span>
            )}
          </Link>

          {/* <SearchProducts /> */}

          <div className="flex items-center gap-6 relative flex-1 min-w-0 max-w-2xl">
            {/* Search Bar - Desktop */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex w-full items-center gap-4 px-4 py-2.5 relative bg-[#f8f9fa] hover:bg-[#f1f3f4] transition-colors duration-200 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-300 group"
            >
              <SearchIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-500 transition-colors duration-200 flex-shrink-0" />
              <div className="relative flex-1 font-normal text-gray-600 text-sm text-left">
                Busque aqui o seu produto
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded border">
                  ⌘K
                </div>
              </div>
            </button>
          </div>

          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
          />

          {isAuthLoading ? (
            <Skeleton className="h-4 w-54" />
          ) : accessToken ? (
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      ref={favoritesRef}
                      variant="ghost"
                      size="icon"
                      onClick={handleFavoritesToggle}
                      className="w-10 h-10 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 rounded-full"
                    >
                      <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Meus Favoritos</p>
                  </TooltipContent>
                </Tooltip>

                <FavoritesDropdown
                  isOpen={isFavoritesOpen}
                  onClose={() => setIsFavoritesOpen(false)}
                  triggerRef={
                    favoritesRef as React.RefObject<HTMLButtonElement>
                  }
                />
              </div>
              <ShoppingCartSheet />
              <UserDropDown />
            </div>
          ) : (
            <Button
              className="p-5 cursor-pointer"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Acessar
            </Button>
          )}
        </div>
      </header>

      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </TooltipProvider>
  )
}
