import React from "react"
import ForgotPasswordForm from "../../components/organisms/login/ForgotPasswordForm"
import { useNavigate } from "react-router-dom"

export default function RecoverContainer() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordForm onBackToLogin={() => navigate("/login")} />
      </div>
    </div>
  )
}
