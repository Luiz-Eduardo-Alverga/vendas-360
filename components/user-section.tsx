import { getCustomer } from '@/services/customers/get-customer'
import { useQuery } from '@tanstack/react-query'
import { Heart, Package, MapPin } from 'lucide-react'

import { Skeleton } from './ui/skeleton'
import { ImageWithFallback } from './images/image-with-fallback'
import { getCustomerTotalOrders } from '@/services/orders/get-customer-total-oders'

export function UserSection() {
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
  })

  const { data: customerTotalOrders, isLoading: isLoadingCustomerTotalOrders } =
    useQuery({
      queryKey: ['customerTotalOrders'],
      queryFn: getCustomerTotalOrders,
    })

  return (
    <div className="bg-white py-4 mb-4">
      <div className="max-w-[1250px] mx-auto">
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
              <p className="text-sm text-gray-600">Bem-vindo(a) de volta,</p>
              {isLoading ? (
                <Skeleton className="w-32 h-4 mt-1" />
              ) : (
                <p className="font-semibold text-gray-900">
                  {customer?.user.email}
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

                {isLoadingCustomerTotalOrders ? (
                  <Skeleton className="w-48 h-2 mt-1" />
                ) : (
                  <p className="text-xs text-gray-600">
                    Você já realizou{' '}
                    <span className="font-semibold">
                      {customerTotalOrders?.length}
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
                        {mainAddress.addressNumber}{' '}
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
      </div>
    </div>
  )
}
