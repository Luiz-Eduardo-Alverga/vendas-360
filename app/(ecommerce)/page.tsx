'use client'

import { Navigation } from '@/components/navigation'
import { HeroBanner } from '@/components/hero-banner'
import { UserSection } from '@/components/user-section'
import { ProductSection } from '@/components/products/product-section'
import Footer from '@/components/footer'
import Cookies from 'js-cookie'
import { Header } from '@/components/header'

export default function HomePage() {
  const accessToken = Cookies.get('accessToken')
  console.log('token', accessToken)

  return (
    <div className="min-h-screen bg-zinc-100">
      <Header />

      <main className="pt-20">
        <Navigation />
        <HeroBanner />
        <UserSection />
        <ProductSection />
      </main>

      <Footer />
    </div>
  )
}
