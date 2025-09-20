import React from "react"
import RegisterForm from "../../components/organisms/login/RegisterForm"
import { useNavigate } from "react-router-dom"

export default function RegisterContainer() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <RegisterForm onLogin={() => navigate("/login")} />
      </div>
    </div>
  )
}
