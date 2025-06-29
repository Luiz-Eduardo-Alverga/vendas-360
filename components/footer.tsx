'use client'

import { Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getTenant } from '@/services/tenant/get-tenant'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { Skeleton } from './ui/skeleton'
import { useAuth } from '@/context/AuthContext'

export default function Footer() {
  const { accessToken, isAuthLoading } = useAuth()

  const { data: tenant, isLoading } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  return (
    <footer className="bg-white pt-4 pb-2 mb-2">
      <div className="">
        <div className="max-w-[1250px] mx-auto flex justify-between gap-2  items-start">
          <Image
            className="md:justify-start"
            src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731339139265x190794429300539900/Logo.svg"
            alt=""
            width={170}
            height={170}
          />

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2">
              {!isLoading ? (
                <>
                  <Image
                    alt=""
                    src={normalizeImageUrl(tenant?.logoPath)}
                    width={50}
                    height={50}
                  />
                  <h3 className="font-semibold  mb-2">{tenant?.name}</h3>
                </>
              ) : (
                <>
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="w-24 h-4" />
                </>
              )}
            </div>
            <p className="text-xs mt-1 text-gray-600 leading-relaxed max-w-72">
              {tenant?.about}
            </p>
          </div>

          <div className="">
            <h4 className="font-semibold text-gray-800 mb-3">Contato</h4>

            <div className="space-y-2 mb-4">
              <div className="flex items-center   gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>
                  Email:{' '}
                  {!isLoading ? (
                    tenant?.email || 'Não informado'
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </span>
              </div>
              <div className="flex items-center   gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>
                  Telefone:{' '}
                  {!isLoading ? (
                    tenant?.phone || 'Não informado'
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              {tenant?.phone && (
                <Image
                  src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951284300x917897448992400400/SocialNetworkWhatsApp.svg"
                  alt=""
                  width={35}
                  height={35}
                />
              )}

              {tenant?.facebook && (
                <Image
                  src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951293630x574864645161473150/SocialNetworkFacebook.svg"
                  alt=""
                  width={35}
                  height={35}
                />
              )}

              {tenant?.instagram && (
                <Image
                  src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951301062x486545458977823740/SocialNetworkInstagram.svg"
                  alt=""
                  width={35}
                  height={35}
                />
              )}

              {tenant?.website && (
                <Image
                  src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1739455682992x250675108944925950/socialBrandSite%201.svg"
                  alt=""
                  width={35}
                  height={35}
                />
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <Image
              src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731339986363x843537221595801200/Group%20318.svg"
              alt=""
              width={170}
              height={170}
            />

            <Image
              src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731340023576x796584276905212300/image%20%281%29.svg"
              alt=""
              width={170}
              height={170}
            />
          </div>
        </div>

        <Separator />
        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Vendas360. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
