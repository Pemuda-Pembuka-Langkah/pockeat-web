'use client'

import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'

// Types
interface PreRegister {
  id: string
  name: string
  email: string
  phone: string
  reason?: string
  createdAt: Date
}

export default function PreRegisterAdminPage() {
  const [preRegisters, setPreRegisters] = useState<PreRegister[]>([])
  const [filteredPreRegisters, setFilteredPreRegisters] = useState<PreRegister[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPreRegister, setSelectedPreRegister] = useState<PreRegister | null>(null)
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === process.env.NEXT_PUBLIC_USERNAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuthenticated(true)
      setAuthError('')
      localStorage.setItem('adminAuth', 'true')
    } else {
      setAuthError('Username atau password salah')
    }
  }

  // Check if user was previously logged in
  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
  }

  // Fetch data pre-register
  const fetchPreRegisters = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/pre-register', {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Gagal mengambil data pre-register')
      }

      const result = await response.json()
      if (result.success && Array.isArray(result.data)) {
        setPreRegisters(result.data)
        setFilteredPreRegisters(result.data)
      } else {
        throw new Error('Format data tidak valid')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data'
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter data pre-register berdasarkan pencarian
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) {
      setFilteredPreRegisters(preRegisters)
      return
    }

    const filtered = preRegisters.filter(register => {
      return (
        register.name.toLowerCase().includes(query) ||
        register.email.toLowerCase().includes(query) ||
        register.phone.toLowerCase().includes(query) ||
        (register.reason && register.reason.toLowerCase().includes(query))
      )
    })
    setFilteredPreRegisters(filtered)
  }, [searchQuery, preRegisters])

  // Load data when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchPreRegisters()
    }
  }, [isAuthenticated])

  // Format tanggal
  const formatDate = (dateValue: any) => {
    if (!dateValue) return '-'
    
    // Handle Firestore timestamp object yang memiliki seconds dan nanoseconds
    if (dateValue && typeof dateValue === 'object' && 'seconds' in dateValue) {
      const timestamp = dateValue as { seconds: number; nanoseconds: number }
      const milliseconds = timestamp.seconds * 1000
      return new Date(milliseconds).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Menangani format ISO string atau Date object
    try {
      return new Date(dateValue).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'Format tanggal tidak valid'
    }
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Masuk ke panel admin PockEat</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {authError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {authError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pre-Register Management</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Cari berdasarkan nama, email atau telepon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80"
          />
          <Button onClick={fetchPreRegisters} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pre-Register</CardTitle>
          <CardDescription>
            Total Pendaftar: {preRegisters.length} | Ditampilkan: {filteredPreRegisters.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Tanggal Daftar</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPreRegisters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      {loading ? 'Loading...' : 'Tidak ada data pendaftar'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPreRegisters.map((register) => (
                    <TableRow key={register.id}>
                      <TableCell>{register.name}</TableCell>
                      <TableCell>{register.email}</TableCell>
                      <TableCell>{register.phone}</TableCell>
                      <TableCell>{formatDate(register.createdAt)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPreRegister(register)}
                            >
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detail Pendaftar</DialogTitle>
                              <DialogDescription>
                                Informasi lengkap pendaftar
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPreRegister && (
                              <div className="grid gap-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <p className="text-sm font-medium">ID:</p>
                                  <p className="col-span-2 text-sm">
                                    {selectedPreRegister.id}
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <p className="text-sm font-medium">Nama:</p>
                                  <p className="col-span-2 text-sm">
                                    {selectedPreRegister.name}
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <p className="text-sm font-medium">Email:</p>
                                  <p className="col-span-2 text-sm">
                                    {selectedPreRegister.email}
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <p className="text-sm font-medium">Telepon:</p>
                                  <p className="col-span-2 text-sm">
                                    {selectedPreRegister.phone}
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                  <p className="text-sm font-medium">Tanggal Daftar:</p>
                                  <p className="col-span-2 text-sm">
                                    {formatDate(selectedPreRegister.createdAt)}
                                  </p>
                                </div>
                                <div className="grid grid-cols-3 items-start gap-4">
                                  <p className="text-sm font-medium">Alasan:</p>
                                  <p className="col-span-2 text-sm whitespace-pre-wrap">
                                    {selectedPreRegister.reason || '-'}
                                  </p>
                                </div>
                              </div>
                            )}
                            <DialogFooter className="sm:justify-center">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => setSelectedPreRegister(null)}
                              >
                                Tutup
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}