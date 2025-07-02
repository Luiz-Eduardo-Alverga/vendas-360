'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { ChevronRight, Trash2, Loader2 } from 'lucide-react'
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
} from '@/components/ui/alert-dialog'

interface Props {
  totalAmount: number
  onClearCart: () => Promise<void>
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
  const [isLoading, setIsLoading] = useState(false)

  const handleClearCart = async () => {
    setIsLoading(true)
    try {
      await onClearCart()
      toast.success('Orçamento apagado com sucesso!', {
        position: 'top-right',
      })
      setIsDialogOpen(false)
    } catch (error) {
      toast.error('Erro ao apagar o orçamento.', {
        position: 'top-right',
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleClearCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Confirmar'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
