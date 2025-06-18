import { Heart, Package, MapPin } from 'lucide-react'
import Image from 'next/image'

export function UserSection() {
  return (
    <div className="bg-white py-4 mb-4">
      <div className="max-w-[1250px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Welcome Message */}
          <div className="flex items-center space-x-3">
            <Image
              src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738958025870x407176369407359800/user%20avatar%201.svg"
              width={40}
              height={40}
              alt=""
              className="cursor-pointer"
            />
            <div>
              <p className="text-sm text-gray-600">Bem-vindo(a) de volta,</p>
              <p className="font-semibold text-gray-900">
                antonio.wac@gmail.com
              </p>
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
                <p className="text-xs text-gray-600">
                  Você possui <span className="font-semibold">5</span>{' '}
                  produto(s) favorito(s)!
                </p>
              </div>
            </div>

            {/* Orders */}
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Minhas compras
                </p>
                <p className="text-xs text-gray-600">
                  Você já realizou <span className="font-semibold">4</span>{' '}
                  pedido(s) conosco!
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Entregar em:
                </p>
                <p className="text-xs text-gray-600">
                  Rua Brigadeiro Eduardo Gomes de Sá, s/nº
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
