import { CustomStarIcon } from './custor-star-icon'
import { CustomDiamondIcon } from './custom-diamond-icon'

export function Navigation() {
  const categories = [
    {
      name: 'Promoção de Cereais',
      icon: CustomDiamondIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100', // 🔴 Fundo vermelho claro
    },
    {
      name: 'teste',
      icon: CustomDiamondIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100', // 🔴 Também vermelho claro
    },
    {
      name: 'Destaques',
      icon: CustomStarIcon,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100', // 🟡 Fundo amarelo claro
    },
    {
      name: 'Snacks e Bebidas Saudáveis',
      color: 'text-gray-700',
    },
    {
      name: 'Cereais e Nutrição',
      color: 'text-gray-700',
    },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-4 flex">
      <div className="mx-auto">
        <ul className="flex items-center space-x-8">
          {categories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-2 text-sm font-medium hover:opacity-80 ${category.color}`}
              >
                {category.icon && (
                  <div
                    className={`p-0.5 rounded-full flex items-center justify-center ${category.bgColor}`}
                  >
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                )}
                <span>{category.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
