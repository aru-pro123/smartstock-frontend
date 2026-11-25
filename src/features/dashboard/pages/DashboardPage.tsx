
import {
    Boxes,
    CalendarClock,
    ClipboardList,
    Trash2,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import WasteBreakdownChart from "../components/WasteBreakdownChart"
import PurchaseOrderStatusChart from "../components/PurchaseOrderStatusChart"

import {
    formatCurrency,
    formatDate,
    formatQuantity,
} from "@/lib/formatters"

import { useStoreDashboard } from "../hooks/useStoreDashboard"

const STORE_ID = 1

export default function DashboardPage() {
    const {
        data,
        isPending,
        isError,
        error,
        refetch,
    } = useStoreDashboard(STORE_ID)

    if (isPending) {
        return (
            <div className="p-8 text-slate-600" role="status">
                Loading dashboard data...
            </div>
        )
    }

    if (isError) {
        return (
            <div className="space-y-4 p-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Unable to load dashboard
                </h1>

                <p className="text-red-600" role="alert">
                    {error instanceof Error
                        ? error.message
                        : "An unexpected error occurred."}
                </p>

                <Button onClick={() => void refetch()}>
                    Try Again
                </Button>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="p-8 text-slate-600">
                No dashboard data available.
            </div>
        )
    }

    const { inventory, expiry, waste, purchaseOrders } = data

    const cards = [
        {
            title: "Inventory on Hand",
            value: formatQuantity(inventory.quantityOnHand),
            description: `${formatQuantity(inventory.availableQuantity)} available · ${formatQuantity(inventory.quantityReserved)} reserved`,
            icon: Boxes,
            status:
                inventory.lowStockProducts > 0
                    ? `${inventory.lowStockProducts} low-stock products`
                    : "No low-stock products",
            statusClass:
                inventory.lowStockProducts > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800",
        },
        {
            title: "Expiring Soon",
            value: formatQuantity(expiry.expiringSoonBatchCount),
            description: `${formatQuantity(expiry.expiringSoonQuantity)} units · By ${formatDate(expiry.expiringThrough)}`,
            icon: CalendarClock,
            status:
                expiry.expiringSoonBatchCount > 0
                    ? "Expiry attention"
                    : "No upcoming expiry",
            statusClass:
                expiry.expiringSoonBatchCount > 0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800",
        },
        {
            title: "Waste Losses",
            value: formatCurrency(waste.totalLoss, waste.currency),
            description: `${waste.totalRecords} records · ${formatDate(waste.from)} – ${formatDate(waste.to)}`,
            icon: Trash2,
            status: null,
            statusClass: "",
        },
        {
            title: "Purchase Orders",
            value: formatQuantity(purchaseOrders.totalOrders),
            description: `${purchaseOrders.pendingOrders} pending · ${formatQuantity(purchaseOrders.outstandingQuantity)} units outstanding`,
            icon: ClipboardList,
            status: null,
            statusClass: "",
        },
    ]

    return (
        <main className="min-w-0 space-y-6 p-4 sm:p-6 md:p-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-600">
                    Store {data.storeId} — Inventory overview
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon

                    return (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-medium">
                                    {card.title}
                                </CardTitle>

                                <Icon className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="text-2xl font-bold">
                                    {card.value}
                                </div>

                                {card.status && (
                                    <Badge
                                        variant="secondary"
                                        className={card.statusClass}
                                    >
                                        {card.status}
                                    </Badge>
                                )}

                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {card.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <WasteBreakdownChart waste={waste} />

                <PurchaseOrderStatusChart
                    purchaseOrders={purchaseOrders}
                    currency={waste.currency}
                />
            </div>
        </main>
    )
}
