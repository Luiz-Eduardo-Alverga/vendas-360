import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { LogOutIcon, ShoppingBagIcon, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '@/services/customers/get-customer'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { useRef, useState } from 'react'
import { getCustomerTotalOrders } from '@/services/orders/get-customer-total-oders'

const menuItems = [
  {
    icon: ShoppingBagIcon,
    label: 'Meus Pedidos',
    description: 'Acompanhe seus pedidos',
    onClick: () => console.log('Navigate to orders'),
  },
  // {
  //   icon: MapPinIcon,
  //   label: 'Endereços',
  //   description: 'Gerencie seus endereços',
  //   onClick: () => console.log('Navigate to addresses'),
  // },
]

export function UserDropDown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { accessToken, isAuthLoading, logout } = useAuth()

  const { data: customer } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: customerTotalOrders } = useQuery({
    queryKey: ['customerTotalOrders'],
    queryFn: () => getCustomerTotalOrders(),
    enabled: !!accessToken && !isAuthLoading,
    retry: 1,
  })

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Image
          src={
            customer?.user.avatarPath
              ? normalizeImageUrl(
                  'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738958025870x407176369407359800/user%20avatar%201.svg',
                )
              : normalizeImageUrl(customer?.user.avatarPath)
          }
          alt={customer?.user.userName || 'avatar'}
          width={40}
          height={40}
          className="cursor-pointer rounded-full overflow-hidden hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild className="p-0" align="end" forceMount>
        <div
          ref={dropdownRef}
          className="absolute  right-0 top-full mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-[400] animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="p-0">
              {/* User Profile Section */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 ring-2 ring-white shadow-md">
                      <AvatarImage
                        src={customer?.user.avatarPath}
                        alt={customer?.user.userName}
                      />
                      <AvatarFallback className="bg-blue-500 text-white text-lg font-semibold">
                        {customer?.user.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {customer?.user.userName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {customer?.user.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 hover:bg-white/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {customerTotalOrders?.length ?? 0}
                    </div>
                    <div className="text-xs text-gray-600">
                      Pedidos realizados
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {customer?.favoritesProducts.length}
                    </div>
                    <div className="text-xs text-gray-600">
                      Produtos favoritos
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    key={index}
                    href="/usuario"
                  >
                    <button
                      onClick={item.onClick}
                      className="w-full cursor-pointer flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  </Link>
                ))}
              </div>

              <Separator className="my-2" />

              {/* Logout Button */}
              <div className="p-2">
                <button
                  onClick={() => {
                    logout()
                    toast.success('Logout realizado com sucesso', {
                      position: 'top-right',
                    })
                  }}
                  className="cursor-pointer w-full flex items-center gap-4 p-3 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600 hover:text-red-700"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <LogOutIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Sair</div>
                    <div className="text-xs text-red-500">
                      Desconectar da conta
                    </div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
