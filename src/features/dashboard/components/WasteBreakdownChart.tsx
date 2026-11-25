
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

import {
    formatCurrency,
    formatDate,
} from "@/lib/formatters"

import type {
    WasteSummary,
} from "../types/dashboard.types"

interface WasteBreakdownChartProps {
    waste: WasteSummary
}

function formatReason(reason: string): string {
    return reason
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase())
}

export default function WasteBreakdownChart({
    waste,
}: WasteBreakdownChartProps) {
    const chartData = waste.breakdown.map((item) => ({
        reason: formatReason(item.wasteReason),
        loss: item.totalLoss,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Waste by Reason</CardTitle>

                <p className="text-sm text-muted-foreground">
                    {formatDate(waste.from)} – {formatDate(waste.to)}
                </p>
            </CardHeader>

            <CardContent>
                {chartData.length === 0 ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">
                        No waste records available for this period.
                    </p>
                ) : (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 10,
                                    bottom: 35,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="reason"
                                    tick={{ fontSize: 11 }}
                                    angle={-20}
                                    textAnchor="end"
                                    interval={0}
                                    height={65}
                                />

                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value: number) =>
                                        formatCurrency(value, waste.currency)
                                    }
                                />

                                <Tooltip
                                    formatter={(value, name) => [
                                        formatCurrency(Number(value ?? 0), waste.currency),
                                        name === "loss" ? "Loss" : String(name),
                                    ]}
                                />

                                <Bar
                                    dataKey="loss"
                                    fill="#2563eb"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={65}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <span className="text-sm text-muted-foreground">
                        Total Waste Loss
                    </span>

                    <span className="text-lg font-semibold">
                        {formatCurrency(waste.totalLoss, waste.currency)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
