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