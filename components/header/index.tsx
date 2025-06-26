'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserDropDown } from './use-dropdown'
import { ShoppingCartSheet } from '../shoppingCart/shopping-cart'
import { useQuery } from '@tanstack/react-query'
import { getTenant } from '@/services/tenant/get-tenant'
import { ImageWithFallback } from '../images/image-with-fallback'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { AuthModal } from './auth-modal'
import { useAuth } from '@/context/AuthContext'
import { SearchProducts } from '../searchProducts'

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { accessToken, isAuthLoading } = useAuth()

  const { data: tenant, isLoading } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant,
    retry: 1,
  })

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-20">
          <div className="flex items-center space-x-2">
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
          </div>

          <SearchProducts />

          {isLoading || isAuthLoading ? (
            <Skeleton className="h-4 w-54" />
          ) : accessToken ? (
            <div className="flex items-center space-x-6">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 hover:cursor-pointer" />
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
    </>
  )
}
