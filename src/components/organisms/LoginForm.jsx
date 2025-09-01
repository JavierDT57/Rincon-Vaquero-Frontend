import React, { useState } from "react"
import Button from "../atoms/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../molecules/Card"
import Field from "../molecules/Field"
import { Mail, Lock, MapPin } from "lucide-react"
import { loginUser } from "../../api/users"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function LoginForm({ onRegister, onForgotPassword }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true); setError("")
    try {
      const data = await loginUser({ email, password })
      setUser(data.user)
      navigate("/home")
    } catch (err) {
      setError(err.message || "Error al iniciar sesión")
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
          <CardTitle className="text-2xl font-bold text-foreground">Bienvenido</CardTitle>
          <CardDescription className="mt-2">Descubre la magia de nuestro pueblo</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive px-3 py-2 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field id="email" label="Correo electrónico" icon={Mail}
                 inputProps={{ type:"email", placeholder:"tu@email.com", value:email, onChange:e=>setEmail(e.target.value), required:true }} />
          <Field id="password" label="Contraseña" icon={Lock}
                 inputProps={{ type:"password", placeholder:"••••••••", value:password, onChange:e=>setPassword(e.target.value), required:true }} />
          <Button type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <div className="space-y-3">
          <Button onClick={onForgotPassword} className="w-full bg-transparent !text-black hover:bg-secondary hover:text-secondary-foreground ">
            ¿Olvidaste tu contraseña?
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">o</span>
            </div>
          </div>

          <Button onClick={onRegister} className="w-full bg-transparent border border-border text-foreground hover:bg-secondary hover:text-secondary-foreground !text-black">
            Crear cuenta nueva
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
