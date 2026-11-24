
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
      <h1 className="text-3xl font-bold">
        SmartStock
      </h1>

      <p className="text-slate-600">
        Supermarket Inventory Management System
      </p>

      <Button onClick={() => alert("SmartStock UI is ready!")}>
        Test SmartStock Button
      </Button>
    </div>
  )
}

export default App
