import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}
