import React, { useState } from "react"
import Button from "../atoms/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card"
import Field from "../molecules/Field"
import { Mail, Lock, User, MapPin } from "lucide-react"
import { registerUser } from "../../api/users"

export default function RegisterForm({ onLogin }) {
  const [form, setForm] = useState({ nombre:"", apellidos:"", email:"", password:"", confirmPassword:"" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [ok, setOk] = useState("")

  const handle = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); setOk(""); setIsLoading(true)
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden"); setIsLoading(false); return
    }
    try {
      await registerUser({ nombre:form.nombre, apellidos:form.apellidos, email:form.email, password:form.password })
      setOk("Registro exitoso. Redirigiendo a inicio de sesión…")
      setTimeout(onLogin, 900)
    } catch (err) {
      setError(err.message || "Error al registrar")
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
          <CardTitle className="text-2xl font-bold text-foreground">Únete a nosotros</CardTitle>
          <CardDescription className="mt-2">Crea tu cuenta y explora la magia</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">{error}</div>}
        {ok &&    <div className="rounded-md border border-green-300 bg-green-50 text-green-700 px-3 py-2 text-sm">{ok}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field id="nombre" label="Nombre" icon={User}
                 inputProps={{ type:"text", placeholder:"Tu nombre", value:form.nombre, onChange:e=>handle("nombre", e.target.value), required:true }} />
          <Field id="apellidos" label="Apellidos" icon={User}
                 inputProps={{ type:"text", placeholder:"Tus apellidos", value:form.apellidos, onChange:e=>handle("apellidos", e.target.value), required:true }} />
          <Field id="email" label="Correo electrónico" icon={Mail}
                 inputProps={{ type:"email", placeholder:"tu@email.com", value:form.email, onChange:e=>handle("email", e.target.value), required:true }} />
          <Field id="password" label="Contraseña" icon={Lock}
                 inputProps={{ type:"password", placeholder:"••••••••", value:form.password, onChange:e=>handle("password", e.target.value), required:true }} />
          <Field id="confirmPassword" label="Confirmar contraseña" icon={Lock}
                 inputProps={{ type:"password", placeholder:"••••••••", value:form.confirmPassword, onChange:e=>handle("confirmPassword", e.target.value), required:true }} />

          <Button type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">o</span>
            </div>
          </div>

          <Button onClick={onLogin} className="w-full bg-transparent border border-border hover:bg-secondary hover:text-secondary-foreground !text-black">
            Ya tengo una cuenta
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
