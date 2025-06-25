import { Navigation } from '@/components/navigation'
import { HeroBanner } from '@/components/hero-banner'
import { UserSection } from '@/components/user-section'
import { ProductSection } from '@/components/products/product-section'
import Footer from '@/components/footer'
import { Header } from '@/components/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B E-commerce APP',
}

export default function HomePage() {
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
