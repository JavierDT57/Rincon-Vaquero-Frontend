import React, { useState } from "react"
import Button from "../atoms/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card"
import Field from "../molecules/Field"
import { Mail, ArrowLeft, MapPin } from "lucide-react"
import { recoverPassword } from "../../api/users"

export default function ForgotPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true); setMsg(""); setErr("")
    try {
      const data = await recoverPassword({ email, newPassword })
      setMsg(data.mensaje || "Contraseña actualizada correctamente.")
      setTimeout(onBackToLogin, 900)
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
          <MapPin className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">Recuperar contraseña</CardTitle>
          <CardDescription className="mt-2">Ingresa tu correo y tu nueva contraseña</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {err && <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">{err}</div>}
        {msg && <div className="rounded-md border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-sm">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field id="email" label="Correo electrónico" icon={Mail}
                 inputProps={{ type:"email", placeholder:"tu@email.com", value:email, onChange:e=>setEmail(e.target.value), required:true }} />
          <Field id="newPassword" label="Nueva contraseña"
                 inputProps={{ type:"password", placeholder:"••••••••", value:newPassword, onChange:e=>setNewPassword(e.target.value), required:true }} />
          <Button type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Actualizando..." : "Actualizar"}
          </Button>
        </form>

        <Button onClick={onBackToLogin} className="w-full bg-transparent border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground !text-black">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio de sesión
        </Button>
      </CardContent>
    </Card>
  )
}
