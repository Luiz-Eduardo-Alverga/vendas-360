# Script para criar o projeto Companhia da Terra E-commerce
# Execute com: bash setup-project.sh

echo "🚀 Iniciando setup do projeto Companhia da Terra E-commerce..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

# Nome do projeto
PROJECT_NAME="companhia-terra-ecommerce"

echo "📦 Criando projeto Next.js..."
npx create-next-app@latest $PROJECT_NAME --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Entrar no diretório do projeto
cd $PROJECT_NAME

echo "📚 Instalando dependências adicionais..."
npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-card @radix-ui/react-dropdown-menu @radix-ui/react-input @radix-ui/react-slot lucide-react class-variance-authority clsx tailwind-merge

echo "🎨 Instalando shadcn/ui..."
npx shadcn@latest init -d

echo "🔧 Instalando componentes shadcn/ui..."
npx shadcn@latest add button card input avatar

echo "📁 Criando estrutura de pastas..."
mkdir -p components
mkdir -p public/images

echo "📝 Criando arquivos do projeto..."

# Criar app/page.tsx
cat > app/page.tsx << 'EOF'
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { HeroBanner } from "@/components/hero-banner"
import { UserSection } from "@/components/user-section"
import { ProductSection } from "@/components/product-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <HeroBanner />
      <UserSection />
      <ProductSection />
    </div>
  )
}
EOF

# Criar components/header.tsx
cat > components/header.tsx << 'EOF'
import { Search, Heart, ShoppingCart, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-900">Companhia da Terra</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Busque aqui o seu produto"
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600"
              variant="ghost"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <Heart className="w-5 h-5 text-gray-600" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </div>
            <span className="text-sm font-semibold">R$ 0,00</span>
          </div>

          <Avatar className="w-8 h-8 bg-blue-600">
            <AvatarFallback className="bg-blue-600 text-white text-sm">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
EOF

# Criar components/navigation.tsx
cat > components/navigation.tsx << 'EOF'
import { Tag, Star } from 'lucide-react'

export function Navigation() {
  const categories = [
    { name: "Promoção de Cereais", icon: Tag, color: "text-red-600" },
    { name: "teste", icon: Tag, color: "text-red-600" },
    { name: "Destaques", icon: Star, color: "text-yellow-500" },
    { name: "Snacks e Bebidas Saudáveis", color: "text-gray-700" },
    { name: "Cereais e Nutrição", color: "text-gray-700" },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center space-x-8">
          {categories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center space-x-1 text-sm font-medium hover:opacity-80 ${category.color}`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                <span>{category.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
EOF

# Criar components/hero-banner.tsx
cat > components/hero-banner.tsx << 'EOF'
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: "/slide01.png",
      alt: "Promoção Kits Especiais - 50% OFF",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=400&width=1200",
      alt: "Slide 2 - Produtos Naturais",
      content: {
        leftTitle: "extrato",
        leftSubtitle: "verde",
        leftDescription: "PRODUTOS NATURAIS",
        centerTitle: "COMPRE SEU SUPLEMENTO COM ATÉ",
        discount: "50",
        rightTitle: "KITS",
        rightSubtitle: "especiais",
      },
    },
    {
      id: 3,
      image: "/placeholder.svg?height=400&width=1200",
      alt: "Slide 3 - Ofertas Especiais",
      content: {
        leftTitle: "super",
        leftSubtitle: "ofertas",
        leftDescription: "PRODUTOS SELECIONADOS",
        centerTitle: "DESCONTOS DE ATÉ",
        discount: "40",
        rightTitle: "COMBO",
        rightSubtitle: "premium",
      },
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-96 overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.image === "/slide01.png" ? (
              <div className="relative h-full w-full">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ) : (
              <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-green-500">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                  <div className="absolute bottom-10 right-20 w-20 h-20 border-2 border-white rounded-full"></div>
                </div>

                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-white">
                        <div className="mb-4">
                          <span className="text-2xl font-bold">{slide.content?.leftTitle}</span>
                          <br />
                          <span className="text-4xl font-bold text-green-300">{slide.content?.leftSubtitle}</span>
                          <br />
                          <span className="text-sm">{slide.content?.leftDescription}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-center">
                      <div className="text-white">
                        <h2 className="text-2xl font-bold mb-2">{slide.content?.centerTitle}</h2>
                        <div className="flex items-center justify-center mb-4">
                          <span className="text-6xl font-bold">{slide.content?.discount}</span>
                          <div className="ml-2">
                            <span className="text-2xl">%</span>
                            <br />
                            <span className="text-xl font-bold">OFF</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 text-right">
                      <div className="text-white">
                        <h3 className="text-6xl font-bold mb-2">{slide.content?.rightTitle}</h3>
                        <p className="text-3xl font-script">{slide.content?.rightSubtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
EOF

# Criar components/user-section.tsx
cat > components/user-section.tsx << 'EOF'
import { Heart, Package, MapPin, User } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function UserSection() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12 bg-blue-600">
              <AvatarFallback className="bg-blue-600 text-white">
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-600">Bem-vindo(a) de volta,</p>
              <p className="font-semibold text-gray-900">antonio.wac@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Meus Favoritos</p>
                <p className="text-xs text-gray-600">
                  Você possui <span className="font-semibold">5</span> produto(s) favorito(s)!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Minhas compras</p>
                <p className="text-xs text-gray-600">
                  Você já realizou <span className="font-semibold">4</span> pedido(s) conosco!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Entregar em:</p>
                <p className="text-xs text-gray-600">Rua Brigadeiro Eduardo Gomes de Sá, s/nº</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# Criar components/product-section.tsx
cat > components/product-section.tsx << 'EOF'
"use client"

import { useState } from "react"
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function ProductSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const products = [
    {
      id: 1,
      name: "Produto 1",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-3.35% OFF",
      originalPrice: "R$ 29,90",
      price: "R$ 28,90",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Semente de Linhaça Dourada",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-3.85% OFF",
      originalPrice: "R$ 25,90",
      price: "R$ 24,90",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Semente de Linhaça Dourada Verde",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-3.85% OFF",
      originalPrice: "R$ 25,90",
      price: "R$ 24,90",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Granola Sabores do Campo",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-13.19% OFF",
      originalPrice: "R$ 22,90",
      price: "R$ 19,90",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Pasta de Amendoim Integral",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-16.72% OFF",
      originalPrice: "R$ 35,90",
      price: "R$ 29,90",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Aveia em Flocos Finos",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-8.50% OFF",
      originalPrice: "R$ 18,90",
      price: "R$ 17,30",
      isFavorite: true,
    },
    {
      id: 7,
      name: "Quinoa Real Branca",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-12.20% OFF",
      originalPrice: "R$ 32,90",
      price: "R$ 28,90",
      isFavorite: false,
    },
    {
      id: 8,
      name: "Chia Premium",
      image: "/placeholder.svg?height=200&width=200",
      discount: "-15.00% OFF",
      originalPrice: "R$ 24,90",
      price: "R$ 21,17",
      isFavorite: false,
    },
  ]

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const toggleFavorite = (productId: number) => {
    console.log(`Toggle favorite for product ${productId}`)
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Promoção de Cereais</h2>
          </div>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            Ver tudo
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length / itemsPerView) * 100}%`,
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0" style={{ width: `${100 / products.length}%` }}>
                  <Card className="group hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-4">
                      <div className="relative mb-3">
                        <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                          {product.discount}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`absolute top-0 right-0 p-1 z-10 hover:bg-white/80 ${
                            product.isFavorite ? "text-red-500" : "text-gray-400"
                          }`}
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart className={`w-4 h-4 ${product.isFavorite ? "fill-current" : ""}`} />
                        </Button>
                      </div>

                      <div className="aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 line-through">{product.originalPrice}</p>
                          <p className="text-lg font-bold text-green-600">{product.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-md hover:shadow-lg z-10 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-md hover:shadow-lg z-10 ${
              currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

echo "🖼️ Baixando imagem do banner..."
curl -o public/slide01.png "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io%2Ff1730828099540x148056714575752760%2Fslide01.png?w=&auto=compress,&dpr=2&fit=max"

echo "🎯 Atualizando configurações do Tailwind..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        script: ['cursive'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
EOF

echo "🚀 Instalando dependências finais..."
npm install

echo "✅ Setup concluído com sucesso!"
echo ""
echo "🎉 Projeto criado em: $PROJECT_NAME"
echo ""
echo "Para iniciar o projeto:"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
echo ""
echo "🌐 O projeto estará disponível em: http://localhost:3000"
EOF
