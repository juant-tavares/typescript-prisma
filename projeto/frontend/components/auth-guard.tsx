"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window === "undefined") {
          setIsLoading(false)
          return
        }

        console.log("🔍 Verificando autenticação...")

        const savedUser = localStorage.getItem("user")
        console.log("📦 Dados salvos:", savedUser)

        if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
          try {
            const userData = JSON.parse(savedUser)
            console.log("👤 Dados do usuário:", userData)

            if (userData && userData.id && userData.email) {
              setUser(userData)
              console.log("✅ Usuário autenticado:", userData.name)
            } else {
              console.log("❌ Dados inválidos, limpando...")
              localStorage.removeItem("user")
              router.push("/login")
            }
          } catch (parseError) {
            console.error("❌ Erro ao fazer parse:", parseError)
            localStorage.removeItem("user")
            router.push("/login")
          }
        } else {
          console.log("❌ Nenhum usuário encontrado, redirecionando...")
          router.push("/login")
        }
      } catch (error) {
        console.error("❌ Erro na inicialização:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [router])

  return { user, isLoading }
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
          <h2 style={{ marginBottom: "0.5rem", color: "#374151" }}>Verificando autenticação...</h2>
          <p style={{ color: "#6b7280" }}>Aguarde um momento</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // O redirecionamento já foi feito no useAuth
  }

  return <>{children}</>
}
