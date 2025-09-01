import React from "react"
import LoginForm from "../components/organisms/LoginForm"
import { useNavigate } from "react-router-dom"

export default function LoginContainer() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm
          onRegister={() => navigate("/register")}
          onForgotPassword={() => navigate("/recover")}
        />
      </div>
    </div>
  )
}
