import { ShoppingCartIcon, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Button } from '../ui/button'

export function ShoppingCart() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center space-x-4 border p-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="relative">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              0
            </span>
          </div>
          <span className="text-sm font-semibold">R$ 0,00</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="flex flex-row gap-2">
          <ShoppingCartIcon />
          <SheetTitle className="text-left">Seu Carrinho</SheetTitle>
        </SheetHeader>

        {/* Estado vazio do carrinho */}
        <div className="flex flex-col items-center justify-center h-full space-y-4 py-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Seu carrinho está vazio
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Adicione alguns produtos ao seu carrinho para continuar com o seu
              orçamento
            </p>
          </div>

          <SheetClose asChild>
            <Button className="mt-6 w-full max-w-xs">
              Continuar orçamento
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
