import { Card, CardContent } from "@/components/ui/card";
import { Stock } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StockCardProps {
  stock: Stock;
}

export function StockCard({ stock }: StockCardProps) {
  const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
  const gainLossPercentage = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
  const isPositive = gainLoss >= 0;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className={`text-right ${isPositive ? 'text-success' : 'text-warning'}`}>
            <div className="flex items-center gap-1">
              {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
              <span className="text-lg font-semibold">
                ${Math.abs(gainLoss).toFixed(2)}
              </span>
            </div>
            <p className="text-sm">
              {gainLossPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-lg font-semibold">{stock.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-lg font-semibold">${stock.currentPrice.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}