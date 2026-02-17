"use client"

import { useState, useMemo } from "react"
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  customer: string
  email: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  date: string
}

const transactions: Transaction[] = [
  { id: 'TXN-001', customer: 'John Smith', email: 'john@example.com', amount: 299.99, status: 'completed', date: '2024-01-15' },
  { id: 'TXN-002', customer: 'Sarah Johnson', email: 'sarah@example.com', amount: 149.50, status: 'pending', date: '2024-01-14' },
  { id: 'TXN-003', customer: 'Mike Wilson', email: 'mike@example.com', amount: 89.99, status: 'completed', date: '2024-01-13' },
  { id: 'TXN-004', customer: 'Emily Brown', email: 'emily@example.com', amount: 199.00, status: 'failed', date: '2024-01-12' },
  { id: 'TXN-005', customer: 'David Lee', email: 'david@example.com', amount: 349.99, status: 'completed', date: '2024-01-11' },
  { id: 'TXN-006', customer: 'Lisa Garcia', email: 'lisa@example.com', amount: 79.99, status: 'pending', date: '2024-01-10' },
  { id: 'TXN-007', customer: 'Tom Anderson', email: 'tom@example.com', amount: 259.50, status: 'completed', date: '2024-01-09' },
  { id: 'TXN-008', customer: 'Anna Taylor', email: 'anna@example.com', amount: 119.99, status: 'completed', date: '2024-01-08' },
  { id: 'TXN-009', customer: 'Chris Martin', email: 'chris@example.com', amount: 189.00, status: 'failed', date: '2024-01-07' },
  { id: 'TXN-010', customer: 'Jennifer White', email: 'jennifer@example.com', amount: 299.99, status: 'completed', date: '2024-01-06' },
]

type SortField = keyof Transaction
type SortDirection = 'asc' | 'desc'

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const itemsPerPage = 5

  const filteredAndSortedData = useMemo(() => {
    let filtered = transactions.filter((transaction) =>
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredAndSortedData.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="p-6">
      {/* Search */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('id')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  ID <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('customer')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Customer <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="text-left py-3 px-2 hidden md:table-cell">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('email')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Email <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('amount')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Amount <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('status')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Status <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
              <th className="text-left py-3 px-2 hidden sm:table-cell">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('date')}
                  className="font-medium text-muted-foreground hover:text-foreground"
                >
                  Date <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-4 px-2 text-sm font-mono text-foreground">
                  {transaction.id}
                </td>
                <td className="py-4 px-2">
                  <div className="text-sm font-medium text-foreground">
                    {transaction.customer}
                  </div>
                  <div className="text-xs text-muted-foreground md:hidden">
                    {transaction.email}
                  </div>
                </td>
                <td className="py-4 px-2 text-sm text-muted-foreground hidden md:table-cell">
                  {transaction.email}
                </td>
                <td className="py-4 px-2 text-sm font-medium text-foreground">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="py-4 px-2">
                  <Badge variant={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </td>
                <td className="py-4 px-2 text-sm text-muted-foreground hidden sm:table-cell">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-foreground">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}