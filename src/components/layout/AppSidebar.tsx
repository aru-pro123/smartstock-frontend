
import {
    LayoutDashboard,
    Package,
    Boxes,
    CalendarClock,
    Truck,
    ClipboardList,
    RefreshCw,
    ChartColumn,
} from "lucide-react"

import { NavLink } from "react-router"

const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Products", path: "/products", icon: Package },
    { label: "Inventory", path: "/inventory", icon: Boxes },
    { label: "Batches & Expiry", path: "/batches", icon: CalendarClock },
    { label: "Suppliers", path: "/suppliers", icon: Truck },
    { label: "Purchase Orders", path: "/purchase-orders", icon: ClipboardList },
    { label: "Replenishment", path: "/replenishment", icon: RefreshCw },
    { label: "Reports", path: "/reports", icon: ChartColumn },
]

export default function AppSidebar() {
    return (
        <aside className="flex h-full w-64 flex-col bg-slate-900 text-white">
            <div className="flex h-16 items-center gap-3 border-b border-slate-700 px-6">
                <div className="rounded-lg bg-blue-600 p-2">
                    <Package size={20} />
                </div>
                <span className="text-xl font-bold">SmartStock</span>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {navigationItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${isActive
                                    ? "bg-blue-600 font-medium text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    )
                })}
            </nav>

            <div className="border-t border-slate-700 p-4 text-xs text-slate-400">
                SmartStock Inventory System
            </div>
        </aside>
    )
}
