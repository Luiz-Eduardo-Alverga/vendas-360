import { LoginHeader } from "@/components/header/login-header";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      
          <>
            <LoginHeader />
            {children}
          </>
        
    )
  }