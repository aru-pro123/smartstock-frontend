
import { apiClient } from "@/lib/api-client"

import type { DashboardResponse } from "../types/dashboard.types"

export async function getStoreDashboard(
    storeId: number
): Promise<DashboardResponse> {
    const response = await apiClient.get<DashboardResponse>(
        `/reports/stores/${storeId}/dashboard`
    )

    return response.data
}
