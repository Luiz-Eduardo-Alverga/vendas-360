'use client'

import { getCustomer } from '@/services/customers/get-customer'
import { useQuery } from '@tanstack/react-query'
import { Heart, Package, MapPin } from 'lucide-react'
import { Skeleton } from './ui/skeleton'
import { ImageWithFallback } from './images/image-with-fallback'
import { getCustomerTotalOrders } from '@/services/orders/get-customer-total-oders'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { AuthModal } from './header/auth-modal'

export function UserSection() {
  const { accessToken, isAuthLoading } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: customerTotalOrders, isLoading: isCustomerTotalOrdersLoading } =
    useQuery({
      queryKey: ['customerTotalOrders'],
      queryFn: getCustomerTotalOrders,
      enabled: !!accessToken,
      retry: 1,
    })

  const isLoading = isAuthLoading || isCustomerLoading

  // Caso não venha customer (ex: usuário não cadastrado ainda)
  const noCustomerData = !isLoading && !customer

  return (
    <>
      <div className="bg-white py-4 mb-4">
        <div className="max-w-[1250px] mx-auto">
          {noCustomerData ? (
            <div className="flex justify-center items-center gap-4">
              {/* Icone de usuário */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0H4.5z"
                  />
                </svg>
              </div>

              {/* Texto */}
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Olá!</span> Acesse seu cadastro
                para visualizar os preços dos produtos.{' '}
                <span
                  onClick={() => setIsAuthModalOpen(true)}
                  className="font-semibold underline cursor-pointer hover:text-blue-600"
                >
                  Quero acessar agora!
                </span>
                , ainda não tem cadastro?{' '}
                <span className="font-semibold underline cursor-pointer hover:text-blue-600">
                  Quero solicitar meu acesso!
                </span>
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* Welcome Message */}
              <div className="flex items-center space-x-3">
                {isLoading ? (
                  <Skeleton className="w-10 h-10 rounded-full" />
                ) : (
                  <ImageWithFallback
                    src={customer?.user.avatarPath}
                    width={40}
                    height={40}
                    alt=""
                    className="cursor-pointer"
                  />
                )}
                <div>
                  <p className="text-sm text-gray-600">
                    Bem-vindo(a) de volta,
                  </p>
                  {isLoading ? (
                    <Skeleton className="w-32 h-4 mt-1" />
                  ) : (
                    <p className="font-semibold text-gray-900">
                      {customer?.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-18">
                {/* Favorites */}
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Meus Favoritos
                    </p>
                    {isLoading ? (
                      <Skeleton className="w-48 h-2 mt-1" />
                    ) : (
                      <p className="text-xs text-gray-600">
                        Você possui{' '}
                        <span className="font-semibold">
                          {customer?.favoritesProducts.length}
                        </span>{' '}
                        produto(s) favorito(s)!
                      </p>
                    )}
                  </div>
                </div>

                {/* Orders */}
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Minhas compras
                    </p>
                    {isLoading || isCustomerTotalOrdersLoading ? (
                      <Skeleton className="w-48 h-2 mt-1" />
                    ) : (
                      <p className="text-xs text-gray-600">
                        Você já realizou{' '}
                        <span className="font-semibold">
                          {customerTotalOrders?.length ?? 0}
                        </span>{' '}
                        pedido(s) conosco!
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Entregar em:
                    </p>
                    {isLoading ? (
                      <Skeleton className="w-48 h-2 mt-1" />
                    ) : (
                      (() => {
                        const mainAddress = customer?.addresses.find(
                          (address) => address.isMainAddress,
                        )

                        return mainAddress ? (
                          <p className="text-xs text-gray-600">
                            {mainAddress.addressStreet},{' '}
                            {mainAddress.addressNumber}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-600">
                            Endereço principal não cadastrado
                          </p>
                        )
                      })()
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Login */}
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  )
}
