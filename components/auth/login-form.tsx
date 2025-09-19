"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import { mockUsers } from "@/lib/auth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { login } = useAuth()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password)
    if (!success) {
      setError("Invalid credentials. Please try again.")
    }
    setIsLoading(false)
  }

  const handleDemoLogin = (userEmail: string) => {
    setEmail(userEmail)
    setPassword("demo123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://my.spline.design/cybermannequin-aXv8IxoZqRqmF0Et3q7Y9Ixx/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {/* Floating bubbles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + i * 6}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          />
        ))}

        {/* Animated wave patterns */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
              className="animate-wave"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Interactive light rays */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-400/10 to-transparent rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Marine life silhouettes */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-20 animate-float">
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-300">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.69 5 6.85V9C7.4 7.69 10.3 7 13.4 7C16.5 7 19.4 7.69 21 9ZM3 13V11C5.4 9.69 8.3 9 11.4 9C14.5 9 17.4 9.69 19 11V13C17.4 11.69 14.5 11 11.4 11C8.3 11 5.4 11.69 3 13Z" />
          </svg>
        </div>

        <div className="absolute top-3/4 right-1/4 w-6 h-6 opacity-15 animate-float" style={{ animationDelay: "2s" }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-green-300">
            <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5S15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-md space-y-6 p-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary backdrop-blur-sm rounded-lg flex items-center justify-center animate-float shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              <span className="text-2xl text-primary-foreground">🌊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">CMLRE</h1>
              <p className="text-sm text-white/90 drop-shadow">Marine Research Platform</p>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-md bg-black/30 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:bg-black/35">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-white/90">
              Access the Centre for Marine Living Resources and Ecology platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@cmlre.gov.in"
                  className="bg-white/95 border-white/60 text-gray-900 placeholder:text-gray-600 backdrop-blur-sm focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-white/95 border-white/60 text-gray-900 placeholder:text-gray-600 backdrop-blur-sm focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
                  required
                />
              </div>
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-600/80 border-red-400/50 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300"
                >
                  <AlertDescription className="text-white font-medium">{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/30">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white font-semibold mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  Demo Accounts - Click to Auto-Fill:
                </p>
                <div className="space-y-2">
                  {mockUsers.map((user) => (
                    <Button
                      key={user.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm font-medium hover:scale-[1.02] transition-all duration-200 text-left"
                      onClick={() => handleDemoLogin(user.email)}
                    >
                      <span className="mr-3 text-lg">
                        {user.role === "scientist" ? "🔬" : user.role === "conservationist" ? "🌊" : "📋"}
                      </span>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-white/80 capitalize">({user.role})</span>
                      </div>
                    </Button>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-green-600/20 border border-green-400/30 rounded text-center">
                  <p className="text-xs text-green-100 font-medium">
                    🔑 Password for all demo accounts: <span className="font-bold text-green-200">demo123</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-20px); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  )
}
