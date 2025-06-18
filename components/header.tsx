import { Search, Heart, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import Image from 'next/image'

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-20">
        <div className="flex items-center space-x-2">
          <Image
            src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/cdn-cgi/image/w=48,h=,f=auto,dpr=1,fit=contain/f1748021192623x855820831810456700/logo-png.png"
            alt=""
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-gray-900">
            Companhia da Terra
          </span>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Busque aqui o seu produto"
              className="w-full pl-4 pr-12 py-6 border border-gray-300 rounded-sm shadow-2xl"
            />
            <Button
              size="sm"
              className="absolute right-1 top-2 bottom-1 px-3 text-black"
              variant="link"
            >
              <Search className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 hover:cursor-pointer" />

          <div className="flex items-center space-x-4 border p-3 rounded-full cursor-pointer">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </div>
            <span className="text-sm font-semibold">R$ 0,00</span>
          </div>

          <Image
            src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738958025870x407176369407359800/user%20avatar%201.svg"
            width={40}
            height={40}
            alt=""
            className="cursor-pointer"
          />
        </div>
      </div>
    </header>
  )
}
