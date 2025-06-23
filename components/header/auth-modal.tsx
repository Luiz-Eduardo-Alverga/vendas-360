'use client'

import type React from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth/login-tenant'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: userLogin } = useMutation({
    mutationFn: login,
  })

  async function handleLogin(data: LoginSchema) {
    try {
      await userLogin({ username: data.username, password: data.password })
      router.push('/empresas')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Autenticar
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              {...register('username')}
              type="email"
              placeholder="Nome de usuário"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Senha"
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-5 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Autenticando...
              </>
            ) : (
              'Autenticar'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
