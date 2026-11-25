
import { useState } from "react"
import { Outlet, useLocation } from "react-router"
import { X } from "lucide-react"

import AppSidebar from "./AppSidebar"
import AppHeader from "./AppHeader"

export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    const [previousPath, setPreviousPath] = useState(location.pathname)

    if (previousPath !== location.pathname) {
        setPreviousPath(location.pathname)
        setSidebarOpen(false)
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Desktop sidebar */}
            <div className="hidden md:block">
                <AppSidebar />
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation overlay"
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />

                    <div className="relative z-10 h-full">
                        <AppSidebar />
                        <button
                            type="button"
                            aria-label="Close navigation"
                            onClick={() => setSidebarOpen(false)}
                            className="absolute right-3 top-4 text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col">
                <AppHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
