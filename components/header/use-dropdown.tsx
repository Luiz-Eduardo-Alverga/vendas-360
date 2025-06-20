import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { User, Settings, LogOut, HelpCircle, ListOrdered } from "lucide-react"


export function UserDropDown () {
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
            <p className="text-sm font-medium leading-none">Antonio</p>
            <p className="text-xs leading-none text-muted-foreground">antonio.wac@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ListOrdered className="mr-2 h-4 w-4" />
          <span>Histórico de Pedidos</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}