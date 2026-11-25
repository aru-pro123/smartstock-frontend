
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import {
    formatCurrency,
    formatQuantity,
} from "@/lib/formatters"

import type {
    PurchaseOrderSummary,
} from "../types/dashboard.types"

interface PurchaseOrderStatusChartProps {
    purchaseOrders: PurchaseOrderSummary
    currency?: string
}

function formatStatus(status: string): string {
    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase())
}

export default function PurchaseOrderStatusChart({
    purchaseOrders,
    currency = "CAD",
}: PurchaseOrderStatusChartProps) {
    const chartData = purchaseOrders.breakdown.map((item) => ({
        status: formatStatus(item.status),
        count: item.count,
    }))

    const hasOrders = purchaseOrders.totalOrders > 0

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-3">
                    <CardTitle>Purchase Orders by Status</CardTitle>

                    <Badge variant="secondary">
                        {formatQuantity(purchaseOrders.totalOrders)} total
                    </Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                    Purchase order distribution
                </p>
            </CardHeader>

            <CardContent>
                {!hasOrders ? (
                    <div className="flex h-72 items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                            No purchase orders available.
                        </p>
                    </div>
                ) : (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 10,
                                    bottom: 10,
                                }}
                            >


                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />


                                <XAxis
                                    type="number"
                                    allowDecimals={false}
                                    tick={{ fontSize: 12 }}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="status"
                                    width={125}
                                    tick={{ fontSize: 11 }}
                                />


                                <Tooltip
                                    formatter={(value) => [
                                        formatQuantity(Number(value ?? 0)),
                                        "Orders",
                                    ]}
                                />


                                <Bar
                                    dataKey="count"
                                    fill="#2563eb"
                                    radius={[0, 4, 4, 0]}
                                    maxBarSize={35}
                                />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="mt-4 space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Pending Orders
                        </span>

                        <span className="font-semibold">
                            {formatQuantity(purchaseOrders.pendingOrders)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Outstanding Quantity
                        </span>

                        <span className="font-semibold">
                            {formatQuantity(purchaseOrders.outstandingQuantity)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Outstanding Value
                        </span>

                        <span className="font-semibold">
                            {formatCurrency(
                                purchaseOrders.outstandingValue,
                                currency
                            )}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
