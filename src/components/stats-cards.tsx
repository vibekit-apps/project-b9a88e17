"use client"

import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "+12.5%",
    changeType: "increase" as const,
    icon: DollarSign,
  },
  {
    title: "Total Users",
    value: "2,345",
    change: "+18.2%",
    changeType: "increase" as const,
    icon: Users,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "-2.4%",
    changeType: "decrease" as const,
    icon: ShoppingCart,
  },
  {
    title: "Total Products",
    value: "567",
    change: "+5.1%",
    changeType: "increase" as const,
    icon: Package,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isIncrease = stat.changeType === "increase"
        
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-1">
                {isIncrease ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <Badge 
                  variant={isIncrease ? "default" : "destructive"}
                  className="text-xs px-1 py-0"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}