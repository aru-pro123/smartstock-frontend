
export interface InventorySummary {
    storeId: number
    inventoryRecords: number
    activeInventoryRecords: number
    lowStockProducts: number
    quantityOnHand: number
    quantityReserved: number
    sellableQuantity: number
    availableQuantity: number
    expiredQuantity: number
}

export interface ExpirySummary {
    storeId: number
    asOfDate: string
    expiringThrough: string
    expiredBatchCount: number
    expiredQuantity: number
    expiringSoonBatchCount: number
    expiringSoonQuantity: number
}

export interface WasteBreakdown {
    wasteReason: string
    recordCount: number
    totalQuantity: number
    totalLoss: number
}

export interface WasteSummary {
    storeId: number
    from: string
    to: string
    currency: string
    totalRecords: number
    totalQuantity: number
    totalLoss: number
    breakdown: WasteBreakdown[]
}

export interface PurchaseOrderBreakdown {
    status: string
    count: number
}

export interface PurchaseOrderSummary {
    storeId: number
    totalOrders: number
    pendingOrders: number
    outstandingQuantity: number
    outstandingValue: number
    breakdown: PurchaseOrderBreakdown[]
}

export interface DashboardResponse {
    storeId: number
    inventory: InventorySummary
    expiry: ExpirySummary
    waste: WasteSummary
    purchaseOrders: PurchaseOrderSummary
}
