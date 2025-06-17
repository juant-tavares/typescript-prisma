"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-guard"

export function UserNav() {
  const { user } = useAuth()
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProfileMenu])

  const handleLogout = () => {
    console.log("🚪 Fazendo logout...")
    localStorage.removeItem("user")
    setShowProfileMenu(false)
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (!user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/login" className="button button-outline">
          Login
        </Link>
        <Link href="/register" className="button button-primary">
          Registrar
        </Link>
      </div>
    )
  }

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: "500",
          transition: "all 0.2s ease",
        }}
        title={`Perfil de ${user.name}`}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
      >
        {getInitials(user.name)}
      </button>

      {showProfileMenu && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            marginTop: "0.5rem",
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            minWidth: "200px",
            zIndex: 50,
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e5e7eb" }}>
            <p style={{ margin: 0, fontWeight: "500", fontSize: "0.875rem" }}>{user.name}</p>
            <p style={{ margin: 0, color: "#666", fontSize: "0.75rem" }}>{user.email}</p>
          </div>

          <div style={{ padding: "0.5rem 0" }}>
            <Link
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#374151",
                fontSize: "0.875rem",
                transition: "background-color 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setShowProfileMenu(false)}
            >
              📊 Dashboard
            </Link>

            <Link
              href="/dashboard/posts"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#374151",
                fontSize: "0.875rem",
                transition: "background-color 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setShowProfileMenu(false)}
            >
              📝 Meus Posts
            </Link>

            <Link
              href="/dashboard/settings"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#374151",
                fontSize: "0.875rem",
                transition: "background-color 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setShowProfileMenu(false)}
            >
              ⚙️ Configurações
            </Link>

            <Link
              href="/posts"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                textDecoration: "none",
                color: "#374151",
                fontSize: "0.875rem",
                transition: "background-color 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setShowProfileMenu(false)}
            >
              👁️ Posts Públicos
            </Link>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", padding: "0.5rem 0" }}>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                width: "100%",
                border: "none",
                backgroundColor: "transparent",
                color: "#dc2626",
                fontSize: "0.875rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "background-color 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fef2f2")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              🚪 Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
