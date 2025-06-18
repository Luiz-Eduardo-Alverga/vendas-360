import { useState } from 'react'

export function ProductQuantity({
  productId,
  quantity,
  onQuantityChange,
}: {
  productId: number
  quantity: number
  onQuantityChange: (productId: number, newQty: number) => void
}) {
  const [editingProductId, setEditingProductId] = useState<number | null>(null)

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value))
    onQuantityChange(productId, value)
    setEditingProductId(null)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = Math.max(1, Number((e.target as HTMLInputElement).value))
      onQuantityChange(productId, value)
      setEditingProductId(null)
    }
  }

  return (
    <div className="flex h-full gap-4 p-2 border rounded-sm items-center flex-shrink-0">
      {/* Botão - */}
      <span
        onClick={() => onQuantityChange(productId, quantity - 1)}
        className="cursor-pointer select-none"
      >
        -
      </span>

      {/* Quantidade (modo texto ou input) */}
      {editingProductId === productId ? (
        <input
          type="number"
          min={1}
          autoFocus
          defaultValue={quantity}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          inputMode="numeric"
          className="
            w-[30px]
            text-center
            bg-transparent
            border-none
            focus:outline-none
            appearance-none
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />
      ) : (
        <span
          onClick={() => setEditingProductId(productId)}
          className="cursor-pointer select-none w-[30px] text-center inline-block"
        >
          {quantity}
        </span>
      )}

      {/* Botão + */}
      <span
        onClick={() => onQuantityChange(productId, quantity + 1)}
        className="cursor-pointer select-none"
      >
        +
      </span>
    </div>
  )
}
