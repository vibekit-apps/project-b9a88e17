"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { StatsCards } from "@/components/stats-cards"
import { LineChart } from "@/components/line-chart"
import { DataTable } from "@/components/data-table"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-card border-b border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Stats Cards */}
            <StatsCards />
            
            {/* Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Revenue Overview</h2>
              <LineChart />
            </div>
            
            {/* Data Table */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
                <p className="text-sm text-muted-foreground">Manage your recent transactions</p>
              </div>
              <DataTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}