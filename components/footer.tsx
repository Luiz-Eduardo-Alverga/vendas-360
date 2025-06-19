import { Phone, Mail, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Separator } from "./ui/separator"

export default function Footer() {
  return (
    <footer className="bg-white pt-4 pb-2 mb-2">
      <div className="">
        <div className="max-w-[1250px] mx-auto flex justify-between gap-2  items-start">
          {/* Logo Section */}          
            <Image
              className="md:justify-start"
              src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1731339139265x190794429300539900/Logo.svg"
              alt=""
              width={170}
              height={170}
            />
          

          {/* Company Info Section */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Companhia da Terra Distribuidora</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-72">
              Somos uma empresa especializada em alimentos naturais, fitness e zero açúcar, oferecendo produtos de alta
              qualidade para um estilo de vida saudável.
            </p>
          </div>

          {/* Contact Section */}
          <div className="">
            <h4 className="font-semibold text-gray-800 mb-3">Contato</h4>

            <div className="space-y-2 mb-4">
              <div className="flex items-center   gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>contato@casadaterra.com.br</span>
              </div>
              <div className="flex items-center   gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>Telefone: (81) 9981 2-0722</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-4">
              <Image 
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951284300x917897448992400400/SocialNetworkWhatsApp.svg"
                alt=""
                width={35}
                height={35}

              />
              <Image 
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951293630x574864645161473150/SocialNetworkFacebook.svg"
                alt=""
                width={35}
                height={35}

              />
              <Image 
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1738951301062x486545458977823740/SocialNetworkInstagram.svg"
                alt=""
                width={35}
                height={35}

              />
              <Image 
                src="https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1739455682992x250675108944925950/socialBrandSite%201.svg"
                alt=""
                width={35}
                height={35}

              />
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
          <p className="text-sm text-gray-600">© 2024 Vendas360. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
