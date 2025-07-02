import { Button } from '@/components/ui/button'
import { ChevronRight, Trash2 } from 'lucide-react'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

interface Props {
  totalAmount: number
  onClearCart: () => void
  isDisabled: boolean
  isDialogOpen: boolean
  setIsDialogOpen: (v: boolean) => void
}

export function ShoppingCartFooter({
  totalAmount,
  onClearCart,
  isDisabled,
  isDialogOpen,
  setIsDialogOpen,
}: Props) {
  return (
    <div className="border-t p-4 space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Valor Total:</span>
        <span className="text-xl font-bold">
          {formatCurrencyBRL(totalAmount)}
        </span>
      </div>

      <Button
        className="w-full p-8 bg-gray-800 hover:bg-gray-900 text-white"
        disabled={isDisabled}
      >
        <span>Concluir orçamento</span>
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-8 border text-red-500 hover:text-red-700 hover:bg-red-50"
            disabled={isDisabled}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Apagar orçamento
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja apagar todos os itens?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá remover todos os itens do carrinho. Deseja
              continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={onClearCart}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
