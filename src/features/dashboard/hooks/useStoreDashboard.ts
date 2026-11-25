
import { useQuery } from "@tanstack/react-query"

import { getStoreDashboard } from "../api/dashboard-api"

export function useStoreDashboard(storeId: number) {
    return useQuery({
        queryKey: ["store-dashboard", storeId],
        queryFn: () => getStoreDashboard(storeId),
        enabled: storeId > 0,
    })
}
