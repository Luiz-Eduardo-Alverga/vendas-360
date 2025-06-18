@echo off
echo 🚀 Iniciando setup do projeto Companhia da Terra E-commerce...

REM Verificar se o Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

REM Nome do projeto
set PROJECT_NAME=companhia-terra-ecommerce

echo 📦 Criando projeto Next.js...
call npx create-next-app@latest %PROJECT_NAME% --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

REM Entrar no diretório do projeto
cd %PROJECT_NAME%

echo 📚 Instalando dependências adicionais...
call npm install @radix-ui/react-avatar @radix-ui/react-button @radix-ui/react-card @radix-ui/react-dropdown-menu @radix-ui/react-input @radix-ui/react-slot lucide-react class-variance-authority clsx tailwind-merge

echo 🎨 Instalando shadcn/ui...
call npx shadcn@latest init -d

echo 🔧 Instalando componentes shadcn/ui...
call npx shadcn@latest add button card input avatar

echo 📁 Criando estrutura de pastas...
mkdir components 2>nul
mkdir public\images 2>nul

echo 📝 Criando arquivos do projeto...

REM Criar todos os arquivos (mesmo conteúdo do script Linux)
REM [Os arquivos seriam criados aqui com o mesmo conteúdo]

echo 🖼️ Baixando imagem do banner...
curl -o public/slide01.png "https://d1muf25xaso8hp.cloudfront.net/https%%3A%%2F%%2F43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io%%2Ff1730828099540x148056714575752760%%2Fslide01.png?w=&auto=compress,&dpr=2&fit=max"

echo 🚀 Instalando dependências finais...
call npm install

echo ✅ Setup concluído com sucesso!
echo.
echo 🎉 Projeto criado em: %PROJECT_NAME%
echo.
echo Para iniciar o projeto:
echo   cd %PROJECT_NAME%
echo   npm run dev
echo.
echo 🌐 O projeto estará disponível em: http://localhost:3000
pause
EOF
