
import { Bell, Menu } from "lucide-react"

type AppHeaderProps = {
    onMenuClick: () => void
}

export default function AppHeader({
    onMenuClick,
}: AppHeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation"
                    className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
                >
                    <Menu size={22} />
                </button>

                <h2 className="text-lg font-semibold text-slate-800">
                    SmartStock Management
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden text-sm text-slate-500 sm:block">
                    Inventory Management
                </span>
                <Bell size={20} className="text-slate-600" aria-label="Notifications" />
            </div>
        </header>
    )
}
