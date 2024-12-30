import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Stock } from "@/lib/utils";
import { useState } from "react";

interface StockFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (stock: Omit<Stock, "id" | "currentPrice">) => void;
  initialData?: Stock;
}

export function StockForm({ open, onOpenChange, onSubmit, initialData }: StockFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    symbol: initialData?.symbol || "",
    name: initialData?.name || "",
    quantity: initialData?.quantity || 0,
    buyPrice: initialData?.buyPrice || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.symbol || !formData.name || !formData.quantity || !formData.buyPrice) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Stock" : "Add Stock"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value.toUpperCase() })
              }
              placeholder="AAPL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Apple Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyPrice">Buy Price</Label>
            <Input
              id="buyPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.buyPrice}
              onChange={(e) =>
                setFormData({ ...formData, buyPrice: Number(e.target.value) })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            {initialData ? "Update" : "Add"} Stock
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}