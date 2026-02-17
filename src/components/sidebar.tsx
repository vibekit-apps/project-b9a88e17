"use client"

import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#', current: true },
  { name: 'Users', icon: Users, href: '#', current: false },
  { name: 'Orders', icon: ShoppingCart, href: '#', current: false },
  { name: 'Analytics', icon: BarChart3, href: '#', current: false },
  { name: 'Settings', icon: Settings, href: '#', current: false },
  { name: 'Help', icon: HelpCircle, href: '#', current: false },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard')

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="ml-2 text-lg font-semibold text-foreground">Admin</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.name
          
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name)
                onClose?.()
              }}
              className={cn(
                "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-secondary-foreground">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  )
}