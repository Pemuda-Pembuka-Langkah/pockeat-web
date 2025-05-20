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
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { PlaystoreTester } from '@/models/playstore-tester'
import Link from 'next/link'

export default function TesterAdminPage() {
  const [testers, setTesters] = useState<PlaystoreTester[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTester, setSelectedTester] = useState<PlaystoreTester | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  // Update status tester
  const updateTesterStatus = async (id: string, status: 'approved' | 'rejected' | 'pending', notes: string = '') => {
    try {
      const response = await fetch(`/api/playstore-testers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      })

      if (!response.ok) {
        throw new Error('Failed to update tester status')
      }

      const data = await response.json()
      if (data.success) {
        toast.success(`Status tester berhasil diubah menjadi ${status}`)
        fetchTesters() // Refresh data
      } else {
        toast.error(data.error || 'Terjadi kesalahan saat mengubah status')
      }
    } catch (error) {
      console.error('Error updating tester status:', error)
      toast.error('Terjadi kesalahan saat mengubah status tester')
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

  // Load data when component mounts
  useEffect(() => {
    fetchTesters()
  }, [])

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
                  <TableHead>Aksi</TableHead>
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
                        <div className="flex space-x-2">
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
                                  <DialogFooter className="flex justify-between">
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="default"
                                        onClick={() => updateTesterStatus(selectedTester.id!, 'approved')}
                                      >
                                        Setujui
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() => updateTesterStatus(selectedTester.id!, 'rejected')}
                                      >
                                        Tolak
                                      </Button>
                                    </div>
                                  </DialogFooter>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => updateTesterStatus(tester.id!, 'approved')}
                            disabled={tester.status === 'approved'}
                          >
                            Setujui
                          </Button>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => updateTesterStatus(tester.id!, 'rejected')}
                            disabled={tester.status === 'rejected'}
                          >
                            Tolak
                          </Button>
                        </div>
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
