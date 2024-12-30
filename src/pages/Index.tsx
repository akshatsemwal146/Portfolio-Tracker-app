import { PortfolioChart } from "@/components/PortfolioChart";
import { StockCard } from "@/components/StockCard";
import { StockForm } from "@/components/StockForm";
import { StockTable } from "@/components/StockTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Stock } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock data - replace with real API calls later
const mockStocks: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 10,
    buyPrice: 150,
    currentPrice: 175.5,
  },
  {
    id: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 5,
    buyPrice: 2800,
    currentPrice: 2950.25,
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 8,
    buyPrice: 300,
    currentPrice: 325.75,
  },
];

export default function Index() {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [isAddingStock, setIsAddingStock] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | undefined>();

  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.quantity * stock.currentPrice,
    0
  );

  const totalGainLoss = stocks.reduce(
    (sum, stock) =>
      sum + stock.quantity * (stock.currentPrice - stock.buyPrice),
    0
  );

  const handleAddStock = (newStock: Omit<Stock, "id" | "currentPrice">) => {
    // In a real app, this would be an API call
    const stock: Stock = {
      ...newStock,
      id: Math.random().toString(),
      currentPrice: newStock.buyPrice, // For demo purposes
    };
    setStocks([...stocks, stock]);
    toast({
      title: "Success",
      description: "Stock added successfully",
    });
  };

  const handleEditStock = (updatedStock: Omit<Stock, "id" | "currentPrice">) => {
    if (!editingStock) return;
    
    // In a real app, this would be an API call
    const updated: Stock = {
      ...updatedStock,
      id: editingStock.id,
      currentPrice: editingStock.currentPrice,
    };
    
    setStocks(stocks.map((s) => (s.id === editingStock.id ? updated : s)));
    setEditingStock(undefined);
    toast({
      title: "Success",
      description: "Stock updated successfully",
    });
  };

  const handleDeleteStock = (id: string) => {
    // In a real app, this would be an API call
    setStocks(stocks.filter((s) => s.id !== id));
    toast({
      title: "Success",
      description: "Stock deleted successfully",
    });
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stock Portfolio</h1>
        <Button onClick={() => setIsAddingStock(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Stock
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-warning'}`}>
              ${totalGainLoss.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Number of Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stocks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-warning'}`}>
              {((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PortfolioChart stocks={stocks} />
        <div className="space-y-4">
          {stocks.slice(0, 2).map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Holdings</h2>
          <StockTable
            stocks={stocks}
            onEdit={setEditingStock}
            onDelete={handleDeleteStock}
          />
        </div>
      </div>

      <StockForm
        open={isAddingStock}
        onOpenChange={setIsAddingStock}
        onSubmit={handleAddStock}
      />

      <StockForm
        open={!!editingStock}
        onOpenChange={(open) => !open && setEditingStock(undefined)}
        onSubmit={handleEditStock}
        initialData={editingStock}
      />
    </div>
  );
}