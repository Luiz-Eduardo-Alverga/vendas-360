import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { LogOut, ListOrdered } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCustomer } from '@/services/customers/get-customer'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

export function UserDropDown() {
  const { data: customer } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
    retry: 1,
  })

  const { logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738958025870x407176369407359800/user%20avatar%201.svg"
          width={40}
          height={40}
          alt=""
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {customer?.entityName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {customer?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ListOrdered className="mr-2 h-4 w-4" />
          <span>Histórico de Pedidos</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout()
            toast.success('Logout realizado com sucesso', {
              position: 'top-right',
            })
          }}
        >
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
