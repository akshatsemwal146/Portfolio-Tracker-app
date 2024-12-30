import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Stock } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, Pencil, Trash2 } from "lucide-react";

interface StockTableProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
}

export function StockTable({ stocks, onEdit, onDelete }: StockTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Buy Price</TableHead>
            <TableHead className="text-right">Current Price</TableHead>
            <TableHead className="text-right">Gain/Loss</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => {
            const gainLoss = (stock.currentPrice - stock.buyPrice) * stock.quantity;
            const gainLossPercentage = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
            const isPositive = gainLoss >= 0;

            return (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell className="text-right">{stock.quantity}</TableCell>
                <TableCell className="text-right">${stock.buyPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className={`flex items-center justify-end gap-1 ${isPositive ? 'text-success' : 'text-warning'}`}>
                    {isPositive ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                    <span>${Math.abs(gainLoss).toFixed(2)}</span>
                    <span className="text-sm">({gainLossPercentage.toFixed(2)}%)</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(stock)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(stock.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}