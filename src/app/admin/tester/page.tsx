"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { PlaystoreTester } from '@/models/playstore-tester'

export default function TesterAdminPage() {
  const [testers, setTesters] = useState<PlaystoreTester[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTester, setSelectedTester] = useState<PlaystoreTester | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
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

  // Fungsi untuk mengambil data tester dari API
  const fetchTesters = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/playstore-testers', {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch testers')
      }

      const data = await response.json()
      if (data.success) {
        setTesters(data.data)
      } else {
        toast.error(data.error || 'Terjadi kesalahan saat mengambil data')
      }
    } catch (error) {
      console.error('Error fetching testers:', error)
      toast.error('Terjadi kesalahan saat mengambil data tester')
    } finally {
      setLoading(false)
    }
  }

  // Filter testers berdasarkan pencarian
  const filteredTesters = testers.filter(tester => {
    const query = searchQuery.toLowerCase()
    return (
      tester.name.toLowerCase().includes(query) ||
      tester.email.toLowerCase().includes(query) ||
      (tester.status && tester.status.toLowerCase().includes(query))
    )
  })

  // Load data when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTesters()
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
        <h1 className="text-3xl font-bold">PlayStore Tester Management</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Cari berdasarkan nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80"
          />
          <Button onClick={fetchTesters} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Tester PlayStore</CardTitle>
          <CardDescription>
            Total Tester: {testers.length} | Ditampilkan: {filteredTesters.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tanggal Daftar</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTesters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      {loading ? 'Loading...' : 'Tidak ada data tester'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTesters.map((tester) => (
                    <TableRow key={tester.id}>
                      <TableCell>{tester.name}</TableCell>
                      <TableCell>{tester.email}</TableCell>
                      <TableCell>{formatDate(tester.createdAt)}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            tester.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : tester.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {tester.status === 'approved'
                            ? 'Disetujui'
                            : tester.status === 'rejected'
                            ? 'Ditolak'
                            : 'Pending'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedTester(tester)}
                            >
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            {selectedTester && (
                              <>
                                <DialogHeader>
                                  <DialogTitle>Detail Tester</DialogTitle>
                                  <DialogDescription>
                                    Informasi lengkap tester PlayStore
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div>
                                    <Label>ID</Label>
                                    <Input 
                                      value={selectedTester.id} 
                                      readOnly 
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label>Nama</Label>
                                    <Input 
                                      value={selectedTester.name} 
                                      readOnly 
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <Input 
                                      value={selectedTester.email} 
                                      readOnly 
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label>Tanggal Daftar</Label>
                                    <Input 
                                      value={formatDate(selectedTester.createdAt)} 
                                      readOnly 
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Input 
                                      value={selectedTester.status || 'pending'} 
                                      readOnly 
                                      className="mt-1"
                                    />
                                  </div>
                                  {selectedTester.notes && (
                                    <div>
                                      <Label>Catatan</Label>
                                      <Input 
                                        value={selectedTester.notes} 
                                        readOnly 
                                        className="mt-1"
                                      />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
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