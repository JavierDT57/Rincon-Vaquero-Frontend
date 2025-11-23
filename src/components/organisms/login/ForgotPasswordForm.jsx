// src/components/organisms/login/ForgotPasswordForm.jsx
import React, { useState } from "react"
import Button from "../../atoms/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../molecules/Card"
import Field from "../../molecules/Field"
import { Mail, ArrowLeft, KeyRound, Lock, MapPin } from "lucide-react"
import { requestPasswordReset, verifyPasswordToken, confirmPasswordReset } from "../../../api/users"

export default function ForgotPasswordForm({ onBackToLogin }) {
  const [step, setStep] = useState(1) // 1: email, 2: token, 3: nueva pass
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")

  const resetAlerts = () => { setMsg(""); setErr(""); }

  async function handleRequest(e) {
    e.preventDefault()
    resetAlerts()
    setIsLoading(true)
    try {
      const data = await requestPasswordReset({ email })
      setMsg(data.message || "Si el correo existe, se envió un código.")
      setStep(2)
    } catch (error) {
      setErr(error.message || "No se pudo solicitar el código")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleVerify(e) {
    e.preventDefault()
    resetAlerts()
    setIsLoading(true)
    try {
      const data = await verifyPasswordToken({ email, token })
      setMsg(data.message || "Código verificado. Define tu nueva contraseña.")
      setStep(3)
    } catch (error) {
      setErr(error.message || "Código inválido o expirado")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirm(e) {
    e.preventDefault()
    resetAlerts()
    if (newPassword.length < 8) {
      setErr("La contraseña debe tener al menos 8 caracteres")
      return
    }
    if (newPassword !== confirmPassword) {
      setErr("Las contraseñas no coinciden")
      return
    }
    setIsLoading(true)
    try {
      const data = await confirmPasswordReset({ email, token, newPassword, confirmPassword })
      setMsg(data.message || "Contraseña actualizada correctamente.")
      setTimeout(() => onBackToLogin && onBackToLogin(), 900)
    } catch (error) {
      setErr(error.message || "No se pudo actualizar la contraseña")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-2xl border-0 bg-card">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-primary-foreground text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Recuperar contraseña
          </CardTitle>
          <CardDescription className="mt-2">
            {step === 1 && "Ingresa tu correo para recibir un código"}
            {step === 2 && "Ingresa el código que enviamos a tu correo"}
            {step === 3 && "Ingresa tu nueva contraseña"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {err && <div data-testid="reset-error" className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">{err}</div>}
        {msg && <div data-testid="reset-success" className="rounded-md border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-sm">{msg}</div>}

        {step === 1 && (
          <form onSubmit={handleRequest} className="space-y-4">
            <Field
              id="email"
              label="Correo electrónico"
              icon={Mail}
              testId="reset-email"
              inputProps={{
                type: "email",
                placeholder: "tu@email.com",
                value: email,
                onChange: e => setEmail(e.target.value),
                required: true
              }}
            />
            <Button type="submit" data-testid="reset-send" className="w-full py-3 !text-white" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar código"}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-4">
            <Field
              id="email"
              label="Correo electrónico"
              icon={Mail}
              inputProps={{
                type: "email",
                value: email,
                onChange: e => setEmail(e.target.value),
                required: true,
                readOnly: true
              }}
            />
            <Field
              id="token"
              label="Código de verificación"
              icon={KeyRound}
              testId="reset-token"
              inputProps={{
                type: "text",
                placeholder: "Ingresa el código de 6 dígitos",
                value: token,
                onChange: e => setToken(e.target.value),
                required: true
              }}
            />
            <div className="flex gap-2">
              <Button type="button" className="w-1/2 bg-secondary"
                      onClick={() => { setStep(1); resetAlerts(); }}>
                Cambiar correo
              </Button>
              <Button type="submit" data-testid="reset-verify" className="w-1/2 bg-secondary" disabled={isLoading}>
                {isLoading ? "Verificando..." : "Verificar código"}
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleConfirm} className="space-y-4">
            <Field
              id="newPassword"
              label="Nueva contraseña"
              icon={Lock}
              testId="reset-newpass"
              inputProps={{
                type: "password",
                placeholder: "••••••••",
                value: newPassword,
                onChange: e => setNewPassword(e.target.value),
                required: true
              }}
            />
            <Field
              id="confirmPassword"
              label="Confirmar contraseña"
              icon={Lock}
              testId="reset-confirmpass"
              inputProps={{
                type: "password",
                placeholder: "••••••••",
                value: confirmPassword,
                onChange: e => setConfirmPassword(e.target.value),
                required: true
              }}
            />
            <div className="flex gap-2">
              <Button type="button" className="w-1/3 bg-secondary"
                      onClick={() => { setStep(2); resetAlerts(); }}>
                Atrás
              </Button>
              <Button type="submit" data-testid="reset-save" className="w-2/3 bg-secondary" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar contraseña"}
              </Button>
            </div>
          </form>
        )}

        <Button
          onClick={onBackToLogin}
          className="w-full bg-transparent border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground !text-black"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio de sesión
        </Button>
      </CardContent>
    </Card>
  )
}
