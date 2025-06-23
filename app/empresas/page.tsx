'use client'

import { Building2, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { getUserData } from '@/utils/get-user-companies'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { loginTenant } from '@/services/auth/login'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

import { useState } from 'react'
import { removeDataFromLocalstorage } from '@/utils/remove-data-from-localstore'

interface LoginTenantParams {
  companyId: string
  tenantId: string
}

export default function CompanyList() {
  const { refreshTokenManually } = useAuth()
  const userCompanies = getUserData()
  const router = useRouter()
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  )

  const { mutateAsync: handleLoginTenant } = useMutation({
    mutationFn: loginTenant,
  })

  const handleLogout = () => {
    removeDataFromLocalstorage()
    router.push('/login')
  }

  if (!userCompanies || userCompanies.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Dados das empresas não encontrados. Faça login novamente.</p>
      </div>
    )
  }

  async function handleCompanySelect({
    companyId,
    tenantId,
  }: LoginTenantParams) {
    try {
      setSelectedCompanyId(companyId)
      await handleLoginTenant({ companyId, tenantId })

      // Atualiza o AuthContext com o novo token após login
      refreshTokenManually()

      toast.success('Login realizado com sucesso', { position: 'top-right' })

      // Só depois do contexto estar atualizado, faz o redirect
      router.push('/')

      setTimeout(() => {
        removeDataFromLocalstorage()
      }, 1000)
    } catch (error) {
      console.log(error)
    } finally {
      setSelectedCompanyId(null)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 25%, #d4d4d8 50%, #a1a1aa 75%, #71717a 100%)`,
      }}
    >
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Circles */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-zinc-400 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-zinc-400 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-16 h-16 border border-zinc-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-zinc-400 rounded-full"></div>

        {/* Diamonds/Squares */}
        <div className="absolute top-32 left-1/3 w-12 h-12 border-2 border-zinc-400 transform rotate-45"></div>
        <div className="absolute top-60 right-1/4 w-8 h-8 border border-zinc-400 transform rotate-45"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-zinc-400 transform rotate-45"></div>

        {/* Triangles */}
        <div className="absolute top-1/4 right-1/3 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-zinc-400"></div>
        <div className="absolute bottom-1/3 right-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-zinc-400"></div>

        {/* Lines and dots */}
        <div className="absolute top-1/2 left-10 w-20 h-0.5 bg-zinc-400 transform -rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-16 h-0.5 bg-zinc-400 transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-zinc-400 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-zinc-400 rounded-full"></div>
        <div className="absolute bottom-1/2 right-1/4 w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-2xl">
          <CardContent className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731339139265x190794429300539900/Logo.svg"
                alt="Vendamais CRM"
                width={200}
                height={60}
                className="h-16 w-auto"
              />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Lista de Empresas
              </h1>
              <p className="text-gray-600">
                Selecione a empresa que deseja fazer seu orçamento!
              </p>
            </div>

            {/* Company List */}
            <div className="space-y-3 mb-8">
              {userCompanies.map((company, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleCompanySelect({
                      companyId: company.companyId,
                      tenantId: company.tenantId,
                    })
                  }
                  className="w-full  cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between group border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {company.companyName}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {company.companyRegistrationNumber}
                      </p>
                    </div>
                  </div>
                  {selectedCompanyId === company.companyId ? (
                    <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                </button>
              ))}
            </div>

            {/* Logout Link */}
            <div className="text-center mb-6">
              <p className="text-gray-600 text-sm">
                Deseja finalizar a sessão?{' '}
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="text-blue-600 cursor-pointer hover:text-blue-800 p-0 h-auto font-normal text-sm"
                >
                  Sair
                </Button>
              </p>
            </div>

            {/* Softcom Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="https://f0825a340b0fd345e11497cfc522f351.cdn.bubble.io/f1688050436247x440073117384497400/Group%2062%20%281%29.svg"
                alt="Softcom"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-500 text-center">
              vendamais © 2023 - Todos os direitos reservados.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
