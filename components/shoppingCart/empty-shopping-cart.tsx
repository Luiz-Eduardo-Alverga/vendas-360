import { ShoppingBag } from 'lucide-react'

export function EmptyShoppingCart() {
  return (
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
    </div>
  )
}
