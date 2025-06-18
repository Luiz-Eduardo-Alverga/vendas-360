# 🚀 Setup Automático - Companhia da Terra E-commerce

Este script automatiza completamente a criação do projeto Next.js com todos os componentes e configurações necessárias.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git (opcional)

## 🛠️ Como usar

### Linux/macOS:
\`\`\`bash
# Baixar o script
curl -O https://raw.githubusercontent.com/seu-repo/setup-project.sh

# Dar permissão de execução
chmod +x setup-project.sh

# Executar
./setup-project.sh
\`\`\`

### Windows:
\`\`\`cmd
# Baixar e executar o script .bat
setup-project-windows.bat
\`\`\`

### Alternativa - Execução direta:
\`\`\`bash
# Copie o conteúdo do script setup-project.sh
# Cole em um arquivo .sh
# Execute: bash setup-project.sh
\`\`\`

## 🎯 O que o script faz:

1. ✅ Cria projeto Next.js com TypeScript e Tailwind
2. ✅ Instala todas as dependências necessárias
3. ✅ Configura shadcn/ui
4. ✅ Cria todos os componentes (Header, Navigation, Banner, etc.)
5. ✅ Baixa a imagem do banner automaticamente
6. ✅ Configura Tailwind com classes customizadas
7. ✅ Estrutura completa de pastas

## 📁 Estrutura criada:

\`\`\`
companhia-terra-ecommerce/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── header.tsx
│   ├── navigation.tsx
│   ├── hero-banner.tsx
│   ├── user-section.tsx
│   └── product-section.tsx
├── public/
│   └── slide01.png
└── package.json
\`\`\`

## 🚀 Após a execução:

\`\`\`bash
cd companhia-terra-ecommerce
npm run dev
\`\`\`

Acesse: http://localhost:3000

## 🔧 Funcionalidades incluídas:

- ✅ Header com busca e carrinho
- ✅ Menu de navegação por categorias
- ✅ Banner carrossel funcional
- ✅ Seção do usuário personalizada
- ✅ Carrossel de produtos funcional
- ✅ Design responsivo
- ✅ Componentes shadcn/ui
- ✅ TypeScript configurado
- ✅ Tailwind CSS otimizado

## 🎨 Próximos passos:

Após o setup, você pode:
- Adicionar mais páginas
- Implementar autenticação
- Conectar com banco de dados
- Adicionar sistema de pagamento
- Implementar carrinho de compras
